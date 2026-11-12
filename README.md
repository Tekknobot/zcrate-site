# SAMPLE-01 documentation

Static user guide and workflow reference for SAMPLE-01 by Zillatronics.

## Pages
- `index.html` — documentation overview, workspace screenshot, core controls and basic workflow.
- `manual.html` — written instructions for passage discovery, editing, randomization, progressions and WAV export.
- `privacy.html` — app-only privacy policy for SAMPLE-01.
- `styles.css` — shared responsive styles.

## Assets
- `assets/sample-01-wordmark.png` — product wordmark.
- `assets/zillatronics-logo.png` — original supplied logo, retained as a source asset.
- `assets/app_icon_512x512.png` — hero app icon and Apple touch icon.
- `assets/Screenshot.png` — workspace preview with a full-resolution link.
- `assets/favicon.svg` — browser favicon.
- `assets/sample-01-social.jpg` — 1200 × 630 social sharing card (JPEG).
- `assets/logotype.png` — SAMPLE-01 logotype used in both page headers and footers.

## Preview and deploy
Run `python3 -m http.server 8000` from this directory and open http://localhost:8000.
Upload the folder contents to any static host. No build step is required.

## Search and social sharing
The production URL is `https://sample-01-manual.vercel.app/`.

Each page includes its own title, description, canonical URL, Open Graph tags, and X large-image card tags. The homepage includes TechArticle, WebSite, Organization, and SoftwareApplication structured data describing the documentation and its subject. `robots.txt` permits crawling and points to the three-page `sitemap.xml`.

The social card uses the supplied logotype and app screenshot as references. It was created with the built-in ImageGen tool and exported as a 1200 × 630 JPEG. The generation prompt is in `social-card-prompt.txt`.

Deploy the updated HTML, `robots.txt`, `sitemap.xml`, and `assets/sample-01-social.jpg` together to Vercel. These local changes take effect on the public site only after deployment. Social services may retain previous previews until they recrawl the link. If the public domain changes, update the absolute URLs in all three HTML files, `robots.txt`, and `sitemap.xml`.

Metadata references: [Open Graph](https://ogp.me/) and [Google canonical URL guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
