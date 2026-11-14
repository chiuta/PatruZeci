'use strict';
/* ====== ilustrații SVG animate (viewBox 0 0 240 150, ciclu 5s) ====== */
const S={};
const R=n=>Math.round(n*10)/10;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function mist(x,y,dir,n){
  n=n||10;let s='';
  for(let i=0;i<n;i++){
    const a=(dir-20+((i*47)%41))*Math.PI/180,d=22+((i*17)%30);
    s+=`<circle class="mp" cx="${R(x)}" cy="${R(y)}" r="${R(1.4+(i%3)*.9)}" style="--dx:${R(Math.cos(a)*d)}px;--dy:${R(Math.sin(a)*d)}px;animation-delay:${R(i*.035)}s"/>`;
  }
  return `<g class="mist">${s}</g>`;
}
function spray(x,y,rot,mir){
  rot=rot||0;
  const r=rot*Math.PI/180;
  let lx=11*Math.cos(r)-2*Math.sin(r),ly=11*Math.sin(r)+2*Math.cos(r),dir=rot;
  if(mir){lx=-lx;dir=180-rot;}
  const t=`translate(${x} ${y})${mir?' scale(-1 1)':''} rotate(${rot})`;
  const can=`<g class="cn"><g transform="${t}"><rect x="-10" y="6" width="20" height="40" rx="5" fill="#2f7ea1"/><rect x="-10" y="18" width="20" height="10" fill="#e9eff3"/><rect x="-6" y="0" width="12" height="7" rx="2" fill="#d9573b"/><rect x="2" y="1" width="9" height="4" rx="1.5" fill="#444"/></g></g>`;
  return can+mist(x+lx,y+ly,dir);
}
const ok=()=>`<g class="fi"><circle cx="214" cy="24" r="11" fill="#22b573"/><path d="M208 24l4 4 8-8" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const spk=(x,y,s)=>`<path d="M${x} ${y-s}L${R(x+s*.3)} ${R(y-s*.3)}L${x+s} ${y}L${R(x+s*.3)} ${R(y+s*.3)}L${x} ${y+s}L${R(x-s*.3)} ${R(y+s*.3)}L${x-s} ${y}L${R(x-s*.3)} ${R(y-s*.3)}Z" fill="#fff" stroke="#f2c230" stroke-width="1.5"/>`;
const rustBlob=(cx,cy,r,o)=>`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#b5532a" opacity="${o||.85}"/><circle cx="${cx+r*.35}" cy="${cy-r*.3}" r="${R(r*.5)}" fill="#c8693a" opacity="${o||.85}"/>`;
function hexPts(cx,cy,r){const a=[];for(let i=0;i<6;i++){const t=Math.PI/3*i+Math.PI/6;a.push(R(cx+r*Math.cos(t))+','+R(cy+r*Math.sin(t)));}return a.join(' ');}
function gearPts(cx,cy,r,n,t){const st=2*Math.PI/n,a=[];for(let i=0;i<n;i++){const b=i*st;[[-.38,r-t],[-.2,r],[.2,r],[.38,r-t]].forEach(([k,rr])=>a.push(R(cx+rr*Math.cos(b+k*st))+','+R(cy+rr*Math.sin(b+k*st))));}return a.join(' ');}

