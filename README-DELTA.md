# BLACKED Fusion 4.1 — non-destructive delta for the current `Brand-website-4f`

This is a **delta package only** for the current Fusion 4.0 base. It preserves the current `index.html`, `app.js`, `styles.css`, manifest and original images as-is in the ZIP; you apply the very small changes in `INDEX-HTML-PATCH.txt` to the existing index. It replaces `sw.js` and adds two external enhancement files plus new image folders.

## Why this fixes the broken images
The current service worker precached several paths such as `assets/sanskari-raat.webp`, but those source images are at the repository root. This update pre-caches the real root paths, and requests with an old `assets/<root-image>` path are mapped to the matching root image. It also removes old `blacked-fusion-*` caches on activation so a stale broken cache is not reused.

## What gets added
- A second, scrollable Sanskari gallery with **14 distinct image files**: 4 existing root-level campaign assets plus 10 individual WebP poster crops separated from the project-generated gallery contact sheet. Combined with the existing five-image edit, the section displays 19 campaign visuals. The original root files are not re-bundled; the ten poster crops are lower resolution than original full-size sources because those source files were not mounted individually.
- A dedicated **Wellness product image gallery with 14 user-provided references**, inserted inside the existing Wellness 18+ gate.
- Image zoom/lightbox with previous/next controls, lazy-loaded responsive grids, labels/captions, and an individual fallback for any missing image.
- Existing Fusion 4.0 size guides, three wheel experiences, dark-fantasy deck, consent gate, Faith & Culture teaser, innerwear and boyfriend tools remain in the original files; this delta does not replace those features.

## Files in this ZIP
- **Replace** `sw.js` in the repository root.
- **Add** `fusion4-addons.js` and `fusion4-addons.css` to the repository root.
- Apply `INDEX-HTML-PATCH.txt` to the existing `index.html` (six image path fixes and two add-on tags; do not replace the complete page).
- **Add** `assets/new-gallery/` and `assets/new-wellness/`.
- Keep every existing root image and file. Do not upload this ZIP over the whole repository and do not delete the old asset files.

## Deploy from Android
1. Back up the repository first.
2. Extract this ZIP.
3. Upload/replace only `sw.js` at the root.
4. Apply the six path changes and insert the two tags exactly as described in `INDEX-HTML-PATCH.txt`.
5. Upload `fusion4-addons.js`, `fusion4-addons.css`, and both `assets/new-*` folders, preserving paths exactly. Replace `sw.js`.
6. Commit all changes, wait for GitHub Pages to publish, open the site, and refresh again after the service-worker update.
7. Test the live page at `https://bhanu13yadav1-ai.github.io/Brand-website-4f/?v=fusion41`.

## Honest limitations
This is still a static prototype: wheel rewards are mock, non-redeemable offers; no real supplier, stock, checkout, account or payment is connected. Private fantasy controls are a local UI prompt tool, not an encrypted vault. The 10 Sanskari poster crops were made from the project preview contact sheet because the individual original gallery files were unavailable in the mounted workspace. GitHub Pages/Android live visual regression has not been run from this read-only connection; the validation file covers source syntax, asset decode/path checks and ZIP integrity.
