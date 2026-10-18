(() => {
'use strict';
if (document.documentElement.dataset.blackedFusionAddon === '4.1') return;
document.documentElement.dataset.blackedFusionAddon = '4.1';

const ROOT_ASSETS = new Set([
 'aankhein-neeche.webp','campaign-innerwear.webp','campaign-sanskari.webp','campaign-wellness.webp',
 'entry-shareef.webp','hero-model-crop.webp','icon-192.png','icon-512.png','mirror-knows-everything.webp',
 'model-innerwear-wide.webp','model-innerwear.webp','model-sanskari.webp','model-wellness.webp','pallu-shareef.webp',
 'product-curved.webp','product-everyday-bra.webp','product-lace-bra.webp','product-massager.webp','product-wellness.webp',
 'sanskari-ankhein.webp','sanskari-entry.webp','sanskari-mirror.webp','sanskari-pallu.webp','sanskari-raat.webp'
]);
const EXTRA_SANSKARI = [
 {name:'Aankhein Neeche · Original',image:'aankhein-neeche.webp',caption:'Original repository image · separate composition'},
 {name:'Entry Shareef · Original',image:'entry-shareef.webp',caption:'Original repository image · statement campaign'},
 {name:'Mirror Knows · Original',image:'mirror-knows-everything.webp',caption:'Original repository image · mirror editorial'},
 {name:'Pallu Shareef · Original',image:'pallu-shareef.webp',caption:'Original repository image · black-lace campaign'},
 {name:'Sanskari Outside. Bold Inside.',image:'assets/new-gallery/sanskari-campaign-wide.webp',caption:'New gallery image · wide campaign'},
 {name:'Raat Shareef Hai. Khayal Nahi.',image:'assets/new-gallery/sanskari-campaign-burgundy.webp',caption:'New gallery image · burgundy drape mood'},
 {name:'Shareef Si Nazar. Dangerous Sa Iraada.',image:'assets/new-gallery/sanskari-campaign-black.webp',caption:'New gallery image · black and gold'},
 {name:'Mirror Knows Everything · Edit',image:'assets/new-gallery/sanskari-mirror-edit.webp',caption:'New gallery image · mirror variation'},
 {name:'Sanskari Raat · Navy & Gold',image:'assets/new-gallery/sanskari-campaign-blue.webp',caption:'New gallery image · navy campaign'},
 {name:'Entry Shareef · Campaign Edit',image:'assets/new-gallery/sanskari-campaign-entry.webp',caption:'New gallery image · doorway composition'},
 {name:'Taiyari Masoom Hai. Asar Nahi.',image:'assets/new-gallery/sanskari-campaign-gold.webp',caption:'New gallery image · gold palette'},
 {name:'Pallu Shareef Hai. Kahani Nahi.',image:'assets/new-gallery/sanskari-campaign-sheer.webp',caption:'New gallery image · drape-focused artwork'},
 {name:'Sanskari Outside. Dangerous Inside.',image:'assets/new-gallery/sanskari-black-lace-alt.webp',caption:'New gallery image · black-lace concept'},
 {name:'Sweet Face. Dark Mood.',image:'assets/new-gallery/sanskari-editorial-black.webp',caption:'New gallery image · editorial concept'}
];
const WELLNESS_IMAGES = [
 {name:'Silver gem detail',image:'assets/new-wellness/silver-gems.webp',caption:'User-shared product reference · specifications unverified'},
 {name:'Red heart accessory',image:'assets/new-wellness/silver-heart.webp',caption:'User-shared product reference · specifications unverified'},
 {name:'Pink gem accessory',image:'assets/new-wellness/silver-pink-gem.webp',caption:'User-shared product reference · specifications unverified'},
 {name:'Soft comfort campaign · yellow',image:'assets/new-wellness/plush-campaign-yellow.webp',caption:'Lifestyle/editorial reference, not a product specification'},
 {name:'Soft comfort campaign · white',image:'assets/new-wellness/plush-campaign-white.webp',caption:'Lifestyle/editorial reference'},
 {name:'Pastel comfort editorial',image:'assets/new-wellness/plush-campaign-pink.webp',caption:'Campaign inspiration'},
 {name:'18+ product reference',image:'assets/new-wellness/product-warning-reference.webp',caption:'Packaging/reference wording has not been independently verified'},
 {name:'Purple and pink product',image:'assets/new-wellness/purple-pink-product.webp',caption:'User-shared product reference · supplier and claims unverified'},
 {name:'Pink accessories flatlay',image:'assets/new-wellness/pink-accessories-flatlay.webp',caption:'Adult wellness accessory reference'},
 {name:'Dark product range',image:'assets/new-wellness/dark-product-flatlay.webp',caption:'Reference image · not live stock'},
 {name:'Red heart close-up',image:'assets/new-wellness/red-heart-closeup.webp',caption:'Detail/reference image'},
 {name:'Dual massager with box',image:'assets/new-wellness/dual-massager-box.webp',caption:'Product packaging/reference; no supplier verification'},
 {name:'Pink cuffs editorial',image:'assets/new-wellness/pink-cuffs-editorial.webp',caption:'18+ styling reference'},
 {name:'Animated product reference',image:'assets/new-wellness/animated-product.gif',caption:'User-shared animated product reference'}
];
function normalizeExistingImage(img) {
 const src = img.getAttribute('src');
 if (!src || !src.includes('assets/')) return;
 if (src.includes('assets/new-gallery/') || src.includes('assets/new-wellness/')) return;
 const tail = src.split('assets/').pop().split(/[?#]/)[0];
 if (ROOT_ASSETS.has(tail)) img.setAttribute('src', './' + tail);
}
function normalizeExistingImages(root=document) {
 root.querySelectorAll('img[src]').forEach(normalizeExistingImage);
}
// The SW also rewrites root-image requests, but this catches existing DOM images and future nodes.
normalizeExistingImages();
const imageObserver = new MutationObserver(records => records.forEach(record => {
 record.addedNodes.forEach(node => {
  if (node.nodeType !== 1) return;
  if (node.matches?.('img[src]')) normalizeExistingImage(node);
  normalizeExistingImages(node);
 });
}));
imageObserver.observe(document.documentElement, {subtree:true,childList:true});

function makeImageCard(item, cls='image-card fusion-image-card') {
 const article=document.createElement('article'); article.className=cls;
 const button=document.createElement('button'); button.type='button'; button.className='fusion-gallery-open';
 button.setAttribute('aria-label','Open image: '+item.name); button.dataset.fusionPreview='1';
 button.dataset.image=item.image; button.dataset.title=item.name; button.dataset.caption=item.caption;
 const img=document.createElement('img'); img.src=item.image.startsWith('assets/')?'./'+item.image:'./'+item.image;
 img.alt=item.name; img.loading='lazy'; img.decoding='async'; img.dataset.fusionImage='1';
 button.appendChild(img);
 const meta=document.createElement('div'); meta.className='image-meta';
 const title=document.createElement('h3'); title.textContent=item.name;
 const desc=document.createElement('p'); desc.textContent=item.caption;
 meta.append(title,desc); article.append(button,meta);
 return article;
}
function addSanskariGallery() {
 const section=document.querySelector('#sanskari'); if(!section || document.querySelector('#fusionSanskariMore')) return;
 const oldGrid=section.querySelector('.image-grid'); if(!oldGrid) return;
 const panel=document.createElement('div'); panel.id='fusionSanskariMore'; panel.className='fusion-extra-gallery';
 const heading=document.createElement('div'); heading.className='section-head';
 heading.innerHTML='<div><p class="eyebrow">More from your image library</p><h3>19 distinct campaign images. <span class="accent">One Sanskari Edit.</span></h3><p>The original repository images are kept, with 14 additional individual views from the project image library. Tap any image to zoom.</p></div>';
 const grid=document.createElement('div'); grid.className='image-grid fusion-more-grid';
 EXTRA_SANSKARI.forEach((item,index)=>{const card=makeImageCard(item);card.dataset.fusionIndex=String(index);card.dataset.fusionGroup='sanskari';grid.appendChild(card)});
 panel.append(heading,grid); oldGrid.insertAdjacentElement('afterend',panel);
 const badge=section.querySelector('.cart-badge'); if(badge)badge.textContent='19 campaign images · local assets';
}
function addWellnessGallery() {
 const content=document.querySelector('#wellnessContent'); if(!content || document.querySelector('#fusionWellnessGallery')) return;
 const panel=document.createElement('div'); panel.id='fusionWellnessGallery'; panel.className='fusion-wellness-gallery';
 const heading=document.createElement('div'); heading.className='section-head';
 heading.innerHTML='<div><p class="eyebrow">Product photo library · adults 18+</p><h3>Wellness references <span class="accent">in one place.</span></h3><p>Fourteen separate user-provided images, kept inside the existing Wellness age gate. These are references, not verified inventory, prices or safety certifications.</p></div>';
 const grid=document.createElement('div'); grid.className='fusion-wellness-grid';
 WELLNESS_IMAGES.forEach((item,index)=>{const card=makeImageCard(item,'fusion-wellness-card');card.dataset.fusionIndex=String(index);card.dataset.fusionGroup='wellness';grid.appendChild(card)});
 panel.append(heading,grid);
 const fitOrEnd=content.querySelector('#wellness-size-guide, .tool-grid, .section:last-child');
 content.appendChild(panel);
}
function buildLightbox() {
 if(document.querySelector('#fusionImageLightbox'))return;
 const wrap=document.createElement('div');wrap.id='fusionImageLightbox';wrap.className='fusion-lightbox';wrap.hidden=true;
 wrap.setAttribute('role','dialog');wrap.setAttribute('aria-modal','true');wrap.setAttribute('aria-label','Image preview');
 wrap.innerHTML='<div class="fusion-lightbox-panel"><div class="fusion-lightbox-head"><div><p class="eyebrow">Image preview</p><h3 class="fusion-lightbox-title"></h3></div><button type="button" class="fusion-lightbox-close" aria-label="Close image preview">×</button></div><img class="fusion-lightbox-img" alt=""><p class="fusion-lightbox-caption"></p><div class="fusion-lightbox-nav"><button type="button" class="btn btn-outline fusion-lightbox-prev">← Previous</button><button type="button" class="btn btn-pink fusion-lightbox-next">Next →</button></div></div>';
 document.body.appendChild(wrap);
 const close=()=>{wrap.hidden=true;document.body.classList.remove('fusion-lightbox-open')};
 wrap.querySelector('.fusion-lightbox-close').addEventListener('click',close);
 wrap.addEventListener('click',e=>{if(e.target===wrap)close()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!wrap.hidden)close()});
 wrap.__close=close;
}
function openGalleryPreview(card) {
 const group=card.dataset.fusionGroup; const cards=[...document.querySelectorAll(`[data-fusion-group="${group}"]`)];
 const index=cards.indexOf(card); if(index<0)return;
 const show=i=>{
  const item=cards[(i+cards.length)%cards.length]; const b=item.querySelector('[data-fusion-preview]');
  const m=wrap.querySelector('.fusion-lightbox-img');m.src=b.dataset.image.startsWith('assets/')?'./'+b.dataset.image:'./'+b.dataset.image;m.alt=b.dataset.title;
  wrap.querySelector('.fusion-lightbox-title').textContent=b.dataset.title;wrap.querySelector('.fusion-lightbox-caption').textContent=b.dataset.caption;
  wrap.querySelector('.fusion-lightbox-prev').onclick=()=>show(i-1);wrap.querySelector('.fusion-lightbox-next').onclick=()=>show(i+1);
  wrap.hidden=false;document.body.classList.add('fusion-lightbox-open');wrap.querySelector('.fusion-lightbox-close').focus();
 };
 const wrap=document.querySelector('#fusionImageLightbox'); if(wrap)show(index);
}
function installImageFallback() {
 document.addEventListener('error',event=>{
  const img=event.target;if(!img || img.tagName!=='IMG' || img.dataset.fusionRetry==='1')return;
  img.dataset.fusionRetry='1';
  const src=img.getAttribute('src')||''; const tail=src.split('assets/').pop().split(/[?#]/)[0];
  if(src.includes('assets/') && !src.includes('assets/new-gallery/') && !src.includes('assets/new-wellness/') && ROOT_ASSETS.has(tail)) { img.src='./'+tail; return; }
  img.classList.add('fusion-image-unavailable');img.alt=(img.alt||'Image')+' (unavailable)';
 },true);
}
function installGalleryEvents() {
 document.addEventListener('click',event=>{
  const btn=event.target.closest('[data-fusion-preview]'); if(!btn)return;
  const card=btn.closest('[data-fusion-group]'); if(card)openGalleryPreview(card);
 });
}
function start() {
 buildLightbox();installImageFallback();addSanskariGallery();addWellnessGallery();installGalleryEvents();normalizeExistingImages();
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true}); else start();
// Fusion 4.0 did not register its checked-in service worker. Register this repaired worker once the page is live.
if('serviceWorker' in navigator && location.protocol.startsWith('http')) {
 window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}),{once:true});
}
})();
