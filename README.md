# SAMPLE-01 field manual

Searchable documentation for **SAMPLE-01 1.1.0 (7), development build**, checked against app source revision `a4dc2cd` on 16 November 2026. This edition covers the sample editor, library, synths, drums, mixer, arrangement, projects and export. Earlier app builds differ.

The design follows the ZPUNK and CHIPTUNES manuals, with SAMPLE-01's logotype and charcoal/amber palette. The site remains documentation: no checkout, pricing or store links. The existing Overview video stays on the welcome page; chapters use screenshots and written instructions.

## Preview and check

Requires Node.js 20 or newer. No npm dependencies or installation step.

```sh
npm run dev
npm run check
npm run build
```

Preview: <http://127.0.0.1:4175>. Build output: `dist/` (ignored by Git). To preview the production output, run `PREVIEW_DIR=dist npm run dev` after building. The build regenerates the static welcome content, complete manual and privacy page before checking links, assets and metadata.

## Content and layout

- `manual/content.mjs`: 23 routes in five groups; chapter copy, screenshot captions and legacy route mappings.
- `manual/ui.mjs`: welcome page and shared icons.
- `manual/app.js`: routing, search, contents, keyboard navigation and screenshot previews.
- `manual/styles.css`: shared desktop, tablet, phone and print styles.
- `manual/fonts/`: bundled Inter font and its license; no external font request.
- `index.html`: page shell, metadata and a generated static welcome page.
- `manual.html`: generated complete text edition, readable without JavaScript. With JavaScript, old manual anchors open the corresponding chapter.
- `privacy.html`: generated app-only privacy policy. No email address is listed.
- `scripts/render-pages.mjs`: shared generation for the static HTML editions.

Edit chapter copy in `manual/content.mjs`, not generated `manual.html` or `privacy.html`. Run `npm run build` after changing copy. Hash URLs such as `/#/arrangement/edit` can be shared directly and do not need a server rewrite.

## Images and video

`assets/manual/` contains six 1600 × 1000 screenshots of the actual 1.1.0 (7) workspace. They were captured through the app's local frontend using a separate demo index and generated audio; personal libraries, projects and recovery data were not used. See the capture notes in that folder.

`assets/Overview.mp4` is the existing homepage video. Its poster is `assets/Screenshot.png`; both may show earlier controls. `assets/logotype.png` supplies the header brand, and the original icon/favicon and source assets are retained.

The existing `assets/sample-01-social.jpg` is the 1200 × 630 share card, using the supplied branding and earlier workspace image. Its original ImageGen prompt remains in `social-card-prompt.txt`.

## Vercel and search previews

Production URL: <https://sample-01-manual.vercel.app/>.

`vercel.json` specifies `npm run build` and output directory `dist`. The site has no runtime service or package dependencies. Commit and deploy through the existing GitKraken/Vercel workflow. Local changes do not update the public site until deployed; this update does not create a new hosting project.

The three HTML entry points contain canonical links, descriptions, Open Graph/X share tags and structured data. `robots.txt` points to the three-entry `sitemap.xml`. Search engines can read the complete manual without running JavaScript. If the domain changes, update `index.html`, `scripts/render-pages.mjs`, `robots.txt` and `sitemap.xml`, then rebuild. Sharing services may cache previous previews until they recrawl.