S.hinge=p=>{
  const col=p==='gate'?'#7c8a96':p==='window'?'#bfe0ef':p==='wicker'?'#d6a95a':'#c18a52';
  return `<rect x="10" y="95" width="62" height="14" fill="#b9b2a6"/><rect x="168" y="95" width="62" height="14" fill="#b9b2a6"/>
<g class="swing" style="transform-origin:72px 100px"><rect x="72" y="95" width="96" height="10" rx="2" fill="${col}" stroke="#6a5a48" stroke-width="1.5"/></g>
<circle cx="72" cy="100" r="7" fill="#8e99a3" stroke="#4e5b66" stroke-width="2"/>
<circle class="fo" cx="72" cy="100" r="11" fill="none" stroke="#b5532a" stroke-width="4" stroke-dasharray="5 3"/>
<text class="fo sq" x="124" y="62" text-anchor="middle">scârț!</text>
${spray(30,40,60)}${ok()}`;
};
S.bolt=p=>{
  const screw=p==='screw';
  const head=screw?`<circle cx="120" cy="72" r="32" fill="#aab6bf" stroke="#5c6a75" stroke-width="3"/><rect x="92" y="68" width="56" height="8" rx="2" fill="#4a5863"/>`:`<polygon points="${hexPts(120,72,36)}" fill="#aab6bf" stroke="#5c6a75" stroke-width="3"/><circle cx="120" cy="72" r="15" fill="#7e8c97" stroke="#5c6a75" stroke-width="2"/><rect x="118" y="38" width="4" height="12" fill="#4a5863"/>`;
  return `<rect x="40" y="22" width="160" height="104" rx="10" fill="#c3ced6"/>
<g class="${screw?'spin180':'spin120'}" style="transform-origin:120px 72px">${head}</g>
<g class="fo">${rustBlob(108,62,13)}${rustBlob(134,84,15,.8)}<circle cx="126" cy="56" r="8" fill="#c8693a" opacity=".85"/></g>
<g class="fi">${spk(104,56,8)}${spk(140,88,6)}</g>
${spray(48,30,40)}${ok()}`;
};
S.zipper=()=>{
  let t='';for(let i=0;i<19;i++)t+=`<rect x="${34+i*9}" y="${i%2?66:76}" width="6" height="8" rx="1.5" fill="#8a96a0"/>`;
  return `<rect x="14" y="26" width="212" height="49" fill="#4f6fa8"/><rect x="14" y="75" width="212" height="49" fill="#4f6fa8"/>${t}
<g class="slx" style="--d:110px"><rect x="48" y="62" width="22" height="26" rx="5" fill="#d0d6db" stroke="#6b7782" stroke-width="2"/><rect x="56" y="86" width="6" height="16" rx="2" fill="#c0c7cd" stroke="#6b7782"/></g>
${spray(30,16,45)}${ok()}`;
};
S.lock=()=>`<g class="pop"><path d="M104 74V54a16 16 0 0 1 32 0v20" fill="none" stroke="#7f8d98" stroke-width="9" stroke-linecap="round"/></g>
<rect x="90" y="72" width="60" height="46" rx="8" fill="#c9a23d" stroke="#7a6118" stroke-width="3"/>
<circle cx="120" cy="92" r="6" fill="#4a3c0e"/><rect x="118" y="94" width="4" height="12" fill="#4a3c0e"/>
<g class="fo"><circle cx="100" cy="108" r="8" fill="#b5532a" opacity=".8"/><circle cx="140" cy="82" r="6" fill="#9a4222" opacity=".8"/></g>
${spray(40,30,40)}${ok()}`;
S.chain=()=>{
  const sp=(cx,cy,r)=>{let t='';for(let i=0;i<10;i++)t+=`<rect x="${R(cx+r-3)}" y="${R(cy-3)}" width="7" height="6" rx="1" fill="#5a6772" transform="rotate(${i*36} ${cx} ${cy})"/>`;
    return `<g class="spin360" style="transform-origin:${cx}px ${cy}px"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#9aa8b3" stroke="#5a6772" stroke-width="3"/>${t}<circle cx="${cx}" cy="${cy}" r="6" fill="#5a6772"/><path d="M${cx} ${cy-r+6}V${cy+r-6}M${cx-r+6} ${cy}H${cx+r-6}" stroke="#5a6772" stroke-width="3"/></g>`;};
  return `<path d="M80 48H170A27 27 0 0 1 170 102H80A27 27 0 0 1 80 48Z" fill="none" stroke="#3f4c57" stroke-width="7" stroke-dasharray="7 4" class="chainrun"/>
${sp(80,75,23)}${sp(170,75,23)}
<path class="fo" d="M92 48H160" stroke="#b5532a" stroke-width="7" stroke-dasharray="4 7" opacity=".85"/>
${spray(100,6,75)}${ok()}`;
};
S.wheel=p=>{
  const rim=p==='skate'?'#e0603a':p==='toy'?'#3aa0e0':p==='cart'?'#7a5cc0':'#6f7b86';
  let sp='';for(let i=0;i<6;i++)sp+=`<line x1="120" y1="78" x2="${R(120+22*Math.cos(i*Math.PI/3))}" y2="${R(78+22*Math.sin(i*Math.PI/3))}" stroke="#2f3a44" stroke-width="4"/>`;
  const top=p==='caster'?`<rect x="104" y="22" width="32" height="14" rx="3" fill="#7a8791"/><path d="M110 36v12h20V36" fill="#7a8791"/>`:p==='barrow'?`<path d="M120 78L60 40H20" stroke="#7a5a35" stroke-width="7" fill="none"/>`:'';
  return `<line x1="14" y1="110" x2="226" y2="110" stroke="#9aa6b0" stroke-width="3"/>${top}
<g class="spin360" style="transform-origin:120px 78px"><circle cx="120" cy="78" r="32" fill="${rim}" stroke="#2f3a44" stroke-width="4"/>${sp}<circle cx="120" cy="78" r="7" fill="#2f3a44"/><circle cx="120" cy="54" r="3.5" fill="#fff"/></g>
<circle class="fo" cx="120" cy="78" r="13" fill="#b5532a" opacity=".7"/>
${spray(48,30,40)}${ok()}`;
};
S.drawer=()=>`<rect x="26" y="22" width="188" height="104" rx="6" fill="#bd9a6c" stroke="#7a5d36" stroke-width="3"/>
<rect x="40" y="36" width="160" height="30" rx="3" fill="#a98354"/>
<g class="slx" style="--d:24px"><rect x="40" y="72" width="160" height="42" rx="4" fill="#d3b184" stroke="#7a5d36" stroke-width="3"/><rect x="100" y="86" width="40" height="9" rx="4" fill="#6b5330"/></g>
${spray(14,8,50)}${ok()}`;
S.track=p=>{
  const glass=p==='window'?'#cfe9f6':'#e8d8c0';
  return `<rect x="10" y="22" width="220" height="104" rx="4" fill="#d3dbe1"/><rect x="10" y="34" width="220" height="6" fill="#8d99a3"/><rect x="10" y="104" width="220" height="8" fill="#8d99a3"/>
<g class="slx" style="--d:100px"><rect x="18" y="40" width="72" height="64" fill="${glass}" stroke="#5f6d78" stroke-width="3"/><path d="M30 92L58 52" stroke="#fff" stroke-width="4" opacity=".7"/></g>
<path class="fo" d="M16 108H224" stroke="#b5532a" stroke-width="4" stroke-dasharray="10 6" opacity=".7"/>
${spray(196,66,65,true)}${ok()}`;
};
S.shine=p=>{
  const [shape,col]=(p||'pane|#cfe8f3').split('|');let o='';
  if(shape==='pane')o=`<rect x="50" y="28" width="140" height="88" rx="6" fill="${col}" stroke="#6d8794" stroke-width="4"/><rect x="60" y="38" width="120" height="68" fill="${col}" opacity=".6"/>`;
  else if(shape==='frame')o=`<rect x="50" y="28" width="140" height="88" rx="4" fill="none" stroke="${col}" stroke-width="14"/><rect x="57" y="35" width="126" height="74" fill="#dff0f8" opacity=".7"/>`;
  else if(shape==='disc')o=`<circle cx="120" cy="72" r="46" fill="${col}" stroke="#55646f" stroke-width="4"/><circle cx="120" cy="72" r="32" fill="none" stroke="#fff" stroke-width="2" opacity=".5"/>`;
  else if(shape==='rod')o=`<rect x="26" y="62" width="188" height="20" rx="10" fill="${col}" stroke="#55646f" stroke-width="3"/>`;
  else if(shape==='box')o=`<rect x="64" y="20" width="112" height="104" rx="8" fill="${col}" stroke="#55646f" stroke-width="4"/><rect x="74" y="62" width="92" height="3" fill="#55646f" opacity=".5"/><rect x="156" y="34" width="5" height="22" rx="2" fill="#55646f"/>`;
  else o=`<path d="M26 98C26 80 46 76 62 70L86 46H152L178 70C198 72 214 80 214 98Z" fill="${col}" stroke="#55646f" stroke-width="4"/><circle cx="68" cy="100" r="15" fill="#2f3a44"/><circle cx="172" cy="100" r="15" fill="#2f3a44"/>`;
  return `${o}<g class="fo" opacity=".55"><ellipse cx="100" cy="60" rx="14" ry="7" fill="#7b8791"/><ellipse cx="140" cy="84" rx="18" ry="8" fill="#7b8791"/><ellipse cx="120" cy="52" rx="9" ry="5" fill="#7b8791"/></g>
<g class="glint"><polygon points="40,14 74,14 44,134 10,134" fill="#fff" opacity=".8"/></g>
<g class="fi">${spk(80,40,9)}${spk(160,96,7)}</g>${spray(20,14,45)}${ok()}`;
};
S.stain=p=>{
  const [surf,c,kind]=(p||'wall|#e84|blob').split('|');let bg='';
  if(surf==='wall')bg=`<rect x="20" y="16" width="200" height="112" rx="6" fill="#f2e8d5"/><rect x="20" y="112" width="200" height="16" fill="#cdbd9b"/>`;
  else if(surf==='floor')bg=`<rect x="20" y="16" width="200" height="112" rx="6" fill="#d9d3c8"/><path d="M20 53H220M20 90H220M88 16V128M152 16V128" stroke="#b9b1a4" stroke-width="2"/>`;
  else if(surf==='fabric'){let w='';for(let i=0;i<10;i++)w+=`M20 ${28+i*11}H220`;bg=`<rect x="20" y="16" width="200" height="112" rx="6" fill="#b8c4d6"/><path d="${w}" stroke="#a3b1c7" stroke-width="2"/>`;}
  else if(surf==='car')bg=`<rect x="20" y="16" width="200" height="112" rx="6" fill="#b83a3a"/><path d="M20 58C80 38 160 38 220 58" stroke="#fff" opacity=".35" stroke-width="6" fill="none"/>`;
  else if(surf==='shoe')bg=`<path d="M34 100Q30 68 66 58Q130 36 204 68Q222 78 214 100Q204 114 120 114Q58 116 34 100Z" fill="#3a3f46"/><path d="M56 102H192" stroke="#59616b" stroke-width="3" stroke-dasharray="6 6"/>`;
  else if(surf==='wood')bg=`<rect x="20" y="16" width="200" height="112" rx="6" fill="#c9985c"/><path d="M20 44H220M20 72H220M20 100H220" stroke="#a87a42" stroke-width="2"/>`;
  else bg=`<rect x="20" y="16" width="200" height="112" rx="6" fill="#e5e1da"/><path d="M20 100H220" stroke="#cfc9bd" stroke-width="3"/>`;
  let sh='';
  if(kind==='scribble')sh=`<path d="M78 92l18-40 18 40 18-40 18 40 14-30" stroke="${c}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  else if(kind==='dots')sh=[[96,56],[122,48],[146,66],[108,84],[136,92],[160,50]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${5+i%3*2}" fill="${c}"/>`).join('');
  else if(kind==='sticker')sh=`<rect x="84" y="44" width="72" height="48" rx="3" fill="${c}" stroke="#0003" transform="rotate(-6 120 68)"/><path d="M96 58h44M96 68h32M96 78h38" stroke="#0004" stroke-width="3" transform="rotate(-6 120 68)"/>`;
  else if(kind==='gum')sh=`<ellipse cx="116" cy="78" rx="28" ry="15" fill="${c}"/><path d="M138 70C168 40 178 62 190 38" stroke="${c}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  else if(kind==='scratch')sh=`<path d="M70 90L128 50M92 98L160 56M110 100L170 70" stroke="${c}" stroke-width="3" stroke-linecap="round" opacity=".85"/>`;
  else if(kind==='ring')sh=`<circle cx="120" cy="72" r="28" fill="none" stroke="${c}" stroke-width="8" opacity=".85"/><circle cx="148" cy="88" r="14" fill="none" stroke="${c}" stroke-width="5" opacity=".7"/>`;
  else sh=`<path d="M90 74q-6-26 22-30 28-6 38 14 10 22-16 34-20 8-34-2-6-6-10-16Z" fill="${c}"/>`;
  return `${bg}<g class="fo">${sh}</g>
