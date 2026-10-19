// Forwards analytics from keyik.dev/ingest/* to PostHog (US cloud).
export async function onRequest({ request, params }) {
  const path = [].concat(params.path ?? []).join("/");
  const host = path.startsWith("static/") ? "us-assets.i.posthog.com" : "us.i.posthog.com";
  const url = new URL(request.url);
  const target = `https://${host}/${path}${url.search}`;
  const headers = new Headers(request.headers);
  headers.set("host", host);
  headers.delete("cookie");
  return fetch(target, {
    method: request.method,
    headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
    redirect: "manual",
  });
}
