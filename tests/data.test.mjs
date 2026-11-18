// Teste de integritate a datelor PATRUZECI: cifrele din documentație față de date, paritatea celor 8 limbi, nivelurile de risc
// (niciodată sub pragul stabilit la auditul din 18 nov 2026), scenele, intrări ostile. Rețea externă blocată.
// Rulare: node tests/data.test.mjs   (cere playwright; CHROMIUM_PATH opțional)
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {createRequire} from "node:module";
const require = createRequire(process.env.PW_ROOT || import.meta.url);
const {chromium} = require("playwright");
const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const FILE = "file://" + path.join(DIR, "index.html");
let ok = 0, bad = 0;
const check = (n, c, x) => { if (c) { ok++; console.log("  ok   " + n); } else { bad++; console.log("  FAIL " + n + (x !== undefined ? "  -> " + JSON.stringify(x).slice(0, 400) : "")); } };
// Prag minim de risc (indice în lista completă -> nivel): intrări care contraziceau regulile „De evitat” ale aplicației
// (frâne, aparate de gătit/încălzit, contact alimentar, echipament pentru copii, electric sub tensiune, dispozitive medicale,
// plastice sensibile, animale, suprafețe pe care se calcă) sau tratamentul intrărilor-surori. Se poate doar ridica, nu scădea.
const FLOOR = {3:1,6:2,7:1,15:1,31:1,33:1,37:1,42:1,44:1,57:1,60:2,70:1,73:1,79:1,86:1,88:1,96:1,99:1,105:1,116:1,118:1,133:1,137:1,139:2,140:1,148:1,152:2,153:1,172:1,183:2,185:2,188:1,195:1,210:1,216:2,217:1,225:2,232:1,233:2,234:2,235:2,237:2,260:1,262:1,266:1,270:2,274:1,293:1,294:1,296:2,302:2,319:2,336:2,341:1,343:1,347:1,349:1,350:1,351:2,359:1,362:1,379:1,395:1,398:1,408:2,411:1,412:1,416:1,428:1,432:1,433:1,462:1,474:1,485:1,520:1,526:2,534:1,565:1,573:1,628:1,632:1,636:1,643:1,644:2,649:1,654:1,655:1,668:1,672:1,674:1,704:1,755:1,761:1,766:1,804:1,872:1,880:2,891:1,919:1,937:2,947:2,953:1,963:1,991:2,1065:2,1261:2,1292:1,1296:1,1415:1,1429:1,1440:1,1496:2,1497:2,1502:1,1578:1,1598:1,1600:1,1611:1,1643:1,1661:1,1672:1,1700:1,1716:1,1719:1,1733:1,1737:1,1743:2,1756:1,1768:1,1800:1,1852:1,1888:1,1889:2,1890:1,1898:1,1901:2,1906:1,1944:2,1962:2,1965:1,2001:2};
const appjson = JSON.parse(fs.readFileSync(path.join(DIR, "app.json"), "utf8"));
const b = await chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined, args: ["--no-sandbox"]});
const errs = [];
async function open(pre) {
  const ctx = await b.newContext({viewport: {width: 1100, height: 800}, serviceWorkers: "block"});
  await ctx.route(/^https?:/, (r) => r.abort());
  const p = await ctx.newPage();
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("dialog", (d) => { errs.push("dialog:" + d.message()); d.dismiss(); });
  if (pre) await p.addInitScript(pre);
  await p.goto(FILE); await p.waitForTimeout(600);
  return {ctx, p};
}
const {ctx, p} = await open();
const D = await p.evaluate((floor) => {
  const L = Object.keys(UI), o = {L};
  o.uses = USES.length; o.cats = Object.keys(CATS).length; o.full = FULL.length; o.official = FULL.filter((x) => x[0] < FSEC.length - 1).length;
  o.extras = FULL.filter((x) => x[0] === FSEC.length - 1).length; o.sections = FSEC.length; o.avoid = AVOID.length; o.range = RANGE.length;
  o.scenes = Object.keys(S).length; o.fsc = FSC.length; o.fscDistinct = new Set(FSC.map((s) => s[0] + "|" + s[1])).size;
  const v = new Set(); USES.forEach((u) => v.add(u.s + "|" + u.p)); FSC.forEach((s) => v.add(s[0] + "|" + s[1])); o.variants = v.size;
  o.undefinedScenes = [...v].filter((k) => typeof S[k.split("|")[0]] !== "function").length;
  o.badSvg = [...v].filter((k) => { const a = k.split("|"); try { return illust(a[0], a[1], "x").indexOf("<svg") < 0; } catch (e) { return true; } }).length;
  o.r = [0, 1, 2].map((k) => FULL.filter((x) => x[4] === k).length);
  o.riskDomain = FULL.every((x) => x[4] === 0 || x[4] === 1 || x[4] === 2);
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join(",");
  o.lang = {};
  for (const l of L) {
    setLang(l);
    const P = l === "ro" ? RO0 : CPK[l], r = {};
    r.lens = [P.uses.length, P.full.length, P.range.length, P.avoid.length];
    const strs = P.full.slice(); P.uses.forEach((u) => { strs.push(u[0], u[1]); }); P.range.forEach((x) => strs.push(x[0], x[1])); P.avoid.forEach((x) => strs.push(x[0], x[1], x[2]));
    r.empty = strs.filter((s) => typeof s !== "string" || !s.trim()).length;
    r.untrimmed = strs.filter((s) => typeof s === "string" && (s !== s.trim() || s.indexOf("  ") >= 0)).length;
    r.roLetters = l === "ro" ? 0 : strs.filter((s) => /[ăĂșȘțȚşŞţŢ]/.test(s)).length;
    r.scraped = strs.filter((s) => /WD-40 Company by end-users|Consumers should exercise common sense/.test(s)).length;
    r.longest = Math.max.apply(null, P.full.map((s) => s.length));
    r.uiKeys = Object.keys(UI[l]).sort().join(",");
    r.uiPh = Object.keys(UI.ro).filter((k) => typeof UI.ro[k] === "string" && ph(UI.ro[k]) !== ph(UI[l][k])).length;
    r.notes = Object.keys(floor).filter((i) => !FULL[i][5]).length;
    r.fnoteKeys = l === "ro" ? "" : Object.keys(P.fnote).sort().join(",");
    o.lang[l] = r;
  }
  setLang("en");
  o.floorBad = Object.keys(floor).filter((i) => FULL[i][4] < floor[i]).map((i) => i + ":" + FULL[i][4]);
  const safe = document.querySelector("#fsafe"); tab("full"); safe.click();
  o.safeShown = fList.length; safe.click();
  return o;
}, FLOOR);
check("8 limbi în UI", D.L.length === 8, D.L);
check("147 de carduri în 14 categorii", D.uses === 147 && D.cats === 14, [D.uses, D.cats]);
check("2018 intrări = 1993 oficiale + 25 din web (7 secțiuni)", D.full === 2018 && D.official === 1993 && D.extras === 25 && D.sections === 7, [D.full, D.official, D.extras, D.sections]);
check("14 de evitat, 13 produse în gamă", D.avoid === 14 && D.range === 13, [D.avoid, D.range]);
check("scene: toate definite, toate variantele produc SVG", D.undefinedScenes === 0 && D.badSvg === 0 && D.scenes >= 25, [D.undefinedScenes, D.badSvg, D.scenes]);
check("tabela FSC: 131 de variante distincte, 157 în total cu ghidul", D.fsc === 131 && D.fscDistinct === 131 && D.variants === 157, [D.fsc, D.fscDistinct, D.variants]);
check("niveluri de risc doar 0/1/2", D.riskDomain);
check("nicio intrare din prag sub nivelul stabilit", D.floorBad.length === 0, D.floorBad);
check("filtrul „doar sigur” ascunde tot ce are risc", D.safeShown === D.r[0], [D.safeShown, D.r[0]]);
const fnk = D.lang.en.fnoteKeys;
for (const l of D.L) {
  const r = D.lang[l];
  check(l + ": 147/2018/13/14 la texte", r.lens.join() === "147,2018,13,14", r.lens);
  check(l + ": fără texte goale sau cu spații în plus", r.empty === 0 && r.untrimmed === 0, [r.empty, r.untrimmed]);
  check(l + ": fără litere românești în afara limbii ro", r.roLetters === 0, r.roLetters);
  check(l + ": fără reziduuri de scraping (disclaimer lipit)", r.scraped === 0 && r.longest < 260, [r.scraped, r.longest]);
  check(l + ": aceleași chei UI ca în ro și aceleași {substituenți}", r.uiKeys === D.lang.ro.uiKeys && r.uiPh === 0, r.uiPh);
  check(l + ": toate intrările din prag au notă proprie", r.notes === 0, r.notes);
  if (l !== "ro") check(l + ": aceleași note ca în en", r.fnoteKeys === fnk);
}
// documentația: cifrele din README-uri (toate cele 8) coincid cu datele
const files = ["README.md", "README.ro.md", "README.fr.md", "README.it.md", "README.es.md", "README.pt.md", "README.de.md", "README.hu.md"];
const rd = files.map((f) => fs.readFileSync(path.join(DIR, f), "utf8"));
const nums = (s) => (s.match(/\d+/g) || []).map(Number);
check("README ×8: același număr de linii și de titluri", new Set(rd.map((t) => t.split("\n").length)).size === 1 && new Set(rd.map((t) => (t.match(/^## /gm) || []).length)).size === 1, rd.map((t) => t.split("\n").length));
rd.forEach((t, i) => {
  const lines = t.split("\n"), f = files[i];
  const find = (re) => lines.filter((x) => re.test(x));
  const ver = (find(/^\*\*[^*]+:\*\* \d+\.\d+\.\d+ · \*\*[^*]+:\*\* \d{4}-\d{2}-\d{2}/)[0] || "");
  check(f + ": versiunea și data coincid cu app.json", ver.indexOf(appjson.version + " ·") > 0 && ver.endsWith(appjson.updated), ver);
  const sf = find(/^- \*\*[^*]+\*\* — .*\b2018\b|^- \*\*[^*]+\*\* — .*\b1993\b/).join(" ");
  check(f + ": 1993 oficiale, 25 suplimentare, 147 carduri", nums(sf).indexOf(1993) >= 0 && nums(sf).indexOf(25) >= 0 && nums(t).indexOf(147) >= 0, nums(sf));
  const an = lines[34] || "", sa = lines[35] || "";
  check(f + ": numărul de variante de scene = " + D.variants, an.startsWith("- **") && nums(an).indexOf(D.variants) >= 0, an.slice(0, 80));
  check(f + ": numerele de risc = " + D.r[2] + " / " + D.r[1], sa.startsWith("- **") && nums(sa).indexOf(D.r[2]) >= 0 && nums(sa).indexOf(D.r[1]) >= 0, sa.slice(0, 80));
});
await ctx.close();
// intrări ostile
{
  const h = await open(() => { try { localStorage.setItem("patruzeci-fav", '[999999,"a",null,{"x":1},-5,1.5,"__proto__"]'); localStorage.setItem("patruzeci-lang", "xx"); } catch (e) {} });
  check("favorite stricate + limbă necunoscută: pornește", await h.p.evaluate(() => document.documentElement.lang.length >= 2 && typeof favs === "object"));
  await h.p.fill("#q", "<img src=x onerror=alert(1)> ([\\*+?^$|{}");
  await h.p.evaluate(() => tab("full"));
  await h.p.fill("#fq", '"><svg onload=alert(1)> \\ ( [ * +'); await h.p.waitForTimeout(250);
  check("căutare ostilă: fără HTML injectat", await h.p.evaluate(() => !document.querySelector("#grid img[src=x]") && !document.querySelector("svg[onload]")));
  await h.ctx.close();
}
check("fără erori JS / dialoguri", errs.length === 0, errs);
await b.close();
console.log(ok + " ok, " + bad + " FAIL");
process.exit(bad ? 1 : 0);