<g class="wp"><rect x="82" y="44" width="62" height="40" rx="12" fill="#fff" opacity=".92" stroke="#c5d0d8"/><path d="M92 58h40M92 70h30" stroke="#dbe3e8" stroke-width="4"/></g>
<g class="fi">${spk(90,50,8)}${spk(150,90,6)}</g>${spray(30,12,45)}${ok()}`;
};
S.rust=p=>{
  const items={
    wrench:`<g transform="rotate(-24 120 75)"><rect x="52" y="68" width="136" height="14" rx="7" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/><circle cx="54" cy="75" r="19" fill="none" stroke="#8e9aa4" stroke-width="11"/><circle cx="188" cy="75" r="10" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/></g>`,
    shovel:`<g transform="rotate(32 120 75)"><rect x="116" y="8" width="8" height="70" rx="3" fill="#a77b49"/><path d="M92 78H148L142 118Q120 132 98 118Z" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/></g>`,
    saw:`<path d="M30 66H186L194 96H30Z" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/><path d="${(()=>{let d='M30 96';for(let i=0;i<18;i++)d+=`l5 8 5-8`;return d;})()}" fill="#8e9aa4" stroke="#4f5c66" stroke-width="2"/><rect x="190" y="58" width="36" height="44" rx="9" fill="#a77b49" stroke="#6b4e2a" stroke-width="3"/>`,
    skillet:`<circle cx="104" cy="76" r="46" fill="#4a4f55" stroke="#272b30" stroke-width="4"/><circle cx="104" cy="76" r="34" fill="#363a40"/><rect x="146" y="68" width="76" height="16" rx="8" fill="#4a4f55" stroke="#272b30" stroke-width="3"/>`,
    blade:`<path d="M24 78H216L200 62H40Z" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/><circle cx="120" cy="70" r="8" fill="#e3ebf0" stroke="#4f5c66" stroke-width="3"/><path d="M24 78H216" stroke="#4f5c66" stroke-width="4"/>`,
    grate:`<rect x="34" y="34" width="172" height="84" rx="10" fill="none" stroke="#5a6670" stroke-width="6"/>${[0,1,2,3,4,5,6].map(i=>`<line x1="${54+i*22}" y1="34" x2="${54+i*22}" y2="118" stroke="#5a6670" stroke-width="5"/>`).join('')}<line x1="34" y1="76" x2="206" y2="76" stroke="#5a6670" stroke-width="5"/>`,
    rod:`<rect x="26" y="68" width="188" height="10" rx="5" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/><circle cx="26" cy="73" r="12" fill="#a9b5be" stroke="#4f5c66" stroke-width="3"/><circle cx="214" cy="73" r="12" fill="#a9b5be" stroke="#4f5c66" stroke-width="3"/>`,
    hammer:`<g transform="rotate(-20 120 75)"><rect x="112" y="40" width="14" height="88" rx="4" fill="#a77b49" stroke="#6b4e2a" stroke-width="3"/><rect x="74" y="26" width="92" height="26" rx="5" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/></g>`,
    barbell:`<rect x="30" y="70" width="180" height="9" rx="4" fill="#8e9aa4" stroke="#4f5c66" stroke-width="2"/><rect x="44" y="40" width="14" height="70" rx="3" fill="#59646e"/><rect x="62" y="48" width="12" height="54" rx="3" fill="#59646e"/><rect x="182" y="40" width="14" height="70" rx="3" fill="#59646e"/><rect x="166" y="48" width="12" height="54" rx="3" fill="#59646e"/>`,
    hook:`<path d="M120 22V88a24 24 0 0 1-48 0" fill="none" stroke="#8e9aa4" stroke-width="10" stroke-linecap="round"/><circle cx="120" cy="22" r="8" fill="none" stroke="#8e9aa4" stroke-width="5"/><path d="M72 88l-8-12" stroke="#8e9aa4" stroke-width="8" stroke-linecap="round"/>`
  };
  const it=items[p]||items.wrench;
  return `${it}<g class="fo">${rustBlob(80,68,11)}${rustBlob(120,82,14,.8)}${rustBlob(158,66,10)}${rustBlob(104,56,7,.8)}</g>
