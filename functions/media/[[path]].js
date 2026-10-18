// Serves files from the MEDIA bucket, with range support so videos can seek.
export async function onRequest({ request, env, params }) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method not allowed", { status: 405 });
  }
  const key = [].concat(params.path ?? []).join("/");

  const head = await env.MEDIA.head(key);
  if (head === null) return new Response("Not found", { status: 404 });
  const size = head.size;

  const headers = new Headers();
  head.writeHttpMetadata(headers);
  headers.set("etag", head.httpEtag);
  headers.set("accept-ranges", "bytes");
  headers.set("cache-control", "public, max-age=31536000, immutable");

  // "bytes=a-b", "bytes=a-" or "bytes=-n"
  const m = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get("range") ?? "");
  let start = 0, end = size - 1, status = 200;
  if (m && (m[1] || m[2])) {
    if (m[1]) {
      start = Number(m[1]);
      if (m[2]) end = Math.min(Number(m[2]), size - 1);
    } else {
      start = Math.max(0, size - Number(m[2]));
    }
    if (start > end || start >= size) {
      headers.set("content-range", `bytes */${size}`);
      return new Response(null, { status: 416, headers });
    }
    headers.set("content-range", `bytes ${start}-${end}/${size}`);
    status = 206;
  }
  const length = end - start + 1;
  headers.set("content-length", String(length));
  if (request.method === "HEAD") return new Response(null, { status, headers });

  const obj = await env.MEDIA.get(key, status === 206 ? { range: { offset: start, length } } : {});
  return new Response(obj.body, { status, headers });
}
