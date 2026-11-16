import {readFile,writeFile} from 'node:fs/promises';
import {pages,pageOrder} from '../manual/content.mjs';
import {home,esc} from '../manual/ui.mjs';

const base='https://sample-01-manual.vercel.app/';
function staticBody(id){
 return pages[id].sections.map(s=>{
  let body=s.body.replace(/href="#\/([^/"#]+)(?:\/([^"#]+))?"/g,(_,chapter,part)=>`href="${chapter==='welcome'?'./':chapter==='privacy'?'privacy.html'+(part?'#privacy--'+part:''):'manual.html#'+chapter+(part?'--'+part:'')}"`);
  body=body.replace(/<button([^>]*data-image="([^"]+)"[^>]*)>/g,(_,attrs,image)=>`<a${attrs} href="${image}">`).replace(/<\/button>/g,'</a>');
  return `<section class="article-section" id="${id}--${s.id}"><h2>${s.title}</h2>${body}</section>`;
 }).join('\n');
}
function documentPage(privacy=false){
 const title=privacy?'SAMPLE-01 App Privacy Policy':'SAMPLE-01 Manual — Complete Reference';
 const description=privacy?'The SAMPLE-01 app privacy policy: local audio processing with no off-device audio, analytics or crash reports.':'The complete written SAMPLE-01 1.1.0 development manual, including samples, synths, drums, arrangements, projects and export.';
 const file=privacy?'privacy.html':'manual.html';
 const ids=privacy?['privacy']:pageOrder.filter(id=>!['welcome','privacy'].includes(id));
 const aliases={quickstart:'start',passages:'discover',ideas:'randomization',help:'notes'};
 const contents=privacy?'':`<nav aria-label="Complete manual contents"><ul class="fallback-contents">${ids.map(id=>`<li><a href="#${id}">${pages[id].title}</a></li>`).join('')}</ul></nav>`;
 const body=ids.map(id=>`${aliases[id]?`<span id="${aliases[id]}"></span>`:''}<article class="fallback-chapter" id="${id}"><h2>${pages[id].title}</h2><p class="lead">${pages[id].description}</p>${staticBody(id)}</article>`).join('\n');
 const structured=JSON.stringify({'@context':'https://schema.org','@type':privacy?'WebPage':'TechArticle',name:title,url:base+file,inLanguage:'en',dateModified:'2026-11-16',isPartOf:{'@id':base+'#website'},about:{'@id':base+'#app'}});
 return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#151817"><title>${title}</title><meta name="description" content="${description}"><meta name="robots" content="index, follow, max-image-preview:large"><link rel="canonical" href="${base+file}"><link rel="icon" type="image/svg+xml" href="assets/favicon.svg"><link rel="apple-touch-icon" href="assets/app_icon_512x512.png"><link rel="stylesheet" href="manual/styles.css"><meta property="og:type" content="website"><meta property="og:site_name" content="SAMPLE-01 Manual"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="${base+file}"><meta property="og:image" content="${base}assets/sample-01-social.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title}"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${base}assets/sample-01-social.jpg"><script type="application/ld+json">${structured}</script><script type="module" src="manual/legacy.js"></script></head><body class="fallback-page"><a class="skip-link" href="#main">Skip to content</a><header class="topbar"><a class="brand" href="./" aria-label="SAMPLE-01 manual home"><img src="assets/logotype.png" alt="SAMPLE-01" width="1400" height="194"><span>THE FIELD<br>MANUAL</span></a><nav class="topbar-end" aria-label="Main navigation"><a href="./">Overview</a><a href="manual.html">Manual</a><a href="privacy.html">App privacy</a></nav></header><main id="main"><div class="fallback-intro"><p class="eyebrow">SAMPLE-01 / ${privacy?'APP PRIVACY':'DEVELOPMENT MANUAL'}</p><h1>${privacy?'App privacy policy':'The complete reference.'}</h1><p>${privacy?'Last updated: 16 November 2026. This policy covers the app only.':'Written for 1.1.0 development build 7. This full text edition also works without JavaScript.'}</p></div>${contents}${body}</main><footer class="site-footer"><a href="./">SAMPLE-01 <span>BY ZILLATRONICS</span></a><a href="manual.html">Complete manual</a><a href="privacy.html">App privacy</a></footer></body></html>\n`;
}
export async function renderPages(root){
 const html=await readFile(new URL('index.html',root),'utf8');
 await writeFile(new URL('index.html',root),html.replace(/<!--home-start-->[\s\S]*?<!--home-end-->/,`<!--home-start-->${home()}<!--home-end-->`));
 await writeFile(new URL('manual.html',root),documentPage());
 await writeFile(new URL('privacy.html',root),documentPage(true));
}