<g class="fi">${spk(84,66,9)}${spk(140,84,8)}${spk(166,60,6)}</g>${spray(28,14,40)}${ok()}`;
};
S.scissors=p=>{
  const hc=p==='shears'?'#d9573b':'#2f7ea1';
  return `<g class="opn1" style="transform-origin:112px 75px"><path d="M112 75L206 54L209 61L118 83Z" fill="#aab6bf" stroke="#55646f" stroke-width="2.5"/><path d="M112 75L84 90" stroke="${hc}" stroke-width="8" stroke-linecap="round"/><ellipse cx="64" cy="102" rx="24" ry="14" fill="none" stroke="${hc}" stroke-width="8" transform="rotate(-22 64 102)"/></g>
<g class="opn2" style="transform-origin:112px 75px"><path d="M112 75L206 96L209 89L118 67Z" fill="#c1ccd4" stroke="#55646f" stroke-width="2.5"/><path d="M112 75L84 60" stroke="${hc}" stroke-width="8" stroke-linecap="round"/><ellipse cx="64" cy="48" rx="24" ry="14" fill="none" stroke="${hc}" stroke-width="8" transform="rotate(22 64 48)"/></g>
<circle cx="112" cy="75" r="5" fill="#55646f"/>
<g class="fo"><ellipse cx="160" cy="75" rx="18" ry="6" fill="#d8b94a" opacity=".9"/></g>
${spray(150,14,80)}${ok()}`;
};
S.strings=()=>{
  let f='',s='',v='';
  for(let i=0;i<5;i++)f+=`<rect x="${44+i*40}" y="30" width="3" height="90" fill="#cfc8bb"/>`;
  for(let i=0;i<6;i++){const y=38+i*15;s+=`<path d="M12 ${y}H228" stroke="#c9ced3" stroke-width="${R(1+(5-i)*.35)}"/>`;v+=`<path class="vib" style="animation-delay:${R(i*.03)}s" d="M12 ${y}H228" stroke="#fff" stroke-width="${R(1+(5-i)*.35)}"/>`;}
  return `<rect x="12" y="24" width="216" height="102" rx="4" fill="#6b4a2f"/>${f}${s}<g class="fo" opacity=".8"><circle cx="70" cy="53" r="3" fill="#2b2b2b"/><circle cx="118" cy="83" r="3.5" fill="#2b2b2b"/><circle cx="160" cy="68" r="3" fill="#2b2b2b"/><circle cx="90" cy="98" r="3" fill="#2b2b2b"/><circle cx="188" cy="108" r="3.5" fill="#2b2b2b"/></g>
