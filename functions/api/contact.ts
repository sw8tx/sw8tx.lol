type Env = {
  DISCORD_CONTACT_WEBHOOK?: string;
  RATE_LIMIT_SALT?: string;
  TURNSTILE_SECRET_KEY?: string;
};

type PagesContext<TEnv = Env> = {
  env: TEnv;
  request: Request;
};

type PagesHandler<TEnv = Env> = (context: PagesContext<TEnv>) => Response | Promise<Response>;

type ContactPayload = {
  email?: unknown;
  locale?: unknown;
  message?: unknown;
  name?: unknown;
  page?: unknown;
  turnstileToken?: unknown;
};

const cooldownSeconds = 75;
const duplicateSeconds = 60 * 30;
const turnstileVerifyUrl = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

function asCleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function getClientIp(request: Request) {
  const cfConnectingIp = request.headers.get("CF-Connecting-IP");
  if (cfConnectingIp) return cfConnectingIp.trim();

  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "";
  }

  return "";
}

function jsonResponse(body: Record<string, unknown>, init?: ResponseInit) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(init?.headers ?? {}),
    },
  });
}

async function sha256Hex(input: string) {
  const bytes = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest), (value) => value.toString(16).padStart(2, "0")).join("");
}

function buildCacheRequest(scope: string, key: string) {
  return new Request(`https://internal.sparkle-rate-limit/${scope}/${key}`);
}

async function getRateLimitCache() {
  const cacheStorage = caches as CacheStorage & { default?: Cache };
  return cacheStorage.default ?? caches.open("sparkle-contact-rate-limit");
}

async function readCache(cacheKey: Request) {
  const cache = await getRateLimitCache();
  return cache.match(cacheKey);
}

async function writeCache(cacheKey: Request, ttlSeconds: number) {
  const cache = await getRateLimitCache();
  await cache.put(
    cacheKey,
    new Response("1", {
      headers: {
        "Cache-Control": `public, max-age=${ttlSeconds}`,
      },
    }),
  );
}

async function verifyTurnstile(secret: string, token: string, ip: string) {
  const body = new URLSearchParams({
    secret,
    response: token,
    idempotency_key: crypto.randomUUID(),
  });

  if (ip) {
    body.set("remoteip", ip);
  }

  const response = await fetch(turnstileVerifyUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    return { ok: false, status: 502, error: "Turnstile verification failed." as const };
  }

  const result = (await response.json()) as {
    success?: boolean;
  };

  if (!result.success) {
    return { ok: false, status: 400, error: "Turnstile verification rejected." as const };
  }

  return { ok: true, status: 200, error: null };
}

export const onRequestOptions: PagesHandler = async () =>
  new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });

export const onRequestPost: PagesHandler<Env> = async ({ env, request }) => {
  if (!env.DISCORD_CONTACT_WEBHOOK || !env.TURNSTILE_SECRET_KEY || !env.RATE_LIMIT_SALT) {
    return jsonResponse({ error: "Server configuration is incomplete." }, { status: 500 });
  }

  const originHeader = request.headers.get("origin");
  const requestUrl = new URL(request.url);

  if (originHeader) {
    try {
      const originUrl = new URL(originHeader);
      if (originUrl.host !== requestUrl.host) {
        return jsonResponse({ error: "Invalid origin." }, { status: 403 });
      }
    } catch {
      return jsonResponse({ error: "Invalid origin." }, { status: 403 });
    }
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return jsonResponse({ error: "Invalid request body." }, { status: 400 });
  }

  const name = asCleanString(payload.name, 120);
  const email = asCleanString(payload.email, 180).toLowerCase();
  const message = asCleanString(payload.message, 2200);
  const locale = asCleanString(payload.locale, 24) || "unknown";
  const page = asCleanString(payload.page, 320) || requestUrl.toString();
  const turnstileToken = asCleanString(payload.turnstileToken, 4096);

  if (!name || !email || !message || !turnstileToken) {
    return jsonResponse({ error: "Missing required fields." }, { status: 400 });
  }

  const clientIp = getClientIp(request);
  if (!clientIp) {
    return jsonResponse({ error: "Unable to resolve client address." }, { status: 400 });
  }

  const ipHash = await sha256Hex(`${env.RATE_LIMIT_SALT}:${clientIp}`);
  const ipHashPrefix = ipHash.slice(0, 16);
  const duplicateHash = await sha256Hex(`${ipHashPrefix}:${email}:${message.toLowerCase()}`);
  const cooldownKey = buildCacheRequest("cooldown", ipHashPrefix);
  const duplicateKey = buildCacheRequest("duplicate", duplicateHash.slice(0, 24));

  if (await readCache(cooldownKey)) {
    return jsonResponse({ error: "Please wait a moment before sending another note." }, { status: 429 });
  }

  if (await readCache(duplicateKey)) {
    await writeCache(cooldownKey, cooldownSeconds);
    return jsonResponse({ error: "That note already looks submitted." }, { status: 409 });
  }

  const verification = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, turnstileToken, clientIp);
  if (!verification.ok) {
    await writeCache(cooldownKey, 20);
    return jsonResponse({ error: verification.error }, { status: verification.status });
  }

  const discordResponse = await fetch(env.DISCORD_CONTACT_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Sparkle Contact",
      avatar_url: "https://sw8tx.lol/logo-transparent.png",
      content: "New contact inquiry for Sparkle.",
      embeds: [
        {
          title: "New Sparkle inquiry",
          description: "A new contact form note just came in from `sw8tx.lol`.",
          color: 0xc95d37,
          author: {
            name: "Sparkle",
            url: "https://sw8tx.lol",
            icon_url: "https://sw8tx.lol/logo-transparent.png",
          },
          fields: [
            { name: "From", value: name, inline: true },
            { name: "Reply", value: email, inline: true },
            { name: "Locale", value: locale.toUpperCase(), inline: true },
            { name: "Page", value: `[Open page](${page.slice(0, 1024) || requestUrl.origin})`, inline: true },
            { name: "Abuse key", value: `\`${ipHashPrefix}\``, inline: true },
            {
              name: "Message",
              value: `>>> ${message.slice(0, 980).replace(/\n/g, "\n> ")}`,
            },
          ],
          footer: {
            text: "Sparkle Contact • Server-validated submit",
          },
          timestamp: new Date().toISOString(),
        },
      ],
      allowed_mentions: {
        parse: [],
      },
    }),
  });

  if (!discordResponse.ok) {
    const errorText = await discordResponse.text();
    return jsonResponse({ error: "Webhook delivery failed.", detail: errorText.slice(0, 400) }, { status: 502 });
  }

  await Promise.all([writeCache(cooldownKey, cooldownSeconds), writeCache(duplicateKey, duplicateSeconds)]);

  return jsonResponse({ ok: true });
};
