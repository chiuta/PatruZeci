'use strict';
const $=s=>document.querySelector(s);
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const SOURCES=[
['Top 26 utilizări neobișnuite (wd40.com)','https://www.wd40.com/useArticle/unusual-uses-wd40/'],
['WD-40 Specialist: service pentru biciclete electrice (wd40.com)','https://www.wd40.com/article/wd-40-specialist-r-electric-bike-service-repair/'],
['Surprising Uses for WD-40 (And When Not to Use It) (Cheapism)','https://www.cheapism.com/uses-wd40'],
['18 Genius WD-40 Uses (Bob Vila)','https://www.bobvila.com/slideshow/9-unusual-ways-to-use-wd-40-48621'],
['12 WD-40 Hacks You\'ll Wish You Knew Sooner (SlashGear)','https://www.slashgear.com/1476225/wd-40-hacks-youll-wish-you-knew-sooner'],
['15 Ingenious Uses for WD-40 (Wide Open Country)','https://www.wideopencountry.com/?p=37316'],
['Unusual Uses for WD-40 (Instructables)','https://instructables.com/Unusual-Uses-for-WD-40'],
['WD-40 (Snopes)','https://www.snopes.com/inboxer/household/wd-40.asp'],
['Lista oficială „2000+ uses” (PDF, wd40.com)','https://img.thrfun.com/downloads/wd-40_2000useslist.pdf'],
['WD-40: ce este sigur și ce trebuie evitat (wd40.com)','https://www.wd40.com/article/what-wd-40-r-multi-use-product-is-safe-on-and-what-to-avoid/'],
['Harta site-ului wd40.com (produse noi)','https://www.wd40.com/sitemap/'],
['Almost 2000 uses for a can of WD-40 (Wise Bread)','https://www.wisebread.com/almost-2000-uses-for-a-can-of-wd-40-1'],
['6 Practical Uses For WD-40 Around The Garage (SlashGear)','https://www.slashgear.com/1615121/wd-40-practical-uses-garage-mechanic'],
['11 WD-40 Uses Every DIYer Should Know (SlashGear)','https://www.slashgear.com/2296296/best-wd-40-uses-for-diyers/'],
['10 Mistakes You Might Be Making When Using WD-40 (SlashGear)','https://www.slashgear.com/1633277/mistakes-using-wd-40/'],
['7 places to never use WD-40 (Tom\'s Guide)','https://www.tomsguide.com/how-to/7-places-to-never-use-wd-40-youll-be-surprised'],
['Mistakes Everyone Makes When Using WD-40 (House Digest)','https://www.housedigest.com/1858213/mistakes-avoid-using-wd-40-home-safety'],
['5 surprising places you should never use WD-40 (Homes & Gardens)','https://www.homesandgardens.com/solved/never-use-wd-40-these-places'],
['34 WD-40 Hacks (Family Handyman / Reader\'s Digest)','https://f-cce-6908.fhm.r.tmbi.com/?p=94555'],
['20 ingenious uses for WD-40 (Popular Science)','https://www.popsci.com/story/diy/strange-and-ingenuous-uses-for-wd-40/'],
['Lansare WD-40 Precision Pen (Business Wire, 2023)','https://secure.businesswire.com/news/home/20230726501144/en/WD-40-Brand-Launches-WD-40-Precision-Pen'],
['WD-40 Specialist Bio Lubricant (Biofuels Digest)','https://biofuelsdigest.com/tag/wd-40/']
];
let _id=0;
function illust(scene,param,label){
  const f=S[scene];let inner='';
  try{inner=f?f(param||''):'';}catch(e){inner='';}
  return `<svg class="ill" viewBox="0 0 240 150" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(label||'')}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}
const state={cat:'',fn:new Set(),q:'',fav:false,safe:false,rm:false};
let curIds=[];let favs=new Set();
try{favs=new Set(JSON.parse(localStorage.getItem('patruzeci-fav')||'[]'));}catch(e){}
function saveFavs(){try{localStorage.setItem('patruzeci-fav',JSON.stringify([...favs]));}catch(e){}}

/* ---- observator pentru randare leneșă + pauză în afara ecranului ---- */
const io=new IntersectionObserver(es=>{es.forEach(e=>{
  const el=e.target;
  if(e.isIntersecting){
    if(!el.dataset.done){
      if(el.dataset.fi!==undefined){const x=FULL[+el.dataset.fi];if(x){const sc=FSC[x[2]];el.querySelector('.iw').innerHTML=illust(sc[0],sc[1],x[1]);}}
      else{const u=USES[+el.dataset.i];if(u){el.querySelector('.iw').innerHTML=illust(u.s,u.p,u.t);}}
      el.dataset.done=1;}
    el.classList.add('vis');
  }else el.classList.remove('vis');
});},{rootMargin:'120px'});

function riskTag(r){return `<span class="tag r${r}">${RISK[r]}</span>`;}
function cardHTML(u){
  return `<article class="card" data-i="${u.id}" tabindex="0" aria-label="${esc(u.t)}"><div class="iw"></div><span class="catb">${CATS[u.c][1]}</span><button class="fav" data-f="${u.id}" aria-label="Favorit">${favs.has(u.id)?'★':'☆'}</button><div class="cb"><h3>${esc(u.t)}</h3><p>${esc(u.d)}</p><div class="tags">${riskTag(u.r)}${[...u.f].map(k=>`<span class="tag">${FUNCS[k]}</span>`).join('')}</div></div></article>`;
}
function matches(u){
  if(state.cat&&u.c!==state.cat)return false;
  if(state.fav&&!favs.has(u.id))return false;
  if(state.safe&&u.r>0)return false;
  if(state.fn.size){let ok=false;for(const k of state.fn)if(u.f.includes(k))ok=true;if(!ok)return false;}
  if(state.q){const h=norm(u.t+' '+u.d+' '+CATS[u.c][0]+' '+[...u.f].map(k=>FUNCS[k]).join(' ')+' '+u.n);for(const w of norm(state.q).split(/\s+/).filter(Boolean))if(!h.includes(w))return false;}
  return true;
}
function render(){
  const list=USES.filter(matches);curIds=list.map(u=>u.id);
  $('#cnt').textContent=`${list.length} din ${USES.length} utilizări`+(state.q?` pentru „${state.q}”`:'');
  const g=$('#grid');
  g.querySelectorAll('.card').forEach(c=>io.unobserve(c));
  g.innerHTML=list.length?list.map(cardHTML).join(''):'<div class="empty">Nimic găsit. Încearcă alt cuvânt sau scoate un filtru.</div>';
  g.querySelectorAll('.card').forEach(c=>io.observe(c));
}
/* ---- filtre ---- */
function buildChips(){
  const c=$('#cats');
  c.innerHTML=`<button class="chip on" data-c="">Toate</button>`+Object.keys(CATS).map(k=>`<button class="chip" data-c="${k}">${CATS[k][1]} ${CATS[k][0]}</button>`).join('');
  c.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;state.cat=b.dataset.c;c.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===b));render();});
  const f=$('#fns');
  f.innerHTML=Object.keys(FUNCS).map(k=>`<button class="chip fn" data-k="${k}">${FUNCS[k]}</button>`).join('');
  f.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;const k=b.dataset.k;if(state.fn.has(k)){state.fn.delete(k);b.classList.remove('on');}else{state.fn.add(k);b.classList.add('on');}render();});
}
/* ---- modal ---- */
function openUse(id){
  const u=USES[id];if(!u)return;
  const rel=USES.filter(x=>x.c===u.c&&x.id!==u.id).slice(0,4);
  const note=u.n?`<div class="note ${u.r===2?'bad':''}"><b>${u.r===2?'Nerecomandat. ':'Atenție. '}</b>${esc(u.n)}</div>`:(u.r===2?`<div class="note bad"><b>Nerecomandat.</b> Raportat de utilizatori, dar evită-l.</div>`:'');
  $('#sheet').innerHTML=`<div class="iw vis">${illust(u.s,u.p,u.t)}</div><div class="sb"><div class="mnav"><button class="btn" data-nav="-1" aria-label="Anterioara">‹</button><button class="btn" data-nav="1" aria-label="Următoarea">›</button><button class="x" id="mx" aria-label="Închide">✕</button></div><h2>${esc(u.t)}</h2><div class="tags">${riskTag(u.r)}${[...u.f].map(k=>`<span class="tag">${FUNCS[k]}</span>`).join('')}<span class="tag">${CATS[u.c][1]} ${CATS[u.c][0]}</span><span class="tag">${SRC[u.src]}</span></div><p>${esc(u.d)}</p>${note}${rel.length?`<div class="rel">${rel.map(x=>`<button class="chip" data-o="${x.id}">${esc(x.t)}</button>`).join('')}</div>`:''}<div class="rel"><button class="btn" data-fav="${u.id}">${favs.has(u.id)?'★ În favorite':'☆ Adaugă la favorite'}</button></div></div>`;
  $('#modal').classList.add('on');document.body.style.overflow='hidden';
  $('#modal').dataset.u=id;$('#modal').dataset.m='u';
  $('#sheet').scrollTop=0;
}
function stepUse(dir){
  if($('#modal').dataset.m==='f')return stepFull(dir);
  const cur=+$('#modal').dataset.u;let list=curIds.includes(cur)?curIds:USES.map(u=>u.id);
  const i=list.indexOf(cur);openUse(list[(i+dir+list.length)%list.length]);
}
function closeModal(){document.body.style.overflow='';$('#modal').classList.remove('on');$('#sheet').innerHTML='';}
function toggleFav(id){
  if(favs.has(id))favs.delete(id);else favs.add(id);saveFavs();
  const b=document.querySelector(`.fav[data-f="${id}"]`);if(b)b.textContent=favs.has(id)?'★':'☆';
  if(state.fav&&!favs.has(id))render();
}
function setMotion(off){
  state.rm=off;document.body.classList.toggle('rm',off);
  $('#motion').textContent=off?'Animații: oprite':'Animații: pornite';
}
function tab(k){
  document.querySelectorAll('section.tab').forEach(s=>s.classList.toggle('on',s.id==='tab-'+k));
  document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===k));
  window.scrollTo({top:0,behavior:'instant'});
}
function buildStatic(){
  $('#hero-ill').innerHTML=illust('gear','','Angrenaj ruginit, curățat prin pulverizare');
  $('#how-ill').innerHTML=illust('displace','','Deplasarea apei de pe metal');
  const five=[['Protejează','rust','shovel','Peliculă subțire contra ruginii.'],['Desprinde','bolt','nut','Pătrunde în filet și slăbește rugina.'],['Alungă umezeala','drops','cap','Împinge apa de pe suprafață.'],['Lubrifiază','hinge','door','Reduce frecarea și scârțâitul.'],['Curăță','stain','wall|#e8473b|scribble','Dizolvă adezivi, urme și murdărie.']];
  $('#fiveill').innerHTML=five.map(a=>`<div class="box vis"><div class="iw" style="background:none">${illust(a[1],a[2],a[0])}</div><h3 style="margin-top:8px">${a[0]}</h3><div style="color:var(--mut);font-size:14px">${a[3]}</div></div>`).join('');
  $('#rangegrid').innerHTML=RANGE.map(r=>`<article class="card vis" style="cursor:default"><div class="iw">${illust(r.s,r.p,r.t)}</div><div class="cb"><h3>${esc(r.t)}</h3><p style="display:block">${esc(r.d)}</p></div></article>`).join('');
  $('#avoidgrid').innerHTML=AVOID.map(a=>`<article class="card vis" style="cursor:default"><div class="iw">${illust('warn',a.s,a.t)}</div><div class="cb"><h3>${esc(a.t)}</h3><p style="display:block">${esc(a.d)}</p><div class="tags"><span class="tag r0">Mai bine: ${esc(a.a)}</span></div></div></article>`).join('');
  $('#srcl').innerHTML=SOURCES.map(s=>`<li><a href="${s[1]}" target="_blank" rel="noopener noreferrer">${esc(s[0])}</a></li>`).join('');
  $('#s-uses').textContent=USES.length;$('#s-idx').textContent=FULL.length;$('#s-cats').textContent=Object.keys(CATS).length;
}

/* ---- lista completă (1993) ---- */
const fs={sec:-1,fn:new Set(),q:'',safe:false};
let fList=[],fShown=0;const FBATCH=48;
const FRO=FULL.map(x=>norm(x[1]));
function fMatch(i){
  const x=FULL[i];
  if(fs.sec>=0&&x[0]!==fs.sec)return false;
  if(fs.safe&&x[4]>0)return false;
  if(fs.fn.size){let ok=false;for(const k of fs.fn)if(x[3].includes(k))ok=true;if(!ok)return false;}
  if(fs.q){for(const w of norm(fs.q).split(/\s+/).filter(Boolean))if(!FRO[i].includes(w))return false;}
  return true;
}
function fCard(i){
  const x=FULL[i];
  return `<article class="card" data-fi="${i}" tabindex="0" aria-label="${esc(x[1])}"><div class="iw"></div><span class="catb">${FSEC[x[0]][1]}</span><div class="cb"><h3>${esc(x[1])}</h3><div class="tags">${riskTag(x[4])}${[...x[3]].map(k=>`<span class="tag">${FUNCS[k]}</span>`).join('')}</div></div></article>`;
}
function fMore(){
  const g=$('#fgrid');const end=Math.min(fList.length,fShown+FBATCH);
  const frag=fList.slice(fShown,end).map(fCard).join('');
  g.insertAdjacentHTML('beforeend',frag);
  g.querySelectorAll('.card:not([data-obs])').forEach(c=>{c.dataset.obs=1;io.observe(c);});
  fShown=end;
  $('#fmore').style.display=fShown<fList.length?'block':'none';
  $('#fcnt').textContent=`${fList.length} din ${FULL.length} utilizări`+(fs.q?` pentru „${fs.q}”`:'')+(fShown<fList.length?` · afișate ${fShown}`:'');
}
function fRender(){
  fList=[];for(let i=0;i<FULL.length;i++)if(fMatch(i))fList.push(i);
  const g=$('#fgrid');g.querySelectorAll('.card').forEach(c=>io.unobserve(c));g.innerHTML='';fShown=0;
  if(!fList.length){g.innerHTML='<div class="empty">Nimic găsit. Încearcă alt cuvânt sau scoate un filtru.</div>';$('#fmore').style.display='none';$('#fcnt').textContent=`0 din ${FULL.length} utilizări`;return;}
  fMore();
}
function openFull(i){
  const x=FULL[i];if(!x)return;const sc=FSC[x[2]];const wp=sc[0]==='warn'?FWARN[sc[1]]:'';
  const note=x[5]?`<div class="note ${x[4]===2?'bad':''}"><b>${x[4]===2?'Nerecomandat. ':'Atenție. '}</b>${esc(x[5])}</div>`:x[4]===2?`<div class="note bad"><b>Nerecomandat. </b>${esc(wp||'Raportat de utilizatori, dar evită-l.')}</div>`:(x[4]===1?`<div class="note"><b>Atenție. </b>Testează întâi pe un loc ascuns; pentru uz de durată, pe încuietori, lanțuri sau plastic, alege un produs specializat.</div>`:'');
  $('#sheet').innerHTML=`<div class="iw vis">${illust(sc[0],sc[1],x[1])}</div><div class="sb"><div class="mnav"><button class="btn" data-nav="-1" aria-label="Anterioara">‹</button><button class="btn" data-nav="1" aria-label="Următoarea">›</button><button class="x" id="mx" aria-label="Închide">✕</button></div><h2>${esc(x[1])}</h2><div class="tags">${riskTag(x[4])}${[...x[3]].map(k=>`<span class="tag">${FUNCS[k]}</span>`).join('')}<span class="tag">${FSEC[x[0]][1]} ${FSEC[x[0]][0]}</span><span class="tag">#${i+1} din ${FULL.length}</span></div>${note}<p style="color:var(--mut);font-size:13px">${x[0]===6?'Preluat din articole web recente (vezi „Surse”), parafrazat; nu este recomandare a producătorului.':'Relatare a unui utilizator din lista oficială „2000+ uses”, netestată de WD-40 Company.'} Folosește bunul-simț și urmează eticheta produsului.</p></div>`;
  $('#modal').classList.add('on');document.body.style.overflow='hidden';
  $('#modal').dataset.u=i;$('#modal').dataset.m='f';$('#sheet').scrollTop=0;
}
function stepFull(dir){
  const cur=+$('#modal').dataset.u;const l=fList.includes(cur)?fList:FULL.map((_,i)=>i);
  const k=l.indexOf(cur);openFull(l[(k+dir+l.length)%l.length]);
}
function buildFull(){
  const c=$('#fcats');
  c.innerHTML=`<button class="chip on" data-c="-1">Toate</button>`+FSEC.map((s,i)=>`<button class="chip" data-c="${i}">${s[1]} ${s[0]}</button>`).join('');
  c.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;fs.sec=+b.dataset.c;c.querySelectorAll('.chip').forEach(x=>x.classList.toggle('on',x===b));fRender();});
  const f=$('#ffns');
  f.innerHTML=Object.keys(FUNCS).map(k=>`<button class="chip fn" data-k="${k}">${FUNCS[k]}</button>`).join('');
  f.addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;const k=b.dataset.k;if(fs.fn.has(k)){fs.fn.delete(k);b.classList.remove('on');}else{fs.fn.add(k);b.classList.add('on');}fRender();});
  $('#fq').addEventListener('input',e=>{fs.q=e.target.value.trim();fRender();});
  $('#fsafe').addEventListener('click',e=>{fs.safe=!fs.safe;e.currentTarget.classList.toggle('pri',fs.safe);fRender();});
  $('#fmorebtn').addEventListener('click',fMore);
  const sent=new IntersectionObserver(es=>{if(es[0].isIntersecting&&fShown<fList.length)fMore();},{rootMargin:'600px'});
  sent.observe($('#fmore'));
  $('#fgrid').addEventListener('click',e=>{const c=e.target.closest('.card');if(c&&c.dataset.fi!==undefined)openFull(+c.dataset.fi);});
  $('#fgrid').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const c=e.target.closest('.card');if(c&&c.dataset.fi!==undefined){e.preventDefault();openFull(+c.dataset.fi);}}});
  $('#fn-total').textContent='('+FULL.length+')';
  fRender();
}
function init(){
  buildStatic();buildChips();render();buildFull();
  const mq=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
  setMotion(!!(mq&&mq.matches));
  $('#q').addEventListener('input',e=>{state.q=e.target.value.trim();render();});
  $('#favonly').addEventListener('click',e=>{state.fav=!state.fav;e.currentTarget.classList.toggle('pri',state.fav);render();});
  $('#safe').addEventListener('click',e=>{state.safe=!state.safe;e.currentTarget.classList.toggle('pri',state.safe);render();});
  $('#rnd').addEventListener('click',()=>{const l=USES.filter(u=>u.r<2);openUse(l[Math.floor(Math.random()*l.length)].id);});
  $('#motion').addEventListener('click',()=>setMotion(!state.rm));
  $('#tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b)tab(b.dataset.tab);});
  $('#grid').addEventListener('click',e=>{
    const fb=e.target.closest('.fav');if(fb){e.stopPropagation();toggleFav(+fb.dataset.f);return;}
    const c=e.target.closest('.card');if(c&&c.dataset.i!==undefined)openUse(+c.dataset.i);});
  $('#grid').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const c=e.target.closest('.card');if(c&&c.dataset.i!==undefined){e.preventDefault();openUse(+c.dataset.i);}}});
  $('#modal').addEventListener('click',e=>{
    if(e.target.id==='modal'||e.target.id==='mx'){closeModal();return;}
    const nv=e.target.closest('[data-nav]');if(nv){stepUse(+nv.dataset.nav);return;}
    const o=e.target.closest('[data-o]');if(o){openUse(+o.dataset.o);return;}
    const f=e.target.closest('[data-fav]');if(f){const id=+f.dataset.fav;toggleFav(id);f.textContent=favs.has(id)?'★ În favorite':'☆ Adaugă la favorite';}
  });
  document.addEventListener('keydown',e=>{if(!$('#modal').classList.contains('on'))return;if(e.key==='Escape')closeModal();else if(e.key==='ArrowRight')stepUse(1);else if(e.key==='ArrowLeft')stepUse(-1);});
  $('#ftoggle').addEventListener('click',e=>{const o=$('#fpanel').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o);e.currentTarget.classList.toggle('pri',o);});
  // swipe stânga/dreapta în fereastra de detalii
  let sx=null;$('#sheet').addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
  $('#sheet').addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>70)stepUse(dx<0?1:-1);});
  document.body.addEventListener('keydown',()=>{},{passive:true});
}
init();