<g class="vibw">${v}</g><text class="fi" x="190" y="22" font-size="20" fill="#2f7ea1">♪</text>
${spray(26,6,70)}${ok()}`;
};
S.keys=()=>{
  let w='',b='';
  for(let i=0;i<7;i++)w+=`<g class="kp" style="animation-delay:${R(i*.1)}s"><rect x="${28+i*26}" y="34" width="24" height="84" rx="3" fill="#fff" stroke="#7b8791" stroke-width="2"/></g>`;
  [0,1,3,4,5].forEach(i=>b+=`<rect x="${28+i*26+17}" y="34" width="16" height="48" rx="2" fill="#26313b"/>`);
  return `${w}${b}<g class="fo" opacity=".7"><ellipse cx="70" cy="100" rx="10" ry="4" fill="#8f98a0"/><ellipse cx="130" cy="108" rx="12" ry="4" fill="#8f98a0"/><ellipse cx="180" cy="98" rx="9" ry="4" fill="#8f98a0"/></g>
${spray(14,4,60)}${ok()}`;
};
S.reel=()=>`<rect x="150" y="30" width="80" height="10" rx="5" fill="#59646e" transform="rotate(-12 190 35)"/>
<circle cx="104" cy="76" r="44" fill="#8e9aa4" stroke="#4f5c66" stroke-width="4"/><circle cx="104" cy="76" r="30" fill="#6f7d88" stroke="#4f5c66" stroke-width="3"/>
<g class="spin360" style="transform-origin:104px 76px"><path d="M104 76H162" stroke="#4f5c66" stroke-width="7" stroke-linecap="round"/><circle cx="164" cy="76" r="10" fill="#d9573b" stroke="#7a2d1c" stroke-width="3"/><circle cx="104" cy="76" r="8" fill="#4f5c66"/></g>
<g class="fo" opacity=".9"><circle cx="82" cy="58" r="9" fill="#f4f4ef"/><circle cx="124" cy="96" r="11" fill="#e9e6dc"/><circle cx="130" cy="58" r="6" fill="#f4f4ef"/></g>
${spray(30,14,45)}${ok()}`;
S.bugs=()=>{
  const bug=(x,y,d)=>`<g class="flee" style="animation-delay:${d}s"><ellipse cx="${x}" cy="${y}" rx="9" ry="5" fill="#e0b020"/><path d="M${x-4} ${y-1}h8" stroke="#222" stroke-width="2"/><ellipse cx="${x-3}" cy="${y-7}" rx="5" ry="2.6" fill="#cfe8f3"/><ellipse cx="${x+4}" cy="${y-7}" rx="5" ry="2.6" fill="#cfe8f3"/></g>`;
  return `<path d="M10 28H230L214 58H26Z" fill="#8a5a3c" stroke="#5d3b27" stroke-width="3"/><rect x="10" y="20" width="220" height="10" fill="#6e4730"/>
<path class="fi" d="M34 64H206" stroke="#58b9e6" stroke-width="5" stroke-linecap="round" opacity=".7"/>
${bug(70,78,0)}${bug(130,86,.1)}${bug(176,76,.2)}${spray(24,100,-48)}${ok()}`;
};
S.pulley=()=>{
  let sp='';for(let i=0;i<6;i++)sp+=`<line x1="120" y1="64" x2="${R(120+22*Math.cos(i*Math.PI/3))}" y2="${R(64+22*Math.sin(i*Math.PI/3))}" stroke="#4f5c66" stroke-width="4"/>`;
  return `<rect x="30" y="10" width="180" height="8" fill="#7a8791"/><rect x="112" y="16" width="16" height="22" fill="#7a8791"/>
