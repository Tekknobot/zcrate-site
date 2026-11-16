import {pages,screens} from './content.mjs';
const icons = {
 home:'<path d="m3 10 9-7 9 7v11H3zM9 21v-8h6v8"/>',
 play:'<path d="m8 4 12 8-12 8z"/>',
 grid:'<path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z"/>',
 folder:'<path d="M3 6h7l2 3h9v11H3z"/>',
 arrange:'<path d="M3 4h5v16H3zM12 4h9v6h-9zM12 14h9v6h-9z"/>',
 piano:'<path d="M3 4h18v16H3zM7 4v10M12 4v16M17 4v10M7 14v6M17 14v6"/>',
 drum:'<path d="M3 4h4v4H3zM11 4h4v4h-4zM19 4h2v4h-2zM7 11h4v4H7zM15 11h4v4h-4zM3 18h4v3H3zM11 18h4v3h-4z"/>',
 sliders:'<path d="M3 6h18M3 12h18M3 18h18M8 3v6M16 9v6M10 15v6"/>',
 levels:'<path d="M4 21V10h3v11M11 21V3h3v18M18 21v-7h3v7"/>',
 spark:'<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>',
 wave:'<path d="M2 12h3l2-7 3 14 4-16 3 14 2-5h3"/>',
 image:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="m3 17 6-6 4 4 3-3 5 5"/><circle cx="15" cy="8" r="1"/>',
 export:'<path d="M12 16V3m-5 5 5-5 5 5M4 14v7h16v-7"/>',
 cursor:'<path d="m5 3 15 10-8 1-4 7z"/>',
 book:'<path d="M12 5C9 3 5 3 2 4v16c4-1 7-1 10 1 3-2 6-2 10-1V4c-3-1-7-1-10 1v16"/>',
 help:'<circle cx="12" cy="12" r="9"/><path d="M9 8a3 3 0 0 1 6 0c0 2-3 2-3 5M12 16v2"/>',
 record:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 10v8M12 6v2"/>'
};
export const icon = name => `<svg viewBox="0 0 24 24" aria-hidden="true">${icons[name]||icons.book}</svg>`;
export const esc = value => String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const cards = [
 ['library','01','Find a passage','Index your recordings and narrow the search.','orange'],
 ['editor','02','Shape a sample idea','Move, trim and combine audio on the canvas.','mint'],
 ['synths','03','Add notes and chords','Bass, lead, poly and pad in one workspace.','purple'],
 ['drums','04','Build a rhythm','Sequence a synthesized kit, step by step.','pink'],
 ['arrangement','05','Make an arrangement','Capture ideas and place them on a timeline.','blue'],
 ['export','06','Take it into your DAW','Save audio, MIDI and a portable project.','yellow']
];

export function home(){
 return `<div class="home-content">
 <div class="breadcrumb">Manual <span>/</span> Welcome</div>
 <div class="home-intro"><p class="eyebrow"><span class="status-dot"></span> YOUR RECORDINGS. YOUR WORKSPACE.</p><h1>A collection of sounds.<br><span>A place to begin.</span></h1><p class="lead">The SAMPLE-01 field manual. Find a passage, shape an idea,<br class="desktop-break"> add instruments, and build an arrangement you can take further.</p></div>
 <div class="build-notice"><span>1.1.0 / BUILD 7</span><p>Development manual. These instructions cover the current local build; some controls differ from version 1.0.6.</p></div>
 <section class="start-panel" aria-labelledby="startTitle"><div class="start-copy"><span class="eyebrow">START HERE</span><h2 id="startTitle">Your first<br>sample idea.</h2><p>From a folder of recordings to<br>an editable loop and a saved project.</p><a class="dark-button" href="#/quickstart">Follow the quick start <span>↗</span></a><span class="reading-time">${icon('book')} A guided first session</span></div><div class="hero-visual"><div class="hero-grid" aria-hidden="true"></div><div class="screen-window"><div class="window-top"><span><i></i><i></i><i></i></span> SAMPLE-01 / THE EDITOR <span>＋</span></div><img src="assets/manual/01-editor.png" alt="SAMPLE-01 sample editor with a generated demo hook and the passage library" width="1600" height="1000" fetchpriority="high"></div><span class="hero-sticker">FIND.<br>SHAPE.<br>ARRANGE.</span></div></section>
 <section class="explore-section" aria-labelledby="exploreTitle"><div class="section-heading"><h2 id="exploreTitle">Get to know the workspace</h2><span>ONE PART AT A TIME</span></div><div class="chapter-grid">${cards.map(([id,n,title,desc,color])=>`<a class="chapter-card ${color}" href="#/${id}"><div class="card-top"><span class="card-icon">${icon(pages[id].icon)}</span><span class="chapter-number">${n} <b>↗</b></span></div><h3>${title}</h3><p>${desc}</p></a>`).join('')}</div></section>
 <a href="#/screens" class="screens-banner"><div><span class="eyebrow">A CLOSER LOOK</span><h2>See the controls.</h2><p>Six app screens, with room to explore.</p></div><div class="screen-stack" aria-hidden="true">${['03-synths.png','04-drums.png','02-arrangement.png'].map(file=>`<img src="assets/manual/${file}" alt="" width="1600" height="1000" loading="lazy">`).join('')}</div><span class="banner-arrow">↗</span></a>
 <div class="home-links"><a href="#/ideas">${icon('spark')}<span><small>NEW IDEA / VARY CURRENT</small>Understand the six sample locks.</span><b>↗</b></a><a href="#/projects">${icon('folder')}<span><small>PROJECTS & RECOVERY</small>Keep the work you want to return to.</span><b>↗</b></a></div>
 <section class="overview-section" aria-labelledby="overviewTitle"><div class="section-heading"><h2 id="overviewTitle">Feature overview</h2><span>VIDEO WALKTHROUGH</span></div><figure class="overview-video"><video controls playsinline preload="metadata" poster="assets/Screenshot.png" width="1812" height="1080" aria-label="SAMPLE-01 feature overview" aria-describedby="overviewCaption"><source src="assets/Overview.mp4" type="video/mp4">Your browser does not support embedded video. <a href="assets/Overview.mp4">Open the overview video</a>.</video><figcaption id="overviewCaption">A companion walkthrough. Controls may differ from the 1.1.0 development build. <a href="assets/Overview.mp4" target="_blank" rel="noopener">Open video ↗</a></figcaption></figure></section>
 <div class="home-help"><span>${icon('help')} Looking for a particular control?</span><a href="#/help">Find a quick answer ↗</a></div><div class="version-note"><span class="status-dot"></span> 1.1.0 · Development build 7 <span>Local audio. Practical instructions.</span></div></div>`;
}
