type Env = {
  DISCORD_CONTACT_WEBHOOK?: string;
};

type PagesContext<TEnv = Env> = {
  env: TEnv;
  request: Request;
};

type PagesHandler<TEnv = Env> = (context: PagesContext<TEnv>) => Response | Promise<Response>;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  locale?: unknown;
  page?: unknown;
};

function asCleanString(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
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

export const onRequestOptions: PagesHandler = async () =>
  new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });

export const onRequestPost: PagesHandler<Env> = async ({ env, request }) => {
  if (!env.DISCORD_CONTACT_WEBHOOK) {
    return jsonResponse({ error: "Webhook is not configured." }, { status: 500 });
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
  const email = asCleanString(payload.email, 180);
  const message = asCleanString(payload.message, 2200);
  const locale = asCleanString(payload.locale, 24) || "unknown";
  const page = asCleanString(payload.page, 320) || requestUrl.toString();

  if (!name || !email || !message) {
    return jsonResponse({ error: "Missing required fields." }, { status: 400 });
  }

  const forwardedFor = request.headers.get("x-forwarded-for");
  const userAgent = request.headers.get("user-agent");

  const discordResponse = await fetch(env.DISCORD_CONTACT_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "Sparkle Contact",
      embeds: [
        {
          title: "New Sparkle contact note",
          color: 0xc95d37,
          fields: [
            { name: "Name", value: name },
            { name: "Email", value: email },
            { name: "Language", value: locale, inline: true },
            { name: "Page", value: page.slice(0, 1024) || "unknown", inline: true },
            { name: "Message", value: message.slice(0, 1024) },
          ],
          footer: {
            text: "Submitted from sw8tx.lol",
          },
          timestamp: new Date().toISOString(),
        },
      ],
      allowed_mentions: {
        parse: [],
      },
      attachments: [],
      thread_name: undefined,
      flags: undefined,
      content:
        forwardedFor || userAgent
          ? [
              "Metadata:",
              forwardedFor ? `forwarded-for header present (not reposted here)` : null,
              userAgent ? `user-agent header present (not reposted here)` : null,
            ]
              .filter(Boolean)
              .join("\n")
          : undefined,
    }),
  });

  if (!discordResponse.ok) {
    const errorText = await discordResponse.text();
    return jsonResponse({ error: "Webhook delivery failed.", detail: errorText.slice(0, 400) }, { status: 502 });
  }

  return jsonResponse({ ok: true });
};
