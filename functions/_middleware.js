// www.keyik.dev and the pages.dev address both send visitors to keyik.dev.
export async function onRequest({ request, next }) {
  const url = new URL(request.url);
  if (url.hostname === "www.keyik.dev" || url.hostname === "keyik-portfolio.pages.dev") {
    url.hostname = "keyik.dev";
    return Response.redirect(url.toString(), 301);
  }
  return next();
}
