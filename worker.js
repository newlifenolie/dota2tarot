// Serves the static site from ./public, plus an image relay at /img/... for Valve's Dota 2 art.
// The relay puts the images on our own domain, so the share poster can draw them into a canvas
// (Valve's CDNs send no CORS headers) and networks that block steamstatic.com still get them.

const HOSTS = ["https://cdn.cloudflare.steamstatic.com", "https://cdn.akamai.steamstatic.com", "https://cdn.fastly.steamstatic.com"];
// Only Dota 2 hero/item art, so this can't be used as an open proxy.
const ALLOWED = /^\/apps\/dota2\/(images\/dota_react\/(heroes|items)\/|videos\/dota_react\/heroes\/renders\/|images\/heroes\/)[a-z0-9_]+\.(png|jpg)$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith("/img/")) return env.ASSETS.fetch(request);

    const path = url.pathname.slice(4);
    if (!ALLOWED.test(path)) return new Response("Not found", { status: 404 });

    for (const host of HOSTS) {
      const res = await fetch(host + path, { cf: { cacheEverything: true, cacheTtl: 604800 } });
      if (res.ok) {
        const out = new Response(res.body, res);
        out.headers.set("Access-Control-Allow-Origin", "*");
        out.headers.set("Cache-Control", "public, max-age=604800");
        return out;
      }
    }
    return new Response("Not found", { status: 404 });
  },
};
