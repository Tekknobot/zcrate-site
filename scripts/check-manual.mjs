import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {pages,groups,pageOrder,screens,legacyRoutes} from '../manual/content.mjs';
import {home} from '../manual/ui.mjs';
const root=new URL('../',import.meta.url);
assert.equal(new Set(pageOrder).size,pageOrder.length,'Duplicate chapter routes');
assert.deepEqual(new Set(pageOrder),new Set(Object.keys(pages)),'Page order must cover every chapter');
for(const group of groups)for(const id of group.items)assert.ok(pages[id],`Unknown navigation chapter: ${id}`);
for(const [from,to] of Object.entries(legacyRoutes))assert.ok(pages[to.split('/')[0]],`Broken legacy route: ${from}`);
const texts=[home()];
for(const [id,page] of Object.entries(pages)){
 assert.ok(page.title&&page.description,`Missing chapter metadata: ${id}`);
 assert.equal(new Set(page.sections.map(s=>s.id)).size,page.sections.length,`Duplicate sections: ${id}`);
 texts.push(...page.sections.map(s=>s.body));
}
for(const html of texts){
 for(const [,id,section] of html.matchAll(/href="#\/([^/"#]+)(?:\/([^"#]+))?"/g)){
  assert.ok(pages[id],`Missing chapter: ${id}`);
  if(section)assert.ok(pages[id].sections.some(s=>s.id===section),`Missing section: ${id}/${section}`);
 }
 for(const [,asset] of html.matchAll(/(?:src|poster|data-image)="([^"#]+)"/g)){
  if(!/^(https?:|data:)/.test(asset))await access(new URL(asset,root));
 }
}
assert.equal(screens.length,6,'Expected six current app screenshots');
for(const screen of screens){
 const png=await readFile(new URL('assets/manual/'+screen.file,root));
 assert.equal(png.subarray(1,4).toString(),'PNG',`Invalid screenshot: ${screen.file}`);
 assert.equal(png.readUInt32BE(16),1600);assert.equal(png.readUInt32BE(20),1000);
}
for(const file of ['index.html','manual.html','privacy.html']){
 const html=await readFile(new URL(file,root),'utf8');
 assert.ok(html.includes('rel="canonical"'),`Missing canonical: ${file}`);
 assert.ok(html.includes('twitter:card'),`Missing share metadata: ${file}`);
 for(const [,json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g))JSON.parse(json);
}
await access(new URL('manual/fonts/Inter.ttf',root));
await access(new URL('manual/fonts/Inter-LICENSE.txt',root));
const config=JSON.parse(await readFile(new URL('vercel.json',root),'utf8'));
assert.equal(config.outputDirectory,'dist');assert.equal(config.buildCommand,'npm run build');
console.log(`Checked ${pageOrder.length} chapters, internal links, six screenshots, fonts, metadata and Vercel configuration.`);
