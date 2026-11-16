import {pages,groups,pageOrder,screens,legacyRoutes} from './content.mjs';
const $ = s => document.querySelector(s);
import {home, icon, esc} from './ui.mjs';
let currentPage='',sectionObserver;
const nav = () => groups.map(g=>`<div class="nav-group"><h2>${g.name}</h2>${g.items.map(id=>`<a href="#/${id}" data-page="${id}">${icon(pages[id].icon)}<span>${pages[id].title}</span>${id==='screens'?'<small>06</small>':''}</a>`).join('')}</div>`).join('');
$('#desktopNav').innerHTML=nav();$('#mobileNav').innerHTML=nav();
function render(){
 if(location.hash==='#main'){$('#main').focus();return;}
 const raw=location.hash.slice(1);
 if(Object.hasOwn(legacyRoutes,raw)){history.replaceState(null,'',`#/${legacyRoutes[raw]}`);}
 const [route,sectionId]=location.hash.replace(/^#\/?/,'').split('/');
 const requested=route||'welcome';
 const id=Object.hasOwn(pages,requested)?requested:'not-found';
 document.querySelectorAll('dialog[open]').forEach(d=>d.close());
 if(id!==currentPage){
  sectionObserver?.disconnect();document.querySelectorAll('video').forEach(v=>v.pause());currentPage=id;
  const page=pages[id];
  document.title=page?`${page.title} — SAMPLE-01 Manual`:'Page not found — SAMPLE-01 Manual';
  $('#mobileTitle').textContent=page?.title||'Page not found';
  document.querySelectorAll('[data-page]').forEach(a=>{if(a.dataset.page===id)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  if(id==='welcome')$('#main').innerHTML=home();
  else if(!page)$('#main').innerHTML='<div class="home-content not-found"><p class="eyebrow">OFF THE GRID</p><h1>Page not found.</h1><p>This chapter does not exist.</p><a class="primary-button" href="#/welcome">Back to the manual ↗</a></div>';
  else{
   const index=pageOrder.indexOf(id),prev=pageOrder[index-1],next=pageOrder[index+1];
   $('#main').innerHTML=`<div class="doc-layout ${id==='screens'?'gallery-layout':''}"><article class="article"><div class="breadcrumb"><a href="#/welcome">Manual</a><span>/</span>${page.title}</div><header class="article-header"><p class="eyebrow">${page.label}</p><h1>${page.title}</h1><p class="lead">${page.description}</p><span class="article-meta">${icon('book')}${page.time}<span>1.1.0 · DEV 7</span></span></header><details class="mobile-toc"><summary>In this chapter</summary><nav aria-label="Chapter sections">${page.sections.map(s=>`<a href="#/${id}/${s.id}">${s.title}</a>`).join('')}</nav></details>${page.sections.map(s=>`<section class="article-section" id="${s.id}"><h2><a href="#/${id}/${s.id}">${s.title}<span aria-hidden="true">#</span></a></h2>${s.body}</section>`).join('')}<nav class="page-pagination" aria-label="Previous and next chapter">${prev?`<a href="#/${prev}"><small>← PREVIOUS</small><strong>${pages[prev].title}</strong></a>`:'<span></span>'}${next?`<a href="#/${next}"><small>UP NEXT →</small><strong>${pages[next].title}</strong></a>`:''}</nav></article><aside class="toc"><span>IN THIS CHAPTER</span><nav aria-label="On this page">${page.sections.map(s=>`<a href="#/${id}/${s.id}" data-section="${s.id}">${s.title}</a>`).join('')}</nav><div class="toc-note">Look a little closer.<span>Select an app screenshot<br>to open a larger preview.</span></div><a class="toc-top" href="#/${id}">Back to top ↑</a></aside></div>`;
   sectionObserver=new IntersectionObserver(entries=>{for(const e of entries)if(e.isIntersecting)document.querySelectorAll('.toc [data-section]').forEach(a=>a.classList.toggle('active',a.dataset.section===e.target.id));},{rootMargin:'-125px 0px -60% 0px'});
   document.querySelectorAll('.article-section').forEach(el=>sectionObserver.observe(el));
  }
  $('#main').focus({preventScroll:true});
 }
 requestAnimationFrame(()=>{const target=sectionId?document.getElementById(sectionId):null;if(target)target.scrollIntoView({block:'start'});else window.scrollTo(0,0);});
}
const plain = html=>{const d=document.createElement('div');d.innerHTML=html.replace(/<\/(p|div|li|h[1-6]|td|th|tr|figcaption)>/g,'</$1> ');return d.textContent.replace(/\s+/g,' ').trim();};
const searchIndex=Object.entries(pages).flatMap(([id,page])=>[{id,title:page.title,section:'',sectionTitle:'',text:page.description},...page.sections.map(s=>({id,title:page.title,section:s.id,sectionTitle:s.title,text:plain(s.body)}))]);
function search(){
 const query=$('#searchInput').value.trim().toLowerCase();
 if(!query){$('#searchStatus').textContent='GOOD PLACES TO START';$('#searchResults').innerHTML=['quickstart','library','editor','arrangement','export'].map(id=>`<a class="search-result" href="#/${id}">${icon(pages[id].icon)}<span><strong>${pages[id].title}</strong><small>${pages[id].description}</small></span><b>↗</b></a>`).join('');return;}
 const words=query.split(/\s+/);
 const results=searchIndex.map(item=>{const title=`${item.title} ${item.sectionTitle}`.toLowerCase(),text=item.text.toLowerCase();return {...item,score:words.every(w=>(title+' '+text).includes(w))?words.reduce((n,w)=>n+(title.includes(w)?5:1),0):0};}).filter(x=>x.score).sort((a,b)=>b.score-a.score);
 $('#searchStatus').textContent=results.length?`${results.length} RESULT${results.length===1?'':'S'} FOR “${query}”`:'NO MATCHES';
 $('#searchResults').innerHTML=results.length?results.slice(0,20).map(r=>{const first=r.text.toLowerCase().indexOf(words[0]);const start=Math.max(0,first-45);const snippet=(start?'…':'')+r.text.slice(start,start+150)+(r.text.length>start+150?'…':'');return `<a class="search-result" href="#/${r.id}${r.section?'/'+r.section:''}">${icon(pages[r.id].icon)}<span><strong>${esc(r.sectionTitle||r.title)}</strong><em>${esc(r.sectionTitle?r.title:'Chapter overview')}</em><small>${esc(snippet)}</small></span><b>↗</b></a>`;}).join(''):'<div class="empty-search"><span>⌕</span><h3>Try another phrase.</h3><p>Search for a control, track or task.<br>Try “New idea”, “save” or “synths”.</p></div>';
}
function openDialog(dialog){if(!dialog.open){dialog.showModal();document.body.classList.add('dialog-open');}}
for(const d of document.querySelectorAll('dialog')){
 d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]'))document.body.classList.remove('dialog-open');if(d.id==='imageDialog')$('#previewImage').removeAttribute('src');});
 d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});
}
function openSearch(){search();openDialog($('#searchDialog'));$('#searchInput').focus();}
document.addEventListener('click',e=>{
 if(e.target.closest('[data-search]'))openSearch();
 if(e.target.closest('[data-menu]'))openDialog($('#menuDialog'));
 if(e.target.closest('[data-close]'))e.target.closest('dialog').close();
 const pic=e.target.closest('[data-image]');if(pic){$('#imageOriginal').href=pic.dataset.image;$('#previewImage').src=pic.dataset.image;$('#previewImage').alt=pic.dataset.title;$('#imageTitle').textContent=pic.dataset.title;$('#imageCaption').textContent=pic.dataset.caption||'SAMPLE-01 1.1.0 · Development build 7';openDialog($('#imageDialog'));$('.image-scroll').scrollTop=0;}
 const a=e.target.closest('a[href^="#/"]');if(a){const d=a.closest('dialog');if(d)d.close();if(a.hash===location.hash)render();}
});
document.addEventListener('play',e=>{if(e.target.tagName==='VIDEO')document.querySelectorAll('video').forEach(v=>{if(v!==e.target)v.pause();});},true);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){const dialog=document.querySelector('dialog[open]');if(dialog){e.preventDefault();dialog.close();}return;}if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();const searchWasOpen=$('#searchDialog').open;document.querySelectorAll('dialog[open]').forEach(d=>d.close());if(!searchWasOpen)openSearch();}});
$('#searchInput').addEventListener('input',search);
$('#searchInput').addEventListener('keydown',e=>{if(e.key==='ArrowDown'){e.preventDefault();$('#searchResults a')?.focus();}else if(e.key==='Enter')$('#searchResults a')?.click();});
$('#searchResults').addEventListener('keydown',e=>{if(!['ArrowDown','ArrowUp'].includes(e.key))return;e.preventDefault();const links=[...$('#searchResults').querySelectorAll('a')];const i=links.indexOf(document.activeElement);if(e.key==='ArrowUp'&&i===0)$('#searchInput').focus();else links[Math.max(0,Math.min(links.length-1,i+(e.key==='ArrowDown'?1:-1)))]?.focus();});
window.addEventListener('hashchange',render);
render();
