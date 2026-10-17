# BLACKED FINAL FUSION — upload-ready static website

## Experiences and features
- **Home** with Sanskari Edit campaign and links to the brand's three key experiences.
- **Innerwear**: searchable campaign/style reference, wishlist, two-item comparison, local fit notes, local image preview and eight-frame concept viewer.
- **Boyfriend**: date planner, message generator, browser copy action and conversation starters.
- **Wellness 18+**: age self-attestation gate, adult accessories/product/lifestyle-reference categories, search/filter, details, wishlist and demo bag. The images you shared are grouped here, including explicit product reference images, not on the public home page.
- Mobile navigation, overlay detail views, responsive cards and local-only personal controls.

## Free GitHub Pages deployment
1. Download and extract this ZIP.
2. Make a backup of the existing repository first.
3. Upload `index.html` and the full `assets/` folder to the root of the repository you choose. Keep filenames/folder structure unchanged.
4. Commit the changes and check repository Settings → Pages.
5. After Pages deploys, test the site on Android in Chrome at 360px and 390px widths.

No paid APIs, packages, npm build step, database or external fonts are used. The eight-frame style viewer links to public `Brand-website-3` raw image URLs, and the nine-frame wellness viewer links to public `Brand-website-2` frames. The wider Innerwear catalog also uses existing public image files in `Brand-website-3`. If those repositories are unavailable, cards fall back to a local campaign image; copying the assets into this repository later would remove the cross-repo image dependency.

## Important limitations
- Static front-end prototype only: no real login/accounts, payment, live inventory, delivery, order placement, provider system, real booking or admin analytics. The demo bag is temporary in-memory state.
- Saved styles and fit notes use this browser's local storage. Adult access is self-attestation, not formal age verification.
- The manual photo preview does not perform AI try-on or predict fit. The angle frames are generated concept artwork, not a verified physical product scan.
- Images are user-supplied references. Product supplier, price, materials, dimensions and safety certifications are unverified. Any claims embedded in product images are not endorsed. A watermarked stock image is preserved as a reference only; obtain appropriate rights before commercial use.
- Connected GitHub permissions are read-only, so this ZIP has not been committed or deployed automatically.