<path d="M94 64V130" class="ropeA" stroke="#3f4c57" stroke-width="5" stroke-dasharray="9 4" fill="none"/><path d="M146 64V104" class="ropeB" stroke="#3f4c57" stroke-width="5" stroke-dasharray="9 4" fill="none"/>
<g class="spin360" style="transform-origin:120px 64px"><circle cx="120" cy="64" r="28" fill="#aab6bf" stroke="#4f5c66" stroke-width="4"/>${sp}<circle cx="120" cy="64" r="6" fill="#4f5c66"/></g>
<g class="wt"><rect x="132" y="104" width="30" height="24" rx="4" fill="#c17b3a" stroke="#6b4a22" stroke-width="3"/></g>
<circle class="fo" cx="120" cy="64" r="14" fill="#b5532a" opacity=".6"/>
${spray(40,22,45)}${ok()}`;
};
S.battery=()=>`<path d="M72 48V24M170 48V30" stroke="#d33" stroke-width="5"/><path d="M72 24h-30" stroke="#d33" stroke-width="5"/><path d="M170 30h40" stroke="#222" stroke-width="5"/>
<rect x="30" y="56" width="180" height="66" rx="6" fill="#33414c" stroke="#1d262d" stroke-width="3"/>
<rect x="60" y="44" width="24" height="14" rx="3" fill="#aab6bf"/><rect x="158" y="44" width="24" height="14" rx="3" fill="#aab6bf"/>
<text x="62" y="96" font-size="26" font-weight="800" fill="#e9eff3">+</text><text x="168" y="96" font-size="26" font-weight="800" fill="#e9eff3">−</text>
<g class="fo"><circle cx="70" cy="46" r="11" fill="#e9f2ee"/><circle cx="80" cy="42" r="7" fill="#7fcfb0"/><circle cx="168" cy="46" r="10" fill="#e9f2ee"/><circle cx="176" cy="42" r="7" fill="#7fcfb0"/></g>
<g class="fi">${spk(72,44,9)}${spk(170,44,8)}</g>${spray(116,16,80)}${ok()}`;
S.wiper=()=>`<path d="M26 18H214L232 128H8Z" fill="#cfe5f1" stroke="#5f7684" stroke-width="4"/>
<g class="sweep" style="transform-origin:120px 122px"><path d="M120 122L44 56" stroke="#2f3a44" stroke-width="5" stroke-linecap="round"/><path d="M44 56L74 82" stroke="#111" stroke-width="7" stroke-linecap="round"/><circle class="fo" cx="86" cy="86" r="8" fill="#b5532a" opacity=".85"/></g>
<circle cx="120" cy="122" r="7" fill="#2f3a44"/>
${spray(20,66,40)}${ok()}`;
S.hose=()=>`<rect x="14" y="62" width="76" height="22" rx="4" fill="#b9a24a" stroke="#7a6a22" stroke-width="3"/><rect x="82" y="52" width="40" height="42" rx="6" fill="#c9b358" stroke="#7a6a22" stroke-width="3"/>
<g class="turn" style="transform-origin:102px 44px"><rect x="72" y="40" width="60" height="9" rx="4" fill="#d9573b" stroke="#7a2d1c" stroke-width="2"/></g><rect x="98" y="46" width="8" height="10" fill="#7a6a22"/>
<rect x="122" y="66" width="30" height="16" rx="3" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/><path d="M152 74C200 74 206 110 170 118S100 128 120 128" fill="none" stroke="#2e8b57" stroke-width="9" stroke-linecap="round"/>
<g class="fo"><circle cx="132" cy="74" r="8" fill="#4aa58a" opacity=".85"/><circle cx="92" cy="86" r="7" fill="#4aa58a" opacity=".85"/></g>
<g class="fi">${spk(130,70,8)}</g>${spray(40,10,50)}${ok()}`;
S.snow=p=>{
  const col={snow:'#ffffff',soil:'#7a5a3a',mud:'#8a6a4a',clay:'#b8693c',dough:'#f1e2b8'}[p]||'#fff';
  return `<g transform="rotate(-16 120 90)"><path d="M66 78H178L168 122Q122 138 76 122Z" fill="#9aa8b3" stroke="#55646f" stroke-width="3"/><rect x="170" y="72" width="64" height="9" rx="4" fill="#b7895a" stroke="#6b4e2a" stroke-width="2"/></g>
