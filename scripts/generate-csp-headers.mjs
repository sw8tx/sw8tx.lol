import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = "out";

function walkHtmlFiles(dir, files = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      walkHtmlFiles(fullPath, files);
    } else if (entry.isFile() && fullPath.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function hashInlineScripts(file) {
  const hashes = new Set();
  const scriptPattern = /<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
  const html = readFileSync(file, "utf8");
  let match;

  while ((match = scriptPattern.exec(html))) {
    const scriptBody = match[1] ?? "";
    const hash = createHash("sha256").update(scriptBody, "utf8").digest("base64");
    hashes.add(`'sha256-${hash}'`);
  }

  return [...hashes];
}

function routeForHtmlFile(file) {
  const route = file.replaceAll("\\", "/").replace(/^out\//, "").replace(/\.html$/, "");

  if (route === "index") return "/";
  return `/${route}`;
}

function buildCsp(hashes) {
  const scriptHashes = hashes.join(" ");
  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self' mailto:",
    "frame-ancestors 'none'",
    "object-src 'none'",
    `script-src 'self' ${scriptHashes} https://challenges.cloudflare.com`,
    "script-src-attr 'none'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self' https://challenges.cloudflare.com",
    "frame-src https://challenges.cloudflare.com",
    "manifest-src 'self'",
    "media-src 'self' data: blob:",
    "worker-src 'self' blob:",
    "upgrade-insecure-requests",
    "block-all-mixed-content",
  ].join("; ");
}

const sharedHeaders = `
  Access-Control-Allow-Origin: https://sw8tx.lol
  Cross-Origin-Embedder-Policy: unsafe-none
  Cross-Origin-Opener-Policy: same-origin
  Cross-Origin-Resource-Policy: same-origin
  Origin-Agent-Cluster: ?1
  Permissions-Policy: accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()
  Referrer-Policy: strict-origin-when-cross-origin
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-DNS-Prefetch-Control: off
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  X-Permitted-Cross-Domain-Policies: none
`;

const htmlCspBlocks = walkHtmlFiles(outDir)
  .map((file) => {
    const route = routeForHtmlFile(file);
    const csp = buildCsp(hashInlineScripts(file));
    return `${route}\n  Content-Security-Policy: ${csp}`;
  })
  .join("\n\n");

const headers = `/*
${sharedHeaders}

${htmlCspBlocks}

/.well-known/security.txt
  Content-Type: text/plain; charset=utf-8
  X-Content-Type-Options: nosniff
`;

writeFileSync(join(outDir, "_headers"), headers);
console.log(`Generated route-specific CSP headers for ${walkHtmlFiles(outDir).length} HTML files.`);
