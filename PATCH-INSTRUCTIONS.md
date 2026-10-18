# BLACKED Delta Patch — 18 October 2026

This is a **changed-files-only** package. It does not copy the seven original design-board PNGs or legacy images already present in your repository. It includes only the replacement `index.html`, a new gallery folder, and this install guide.

## Target repository
`bhanu13yadav1-ai/Brand-website-final-` (default branch `main`). The original seven design boards are stored at the root; the broken `design-previews/` links are fixed to root-level paths.

## Included
- `index.html` — replacement HTML/CSS/JS, with Home and three focused destinations: Innerwear + Fit Studio, Boyfriend, and Wellness 18+.
- `assets/new-gallery/` — 34 optimized WebP images newly used by this update. They include seven separate Boyfriend/café images, Sanskari campaign/lookbook images, generated lingerie still-lifes from the Project library, Wellness hero and product concepts, and the latest supplied wellness reference images.
- `PATCH-INSTRUCTIONS.md` — upload steps and honest limitations.

## Features improved
- Innerwear gallery expanded to 16 distinct items, with search, category filtering, sorting, wishlist, three-item compare, demo bag and product detail. Product detail uses the selected item image; it no longer pretends unrelated images are that product's gallery.
- Added project-library photos so different styles can show different local fallback images instead of a single shared placeholder.
- Boyfriend gallery uses separate supplied images and includes the date planner, message generator, copy action, and conversation starters.
- Wellness includes an 18+ self-attestation gate, separate product and lifestyle galleries, search/category/sort, existing repository concept cards and Comfort Finder. It is not formal age verification.
- Seven original base-repo visual boards now load from the correct root paths, and can open in the larger preview. The original PNGs are not duplicated in this ZIP.
- Image fallback chain handles relative, raw GitHub, `data:` and `blob:` URLs. If an external repository image fails, each item falls back to its own local image; Fit Studio does not substitute an unrelated garment cut-out.
- 360 viewer uses repository frames when available; when a requested angle fails, it uses a local static reference clearly labelled as a fallback, not a genuine view of that angle.
- Mobile spacing was kept compact: image cards are in scrollable or two/three-column grids, with separate destinations to avoid a congested long home screen.

## Upload from Android/GitHub
1. Download and extract the ZIP.
2. Back up the target repository's root `index.html` first.
3. Replace **only** the root `index.html` with this version.
4. Upload `assets/new-gallery/` as a new folder at the repository root. Keep the subfolder and filenames intact. Do not delete existing repo images or other files.
5. Commit and wait for GitHub Pages to finish. Then open the Pages URL with `?v=delta-20261018b` to reduce stale-cache confusion.

## Limitations
- Existing images are referenced from public `Brand-website-2` and `Brand-website-3` URLs where the repository already has the originals, with a local fallback. Original images are intentionally not bundled again in this delta ZIP.
- This remains a free static prototype: no real checkout, payment, inventory, user accounts, admin analytics, verified booking, or connected backend. Sample prices are illustrative. Please verify supplier details, image rights, product claims, and relevant local legal/privacy requirements before commercial launch.
- Automated in-memory browser regression: 25/25 checks passed, including forced failure of remote image requests, navigation, filtering, detail, wishlist, compare, demo bag, Boyfriend tools, Wellness age gate/finder and design-board modal. This is not a live GitHub Pages/Android device test.
- The connected GitHub permission is read-only, so the files have not been committed or deployed on your behalf.