<g class="dropoff"><ellipse cx="108" cy="82" rx="28" ry="14" fill="${col}" stroke="#9aa8b3" stroke-width="1.5"/><ellipse cx="138" cy="76" rx="19" ry="11" fill="${col}" stroke="#9aa8b3" stroke-width="1.5"/><ellipse cx="86" cy="90" rx="15" ry="8" fill="${col}" stroke="#9aa8b3" stroke-width="1.5"/></g>
${spray(26,18,45)}${ok()}`;
};
S.drops=p=>{
  const drop=(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${R(r*1.3)}" fill="#5db4ea" stroke="#2c7fb8" stroke-width="1.5"/>`;
  return `<path d="M64 112V84Q64 40 120 40T176 84V112Z" fill="#46535e" stroke="#2c373f" stroke-width="3"/><rect x="104" y="28" width="12" height="14" fill="#2c373f"/><rect x="128" y="28" width="12" height="14" fill="#2c373f"/><rect x="40" y="108" width="160" height="8" rx="3" fill="#2c373f"/>
<g class="fo">${drop(90,70,6)}${drop(120,58,5)}${drop(148,76,7)}${drop(104,92,6)}${drop(138,100,5)}${drop(166,96,5)}</g>
${p==='plain'?'':`<path class="fi" d="M126 46l-16 28h14l-8 26 26-34h-14l8-20Z" fill="#ffc23d" stroke="#c78a00" stroke-width="2"/>`}
<g class="fi">${spk(80,64,8)}</g>${spray(20,20,40)}${ok()}`;
};
S.gear=p=>{
  const rust=`<g class="fo"><circle cx="82" cy="70" r="10" fill="#b5532a" opacity=".8"/><circle cx="150" cy="90" r="9" fill="#9a4222" opacity=".8"/></g>`;
  return `<g class="gA" style="transform-origin:88px 76px"><polygon points="${gearPts(88,76,38,12,9)}" fill="#9aa8b3" stroke="#4f5c66" stroke-width="3" stroke-linejoin="round"/><circle cx="88" cy="76" r="22" fill="#7e8c97" stroke="#4f5c66" stroke-width="3"/><circle cx="88" cy="76" r="7" fill="#e3ebf0" stroke="#4f5c66" stroke-width="2"/></g>
<g class="gB" style="transform-origin:154px 76px"><polygon points="${gearPts(154,76,31,10,8)}" fill="#c1ccd4" stroke="#4f5c66" stroke-width="3" stroke-linejoin="round"/><circle cx="154" cy="76" r="17" fill="#9aa8b3" stroke="#4f5c66" stroke-width="3"/><circle cx="154" cy="76" r="6" fill="#e3ebf0" stroke="#4f5c66" stroke-width="2"/></g>
${rust}<g class="fi">${spk(76,58,8)}${spk(160,100,7)}</g>${spray(20,14,45)}${ok()}`;
};
S.displace=()=>`<rect x="20" y="96" width="200" height="26" rx="4" fill="#8e9aa4" stroke="#4f5c66" stroke-width="3"/>
<g class="fo"><path d="M20 96Q50 80 80 92T140 92T200 90L220 96Z" fill="#5db4ea" opacity=".85"/><ellipse cx="60" cy="86" rx="9" ry="6" fill="#5db4ea"/><ellipse cx="130" cy="84" rx="11" ry="7" fill="#5db4ea"/><ellipse cx="180" cy="86" rx="8" ry="5" fill="#5db4ea"/></g>
<g class="fi"><ellipse cx="28" cy="110" rx="7" ry="4" fill="#5db4ea"/><ellipse cx="212" cy="112" rx="7" ry="4" fill="#5db4ea"/><path d="M26 96H214" stroke="#f2c230" stroke-width="3" opacity=".9"/>${spk(80,92,7)}${spk(160,92,7)}</g>
<g class="fo"><path d="M60 60q10-16 20 0" stroke="#5db4ea" fill="none" stroke-width="3"/></g>
${spray(56,4,62)}`;
S.warn=p=>{
  const items={
    brake:`<circle cx="112" cy="75" r="46" fill="#8b97a1" stroke="#4a5660" stroke-width="4"/><circle cx="112" cy="75" r="14" fill="#4a5660"/>${[0,1,2,3,4,5].map(i=>`<circle cx="${R(112+30*Math.cos(i*Math.PI/3))}" cy="${R(75+30*Math.sin(i*Math.PI/3))}" r="4" fill="#4a5660"/>`).join('')}<path d="M150 38Q184 75 150 112" fill="none" stroke="#e8863a" stroke-width="14" stroke-linecap="round"/>`,
    phone:`<rect x="88" y="14" width="64" height="122" rx="10" fill="#2b333b" stroke="#111" stroke-width="3"/><rect x="94" y="28" width="52" height="86" rx="3" fill="#6fb7e0"/><circle cx="120" cy="126" r="4" fill="#666"/><circle class="fi" cx="110" cy="60" r="5" fill="#e0a82a"/><circle class="fi" cx="128" cy="86" r="7" fill="#e0a82a"/>`,
    glasses:`<rect x="40" y="52" width="68" height="46" rx="16" fill="#cfe8f3" stroke="#2f3a44" stroke-width="5"/><rect x="132" y="52" width="68" height="46" rx="16" fill="#cfe8f3" stroke="#2f3a44" stroke-width="5"/><path d="M108 70h24" stroke="#2f3a44" stroke-width="5"/><path class="fi" d="M62 56l10 14-8 10 12 14M156 56l-8 16 12 8-8 16" stroke="#c33" stroke-width="3" fill="none"/>`,
    case:`<rect x="64" y="20" width="112" height="110" rx="4" fill="#dff0f7" stroke="#5f7280" stroke-width="4"/><circle cx="120" cy="75" r="36" fill="#b9d3e0"/><circle cx="120" cy="75" r="8" fill="#dff0f7"/><path class="fi" d="M76 30l24 30-14 14 26 26M164 100l-22-26 14-12" stroke="#c33" stroke-width="3" fill="none"/>`,
    bike:`<path d="M44 52H196A23 23 0 0 1 196 98H44A23 23 0 0 1 44 52Z" fill="none" stroke="#3f4c57" stroke-width="7" stroke-dasharray="7 4"/><circle cx="44" cy="75" r="20" fill="#9aa8b3" stroke="#5a6772" stroke-width="3"/><circle cx="196" cy="75" r="20" fill="#9aa8b3" stroke="#5a6772" stroke-width="3"/>${[60,84,108,132,156,180].map((x,i)=>`<circle class="fi" cx="${x}" cy="${i%2?98:52}" r="${4+i%3}" fill="#4a3a2a"/>`).join('')}`,
    garage:`<rect x="14" y="58" width="212" height="14" fill="#7a8791"/><rect x="14" y="76" width="212" height="6" fill="#aeb8c0"/><circle cx="70" cy="65" r="12" fill="#3f4c57"/><circle cx="170" cy="65" r="12" fill="#3f4c57"/>${[40,100,130,200].map((x,i)=>`<ellipse class="fi" cx="${x}" cy="${i%2?92:56}" rx="${9+i%3*2}" ry="5" fill="#6b6b66"/>`).join('')}`,
    flame:`<path d="M120 20C144 56 162 70 154 104C148 130 92 130 86 104C80 78 108 64 120 20Z" fill="#ff8a2a" stroke="#c23d10" stroke-width="3"/><path d="M120 66C132 86 140 94 134 108C130 120 108 120 106 108C102 94 116 88 120 66Z" fill="#ffd24a"/>`,
    gas:`<circle cx="120" cy="82" r="40" fill="none" stroke="#4a5660" stroke-width="10"/>${[0,1,2,3,4,5,6,7].map(i=>`<path d="M${R(120+40*Math.cos(i*Math.PI/4))} ${R(82+40*Math.sin(i*Math.PI/4))}l${R(8*Math.cos(i*Math.PI/4))} ${R(8*Math.sin(i*Math.PI/4)-8)}" stroke="#ff8a2a" stroke-width="8" stroke-linecap="round"/>`).join('')}`,
    food:`<circle cx="120" cy="78" r="48" fill="#f3efe6" stroke="#9aa7b0" stroke-width="4"/><circle cx="120" cy="78" r="34" fill="#fff" stroke="#e2ddd0"/><circle cx="114" cy="72" r="14" fill="#fff" stroke="#e8e0cc"/><circle cx="114" cy="72" r="7" fill="#f2b430"/>`,
    paw:`<ellipse cx="120" cy="100" rx="28" ry="22" fill="#c79a6a"/><ellipse cx="80" cy="68" rx="11" ry="15" fill="#c79a6a"/><ellipse cx="106" cy="46" rx="11" ry="15" fill="#c79a6a"/><ellipse cx="136" cy="46" rx="11" ry="15" fill="#c79a6a"/><ellipse cx="162" cy="68" rx="11" ry="15" fill="#c79a6a"/>`,
    lock:`<path d="M104 74V54a16 16 0 0 1 32 0v20" fill="none" stroke="#7f8d98" stroke-width="9" stroke-linecap="round"/><rect x="90" y="72" width="60" height="46" rx="8" fill="#c9a23d" stroke="#7a6118" stroke-width="3"/><circle cx="120" cy="92" r="6" fill="#4a3c0e"/>${[100,140,126].map((x,i)=>`<circle class="fi" cx="${x}" cy="${104+i*3}" r="4" fill="#6b6b66"/>`).join('')}`,
    wood:`<rect x="30" y="20" width="180" height="110" rx="6" fill="#d7b27a"/><path d="M30 50H210M30 80H210M30 108H210" stroke="#b78d52" stroke-width="2"/><ellipse class="grow" cx="120" cy="76" rx="52" ry="30" fill="#5a3a1c" opacity=".55"/>`,
    vinyl:`<circle cx="120" cy="76" r="54" fill="#1f252b"/><circle cx="120" cy="76" r="42" fill="none" stroke="#3a444d" stroke-width="2"/><circle cx="120" cy="76" r="30" fill="none" stroke="#3a444d" stroke-width="2"/><circle cx="120" cy="76" r="15" fill="#d9573b"/><circle cx="120" cy="76" r="3" fill="#fff"/><path class="fi" d="M150 40l-30 36" stroke="#fff" stroke-width="2"/>`,
    hand:`<rect x="88" y="70" width="64" height="54" rx="16" fill="#f0c8a0"/>${[0,1,2,3].map(i=>`<rect x="${88+i*16}" y="${30+(i==1||i==2?-8:0)}" width="13" height="52" rx="6.5" fill="#f0c8a0"/>`).join('')}<rect x="72" y="78" width="13" height="34" rx="6.5" fill="#f0c8a0" transform="rotate(-28 78 95)"/>`,
    seat:`<rect x="82" y="26" width="76" height="98" rx="12" fill="#4a5560"/><rect x="104" y="64" width="32" height="18" rx="4" fill="#d9573b"/><path d="M82 40h-30M158 40h30M82 110h-30M158 110h30" stroke="#2f3a44" stroke-width="9"/>`
  };
  return `${items[p]||items.flame}${spray(34,22,45)}<g class="pulse" style="transform-origin:120px 75px"><circle cx="120" cy="75" r="62" fill="none" stroke="#e24a3b" stroke-width="7" opacity=".92"/><path d="M76 119L164 31" stroke="#e24a3b" stroke-width="7" stroke-linecap="round" opacity=".92"/></g>`;
};
