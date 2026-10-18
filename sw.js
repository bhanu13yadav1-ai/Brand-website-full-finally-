const CACHE_NAME = 'blacked-fusion-v4.1';
const CORE = [
  "./index.html",
  "./app.js",
  "./styles.css",
  "./manifest.webmanifest",
  "./hero-model-crop.webp",
  "./aankhein-neeche.webp",
  "./campaign-innerwear.webp",
  "./campaign-sanskari.webp",
  "./campaign-wellness.webp",
  "./entry-shareef.webp",
  "./icon-192.png",
  "./icon-512.png",
  "./mirror-knows-everything.webp",
  "./model-innerwear-wide.webp",
  "./model-innerwear.webp",
  "./model-sanskari.webp",
  "./model-wellness.webp",
  "./pallu-shareef.webp",
  "./product-curved.webp",
  "./product-everyday-bra.webp",
  "./product-lace-bra.webp",
  "./product-massager.webp",
  "./product-wellness.webp",
  "./sanskari-ankhein.webp",
  "./sanskari-entry.webp",
  "./sanskari-mirror.webp",
  "./sanskari-pallu.webp",
  "./sanskari-raat.webp",
  "./assets/new-gallery/sanskari-black-lace-alt.webp",
  "./assets/new-gallery/sanskari-campaign-black.webp",
  "./assets/new-gallery/sanskari-campaign-blue.webp",
  "./assets/new-gallery/sanskari-campaign-burgundy.webp",
  "./assets/new-gallery/sanskari-campaign-entry.webp",
  "./assets/new-gallery/sanskari-campaign-gold.webp",
  "./assets/new-gallery/sanskari-campaign-sheer.webp",
  "./assets/new-gallery/sanskari-campaign-wide.webp",
  "./assets/new-gallery/sanskari-editorial-black.webp",
  "./assets/new-gallery/sanskari-mirror-edit.webp",
  "./assets/new-wellness/animated-product.gif",
  "./assets/new-wellness/dark-product-flatlay.webp",
  "./assets/new-wellness/dual-massager-box.webp",
  "./assets/new-wellness/pink-accessories-flatlay.webp",
  "./assets/new-wellness/pink-cuffs-editorial.webp",
  "./assets/new-wellness/plush-campaign-pink.webp",
  "./assets/new-wellness/plush-campaign-white.webp",
  "./assets/new-wellness/plush-campaign-yellow.webp",
  "./assets/new-wellness/product-warning-reference.webp",
  "./assets/new-wellness/purple-pink-product.webp",
  "./assets/new-wellness/red-heart-closeup.webp",
  "./assets/new-wellness/silver-gems.webp",
  "./assets/new-wellness/silver-heart.webp",
  "./assets/new-wellness/silver-pink-gem.webp",
  "./fusion4-addons.js",
  "./fusion4-addons.css"
];
const ROOT_IMAGES = new Set(["hero-model-crop.webp", "aankhein-neeche.webp", "campaign-innerwear.webp", "campaign-sanskari.webp", "campaign-wellness.webp", "entry-shareef.webp", "icon-192.png", "icon-512.png", "mirror-knows-everything.webp", "model-innerwear-wide.webp", "model-innerwear.webp", "model-sanskari.webp", "model-wellness.webp", "pallu-shareef.webp", "product-curved.webp", "product-everyday-bra.webp", "product-lace-bra.webp", "product-massager.webp", "product-wellness.webp", "sanskari-ankhein.webp", "sanskari-entry.webp", "sanskari-mirror.webp", "sanskari-pallu.webp", "sanskari-raat.webp"]);
function isAddonAsset(path) { return path.includes('/assets/new-gallery/') || path.includes('/assets/new-wellness/'); }
function rewriteHtml(html) {
  if (html.includes('data-blacked-fusion-addon="4.1"')) return html;
  const cssTag = '<link rel="stylesheet" href="./fusion4-addons.css" data-blacked-fusion-addon="4.1">';
  const scriptTag = '<script src="./fusion4-addons.js" defer data-blacked-fusion-addon="4.1"></script>';
  if (!/<link[^>]+fusion4-addons\.css/i.test(html)) html = html.replace(/<\/head>/i, cssTag + '\n</head>');
  if (!/<script[^>]+fusion4-addons\.js/i.test(html)) {
    const appScript = /<script\s+src=["'](?:\.\/)?app\.js["']\s+defer[^>]*>\s*<\/script>/i;
    if (appScript.test(html)) html = html.replace(appScript, match => match + '\n' + scriptTag);
    else html = html.replace(/<\/body>/i, scriptTag + '\n</body>');
  }
  return html;
}
async function rewrittenDocument(request) {
  const response = await fetch(request);
  if (!response.ok) return response;
  const html = rewriteHtml(await response.text());
  const headers = new Headers(response.headers);
  ['content-length','content-encoding','etag','content-md5','last-modified'].forEach(key => headers.delete(key));
  headers.set('content-type','text/html; charset=utf-8');
  const output = new Response(html, {status:response.status,statusText:response.statusText,headers});
  const cache = await caches.open(CACHE_NAME);
  cache.put(request, output.clone()).catch(()=>{});
  const canonical = new URL('./index.html', self.registration.scope).href;
  cache.put(canonical, output.clone()).catch(()=>{});
  return output;
}
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('blacked-fusion-') && key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith(rewrittenDocument(request).catch(async () => {
      return (await caches.match(request)) || (await caches.match(new URL('./index.html', self.registration.scope).href)) || Response.error();
    }));
    return;
  }
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    let target = request.url;
    if (url.pathname.includes('/assets/') && !isAddonAsset(url.pathname)) {
      const basename = url.pathname.split('/').pop();
      if (ROOT_IMAGES.has(basename)) target = new URL('../' + basename, url).href;
    }
    const response = await fetch(target);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone()).catch(()=>{});
      if (target !== request.url) cache.put(target, response.clone()).catch(()=>{});
    }
    return response;
  })().catch(async () => {
    const url = new URL(request.url);
    if (request.destination === 'image' && url.pathname.includes('/assets/')) {
      const basename = url.pathname.split('/').pop();
      if (ROOT_IMAGES.has(basename)) return (await caches.match(new URL('../' + basename, url).href)) || Response.error();
    }
    return (await caches.match(request)) || Response.error();
  }));
});
