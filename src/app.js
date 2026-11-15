'use strict';
const $=s=>document.querySelector(s);
const norm=s=>String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
const SOURCES=[
['Top 26 unusual uses (wd40.com)','https://www.wd40.com/useArticle/unusual-uses-wd40/'],
['WD-40 Specialist: e-bike service (wd40.com)','https://www.wd40.com/article/wd-40-specialist-r-electric-bike-service-repair/'],
['Surprising Uses for WD-40 (And When Not to Use It) (Cheapism)','https://www.cheapism.com/uses-wd40'],
['18 Genius WD-40 Uses (Bob Vila)','https://www.bobvila.com/slideshow/9-unusual-ways-to-use-wd-40-48621'],
['12 WD-40 Hacks You\'ll Wish You Knew Sooner (SlashGear)','https://www.slashgear.com/1476225/wd-40-hacks-youll-wish-you-knew-sooner'],
['15 Ingenious Uses for WD-40 (Wide Open Country)','https://www.wideopencountry.com/?p=37316'],
['Unusual Uses for WD-40 (Instructables)','https://instructables.com/Unusual-Uses-for-WD-40'],
['WD-40 (Snopes)','https://www.snopes.com/inboxer/household/wd-40.asp'],
['Official “2000+ uses” list (PDF, wd40.com)','https://img.thrfun.com/downloads/wd-40_2000useslist.pdf'],
['WD-40: what is safe and what to avoid (wd40.com)','https://www.wd40.com/article/what-wd-40-r-multi-use-product-is-safe-on-and-what-to-avoid/'],
['wd40.com sitemap (new products)','https://www.wd40.com/sitemap/'],
['Almost 2000 uses for a can of WD-40 (Wise Bread)','https://www.wisebread.com/almost-2000-uses-for-a-can-of-wd-40-1'],
['6 Practical Uses For WD-40 Around The Garage (SlashGear)','https://www.slashgear.com/1615121/wd-40-practical-uses-garage-mechanic'],
['11 WD-40 Uses Every DIYer Should Know (SlashGear)','https://www.slashgear.com/2296296/best-wd-40-uses-for-diyers/'],
['10 Mistakes You Might Be Making When Using WD-40 (SlashGear)','https://www.slashgear.com/1633277/mistakes-using-wd-40/'],
['7 places to never use WD-40 (Tom\'s Guide)','https://www.tomsguide.com/how-to/7-places-to-never-use-wd-40-youll-be-surprised'],
['Mistakes Everyone Makes When Using WD-40 (House Digest)','https://www.housedigest.com/1858213/mistakes-avoid-using-wd-40-home-safety'],
['5 surprising places you should never use WD-40 (Homes & Gardens)','https://www.homesandgardens.com/solved/never-use-wd-40-these-places'],
['34 WD-40 Hacks (Family Handyman / Reader\'s Digest)','https://f-cce-6908.fhm.r.tmbi.com/?p=94555'],
['20 ingenious uses for WD-40 (Popular Science)','https://www.popsci.com/story/diy/strange-and-ingenuous-uses-for-wd-40/'],
['WD-40 Precision Pen launch (Business Wire, 2023)','https://secure.businesswire.com/news/home/20230726501144/en/WD-40-Brand-Launches-WD-40-Precision-Pen'],
['WD-40 Specialist Bio Lubricant (Biofuels Digest)','https://biofuelsdigest.com/tag/wd-40/']
];
/* ---- i18n ---- */
const SQK={ro:'scârț!',en:'squeak!',fr:'grinc !',it:'cric!',es:'ñiiic!',pt:'rangg!',de:'quietsch!',hu:'nyikk!'};
function sqk(){return SQK[LANG]||SQK.en;}
let LANG='ro';
const RO0={uses:USES.map(u=>[u.t,u.d,u.n]),full:FULL.map(x=>x[1]),fnote:FULL.map(x=>x[5]||''),range:RANGE.map(r=>[r.t,r.d]),avoid:AVOID.map(a=>[a.t,a.d,a.a])};
function T(k,v){let s=(UI[LANG]&&UI[LANG][k]!==undefined)?UI[LANG][k]:UI.en[k];if(typeof s!=='string')return '';if(v)s=s.replace(/\{(\w+)\}/g,(m,n)=>v[n]!==undefined?v[n]:m);return s;}
function cntText(n,m,q,shown){return T('cnt',{n,m})+(q?T('forq',{q}):'')+(shown!==undefined?T('shown',{n:shown}):'');}
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
  return `<article class="card" data-i="${u.id}" tabindex="0" aria-label="${esc(u.t)}"><div class="iw"></div><span class="catb">${CATS[u.c][1]}</span><button class="fav" data-f="${u.id}" aria-label="${T('favaria')}">${favs.has(u.id)?'★':'☆'}</button><div class="cb"><h3>${esc(u.t)}</h3><p>${esc(u.d)}</p><div class="tags">${riskTag(u.r)}${[...u.f].map(k=>`<span class="tag">${FUNCS[k]}</span>`).join('')}</div></div></article>`;
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
  $('#cnt').textContent=cntText(list.length,USES.length,state.q);
  const g=$('#grid');
  g.querySelectorAll('.card').forEach(c=>io.unobserve(c));
  g.innerHTML=list.length?list.map(cardHTML).join(''):`<div class="empty">${T('empty')}</div>`;
  g.querySelectorAll('.card').forEach(c=>io.observe(c));
}
/* ---- filtre ---- */
function labelChips(){
  $('#cats').innerHTML=`<button class="chip${state.cat===''?' on':''}" data-c="">${T('all')}</button>`+Object.keys(CATS).map(k=>`<button class="chip${state.cat===k?' on':''}" data-c="${k}">${CATS[k][1]} ${CATS[k][0]}</button>`).join('');
  $('#fns').innerHTML=Object.keys(FUNCS).map(k=>`<button class="chip fn${state.fn.has(k)?' on':''}" data-k="${k}">${FUNCS[k]}</button>`).join('');
}
function buildChips(){
  $('#cats').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;state.cat=b.dataset.c;labelChips();render();});
  $('#fns').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;const k=b.dataset.k;if(state.fn.has(k))state.fn.delete(k);else state.fn.add(k);labelChips();render();});
}
/* ---- modal ---- */
function openUse(id){
  const u=USES[id];if(!u)return;
  const rel=USES.filter(x=>x.c===u.c&&x.id!==u.id).slice(0,4);
  const note=u.n?`<div class="note ${u.r===2?'bad':''}"><b>${u.r===2?T('unrec'):T('caution')}</b>${esc(u.n)}</div>`:(u.r===2?`<div class="note bad"><b>${T('unrec')}</b>${esc(T('unrec_def'))}</div>`:'');
  $('#sheet').innerHTML=`<div class="iw vis">${illust(u.s,u.p,u.t)}</div><div class="sb"><div class="mnav"><button class="btn" data-nav="-1" aria-label="${T('prev')}">‹</button><button class="btn" data-nav="1" aria-label="${T('next')}">›</button><button class="x" id="mx" aria-label="${T('close')}">✕</button></div><h2>${esc(u.t)}</h2><div class="tags">${riskTag(u.r)}${[...u.f].map(k=>`<span class="tag">${FUNCS[k]}</span>`).join('')}<span class="tag">${CATS[u.c][1]} ${CATS[u.c][0]}</span><span class="tag">${SRC[u.src]}</span></div><p>${esc(u.d)}</p>${note}${rel.length?`<div class="rel">${rel.map(x=>`<button class="chip" data-o="${x.id}">${esc(x.t)}</button>`).join('')}</div>`:''}<div class="rel"><button class="btn" data-fav="${u.id}">${favs.has(u.id)?T('favin'):T('favadd')}</button></div></div>`;
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
  motionLabel();
}
function motionLabel(){const t=state.rm?T('mo_off'):T('mo_on');const b=$('#motion');b.innerHTML=`<span class="mi">${state.rm?'⏸':'▶'}</span><span class="mt"> ${esc(t)}</span>`;b.setAttribute('aria-label',t);}
function tab(k){
  document.querySelectorAll('section.tab').forEach(s=>s.classList.toggle('on',s.id==='tab-'+k));
  document.querySelectorAll('#tabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===k));
  window.scrollTo({top:0,behavior:'instant'});
}
function buildStatic(){
  $('#hero-ill').innerHTML=illust('gear','',T('alt_hero'));
  $('#how-ill').innerHTML=illust('displace','',T('alt_how'));
  const five=[[T('fv1'),'rust','shovel',T('fd1')],[T('fv2'),'bolt','nut',T('fd2')],[T('fv3'),'drops','cap',T('fd3')],[T('fv4'),'hinge','door',T('fd4')],[T('fv5'),'stain','wall|#e8473b|scribble',T('fd5')]];
  $('#fiveill').innerHTML=five.map(a=>`<div class="box vis"><div class="iw" style="background:none">${illust(a[1],a[2],a[0])}</div><h3 style="margin-top:8px">${a[0]}</h3><div style="color:var(--mut);font-size:14px">${a[3]}</div></div>`).join('');
  $('#rangegrid').innerHTML=RANGE.map(r=>`<article class="card vis" style="cursor:default"><div class="iw">${illust(r.s,r.p,r.t)}</div><div class="cb"><h3>${esc(r.t)}</h3><p style="display:block">${esc(r.d)}</p></div></article>`).join('');
  $('#avoidgrid').innerHTML=AVOID.map(a=>`<article class="card vis" style="cursor:default"><div class="iw">${illust('warn',a.s,a.t)}</div><div class="cb"><h3>${esc(a.t)}</h3><p style="display:block">${esc(a.d)}</p><div class="tags"><span class="tag r0">${T('better')}${esc(a.a)}</span></div></div></article>`).join('');
  $('#srcl').innerHTML=SOURCES.map(s=>`<li><a href="${s[1]}" target="_blank" rel="noopener noreferrer">${esc(s[0])}</a></li>`).join('');
  $('#s-uses').textContent=USES.length;$('#s-idx').textContent=FULL.length;$('#s-cats').textContent=Object.keys(CATS).length;
}

/* ---- lista completă (1993) ---- */
const fs={sec:-1,fn:new Set(),q:'',safe:false};
let fList=[],fShown=0;const FBATCH=48;
let FRO=FULL.map(x=>norm(x[1]));
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
  $('#fcnt').textContent=cntText(fList.length,FULL.length,fs.q,fShown<fList.length?fShown:undefined);
}
function fRender(){
  fList=[];for(let i=0;i<FULL.length;i++)if(fMatch(i))fList.push(i);
  const g=$('#fgrid');g.querySelectorAll('.card').forEach(c=>io.unobserve(c));g.innerHTML='';fShown=0;
  if(!fList.length){g.innerHTML=`<div class="empty">${T('empty')}</div>`;$('#fmore').style.display='none';$('#fcnt').textContent=cntText(0,FULL.length);return;}
  fMore();
}
function openFull(i){
  const x=FULL[i];if(!x)return;const sc=FSC[x[2]];const wp=sc[0]==='warn'?FWARN[sc[1]]:'';
  const note=x[5]?`<div class="note ${x[4]===2?'bad':''}"><b>${x[4]===2?T('unrec'):T('caution')}</b>${esc(x[5])}</div>`:x[4]===2?`<div class="note bad"><b>${T('unrec')}</b>${esc(wp||T('unrec_def'))}</div>`:(x[4]===1?`<div class="note"><b>${T('caution')}</b>${esc(T('caution_def'))}</div>`:'');
  $('#sheet').innerHTML=`<div class="iw vis">${illust(sc[0],sc[1],x[1])}</div><div class="sb"><div class="mnav"><button class="btn" data-nav="-1" aria-label="${T('prev')}">‹</button><button class="btn" data-nav="1" aria-label="${T('next')}">›</button><button class="x" id="mx" aria-label="${T('close')}">✕</button></div><h2>${esc(x[1])}</h2><div class="tags">${riskTag(x[4])}${[...x[3]].map(k=>`<span class="tag">${FUNCS[k]}</span>`).join('')}<span class="tag">${FSEC[x[0]][1]} ${FSEC[x[0]][0]}</span><span class="tag">${esc(T('nr',{i:i+1,n:FULL.length}))}</span></div>${note}<p style="color:var(--mut);font-size:13px">${x[0]===6?T('note_web'):T('note_user')}${T('common')}</p></div>`;
  $('#modal').classList.add('on');document.body.style.overflow='hidden';
  $('#modal').dataset.u=i;$('#modal').dataset.m='f';$('#sheet').scrollTop=0;
}
function stepFull(dir){
  const cur=+$('#modal').dataset.u;const l=fList.includes(cur)?fList:FULL.map((_,i)=>i);
  const k=l.indexOf(cur);openFull(l[(k+dir+l.length)%l.length]);
}
function labelFChips(){
  $('#fcats').innerHTML=`<button class="chip${fs.sec===-1?' on':''}" data-c="-1">${T('all')}</button>`+FSEC.map((s,i)=>`<button class="chip${fs.sec===i?' on':''}" data-c="${i}">${s[1]} ${s[0]}</button>`).join('');
  $('#ffns').innerHTML=Object.keys(FUNCS).map(k=>`<button class="chip fn${fs.fn.has(k)?' on':''}" data-k="${k}">${FUNCS[k]}</button>`).join('');
}
function buildFull(){
  $('#fcats').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;fs.sec=+b.dataset.c;labelFChips();fRender();});
  $('#ffns').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;const k=b.dataset.k;if(fs.fn.has(k))fs.fn.delete(k);else fs.fn.add(k);labelFChips();fRender();});
  $('#fq').addEventListener('input',e=>{fs.q=e.target.value.trim();fRender();});
  $('#fsafe').addEventListener('click',e=>{fs.safe=!fs.safe;e.currentTarget.classList.toggle('pri',fs.safe);fRender();});
  $('#fmorebtn').addEventListener('click',fMore);
  const sent=new IntersectionObserver(es=>{if(es[0].isIntersecting&&fShown<fList.length)fMore();},{rootMargin:'600px'});
  sent.observe($('#fmore'));
  $('#fgrid').addEventListener('click',e=>{const c=e.target.closest('.card');if(c&&c.dataset.fi!==undefined)openFull(+c.dataset.fi);});
  $('#fgrid').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const c=e.target.closest('.card');if(c&&c.dataset.fi!==undefined){e.preventDefault();openFull(+c.dataset.fi);}}});
  $('#fn-total').textContent='('+FULL.length+')';
}
/* ---- schimbarea limbii ---- */
function setLang(l){
  if(!UI[l])l='en';LANG=l;
  try{localStorage.setItem('patruzeci-lang',l);}catch(e){}
  document.documentElement.lang=l;
  const U=UI[l];
  for(const k in CATS)CATS[k][0]=U.cats[k];
  for(const k in FUNCS)FUNCS[k]=U.funcs[k];
  for(let i=0;i<3;i++)RISK[i]=U.risk[i];
  for(const k in SRC)SRC[k]=U.srcn[k];
  FSEC.forEach((s,i)=>{s[0]=U.fsec[i];});
  for(const k in FWARN)FWARN[k]=U.fwarn[k];
  const P=l==='ro'?RO0:(CPK[l]||CEN);
  USES.forEach((u,i)=>{const a=P.uses[i];u.t=a[0];u.d=a[1];u.n=a[2]||'';});
  FULL.forEach((x,i)=>{x[1]=P.full[i];x[5]=l==='ro'?RO0.fnote[i]:(P.fnote[i]||'');});
  RANGE.forEach((r,i)=>{r.t=P.range[i][0];r.d=P.range[i][1];});
  AVOID.forEach((a,i)=>{a.t=P.avoid[i][0];a.d=P.avoid[i][1];a.a=P.avoid[i][2];});
  FRO=FULL.map(x=>norm(x[1]));
  document.querySelectorAll('[data-i]').forEach(e=>{e.textContent=T(e.dataset.i);});
  document.querySelectorAll('[data-h]').forEach(e=>{e.innerHTML=T(e.dataset.h);});
  document.querySelectorAll('[data-ip]').forEach(e=>{e.placeholder=T(e.dataset.ip);});
  document.querySelectorAll('[data-it]').forEach(e=>{e.title=T(e.dataset.it);});
  document.querySelectorAll('[data-ia]').forEach(e=>{e.setAttribute('aria-label',T(e.dataset.ia));});
  const fb=$('#fbn');fb.textContent=U.fb_notice||'';fb.hidden=!U.fb_notice||!!CPK[l];
  $('#lang').value=l;
  document.title='PATRUZECI — WD-40';
  motionLabel();buildStatic();labelChips();labelFChips();render();fRender();
  if($('#modal').classList.contains('on'))closeModal();
}
function pickLang(){
  try{const s=localStorage.getItem('patruzeci-lang');if(s&&UI[s])return s;}catch(e){}
  const ls=(navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'en']);
  for(const x of ls){const p=String(x).toLowerCase().slice(0,2);if(UI[p])return p;}
  return 'en';
}
function init(){
  $('#lang').innerHTML=UIL.map(l=>`<option value="${l}">${LNAME[l]}</option>`).join('');
  $('#lang').addEventListener('change',e=>setLang(e.target.value));
  buildChips();buildFull();
  const mq=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)');
  state.rm=!!(mq&&mq.matches);document.body.classList.toggle('rm',state.rm);
  setLang(pickLang());
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
    const f=e.target.closest('[data-fav]');if(f){const id=+f.dataset.fav;toggleFav(id);f.textContent=favs.has(id)?T('favin'):T('favadd');}
  });
  document.addEventListener('keydown',e=>{if(!$('#modal').classList.contains('on'))return;if(e.key==='Escape')closeModal();else if(e.key==='ArrowRight')stepUse(1);else if(e.key==='ArrowLeft')stepUse(-1);});
  $('#ftoggle').addEventListener('click',e=>{const o=$('#fpanel').classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o);e.currentTarget.classList.toggle('pri',o);});
  // swipe stânga/dreapta în fereastra de detalii
  let sx=null;$('#sheet').addEventListener('touchstart',e=>{sx=e.touches[0].clientX;},{passive:true});
  $('#sheet').addEventListener('touchend',e=>{if(sx===null)return;const dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>70)stepUse(dx<0?1:-1);});
  document.body.addEventListener('keydown',()=>{},{passive:true});
}
init();
