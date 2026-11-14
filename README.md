# PATRUZECI

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

**Version:** 3.1.0 · **Last updated:** 2026-11-14

**Status:** stable · **Offline:** complete (works from `file://`, no network needed)

**Live app:** [https://chiuta.github.io/PatruZeci/](https://chiuta.github.io/PatruZeci/)

**The illustrated, animated atlas of WD-40 uses**

Short card: All 1993 uses from the official “2000+ uses” list, plus extras from the web, each with its own animated illustration. Single file, offline, no account, no tracking.

Interface language: **Română** for now (the README is available in 8 languages: English, Română, Français, Italiano, Español, Português, Deutsch, Magyar).

## Detailed description

PATRUZECI is a single-file, offline web app (`index.html`, no server, no account, no tracking) about everything the multi-purpose spray WD-40 is used for: from squeaking hinges to sticky shovels. It combines a hand-written guide with the complete official list of user-submitted uses, translated and animated. The name is Romanian for “forty”, after the 40th formula (WD = Water Displacement).

## Screenshots

| | | |
|---|---|---|
| <img src="docs/screenshots/desktop-guide.png" alt="Guide: 147 animated cards, filters by category and function" width="100%"><br><sub>Guide: 147 animated cards, filters by category and function</sub> | <img src="docs/screenshots/desktop-full.png" alt="Full list: 2018 uses, six official sections plus a web section" width="100%"><br><sub>Full list: 2018 uses, six official sections plus a web section</sub> | <img src="docs/screenshots/desktop-modal.png" alt="Detail sheet with illustration, risk level and function tags" width="100%"><br><sub>Detail sheet with illustration, risk level and function tags</sub> |
| <img src="docs/screenshots/desktop-web.png" alt="Section 🌐: extra uses, myths and warnings from web articles" width="100%"><br><sub>Section 🌐: extra uses, myths and warnings from web articles</sub> | <img src="docs/screenshots/tablet-full.png" alt="Tablet layout (three columns)" width="100%"><br><sub>Tablet layout (three columns)</sub> | <img src="docs/screenshots/phone-guide.png" alt="Phone: bottom tab bar, two-column grid" width="100%"><br><sub>Phone: bottom tab bar, two-column grid</sub> |
| <img src="docs/screenshots/phone-full.png" alt="Phone: full list" width="100%"><br><sub>Phone: full list</sub> | <img src="docs/screenshots/phone-modal.png" alt="Phone: detail sheet as a bottom sheet, with swipe navigation" width="100%"><br><sub>Phone: detail sheet as a bottom sheet, with swipe navigation</sub> | <img src="docs/screenshots/desktop-avoid.png" alt="“What to avoid”: where WD-40 is not the right choice" width="100%"><br><sub>“What to avoid”: where WD-40 is not the right choice</sub> |

## What is in the app

- **Guide** — 147 hand-written cards in 14 categories, each with advice, a risk level (generally safe / use caution / not recommended) and what the spray does (lubricates, loosens, cleans, protects from rust, displaces moisture).
- **Full list** — all 1993 uses from the official “2000+ uses” list, translated into Romanian, searchable and filterable by the six official sections and by function, with infinite scroll. Plus a 🌐 section with 25 extra uses, myths and warnings from recent web articles.
- **Animations** — 131 scene variants (hinge, bolt, chain, stain, rust, zipper, wheel, pulley…) chosen automatically for each use. They pause when off-screen and stop with “Animations: off” or when the system asks for reduced motion.
- **Safety first** — 112 uses are marked “not recommended” (brakes, seat belts, food contact, skin and animals, medical devices, vinyl records…) and 245 “use caution”, each with an explanation.
- **Responsive** — phone (bottom tab bar, bottom-sheet details, swipe), tablet, desktop (two-column details, arrow keys), safe-area aware.
- **Tabs** — How it works, Range of WD-40 products, What to avoid, Sources.
- **Private** — favourites are kept in the browser’s local storage; nothing is sent anywhere.

## Honest limits

The illustrations are generic animated scenes matched by rules to the action and the object of each use, not 2000 unique drawings; the automatic matching can be approximate. The official list is user-submitted and has **not been tested by WD-40 Company**; it is also very repetitive. The Romanian translation was produced with AI assistance. The interface is currently in Romanian only.

## Safety

WD-40 is a flammable aerosol: keep it away from flames, sparks and hot surfaces, work in a ventilated place, never spray near eyes or face, keep out of reach of children. Test on a hidden spot before using it on plastic, paint or fabric and wipe off the excess. Always follow the product label and the safety data sheet (SDS). This app is not technical or medical advice.

## Use

Open `index.html` in any modern browser (it works from `file://`), or publish it with GitHub Pages (a workflow is included: **Settings → Pages → Source: GitHub Actions**).

## Develop

`index.html` is generated from `src/` (scenes, data, UI, styles). After editing:

```bash
python3 tools/build.py   # src/ → index.html
```

## Sources and credits

- Official list “2000+ uses” (wd40.com) and “Top 26 most unusual uses” — [wd40.com/useArticle/unusual-uses-wd40](https://www.wd40.com/useArticle/unusual-uses-wd40/).
- Articles consulted: Cheapism, Bob Vila, SlashGear, Wide Open Country, Instructables, Snopes, and the WD-40 e-bike service guide. The full list is in the app’s “Sources” tab.

Unofficial, independent app. WD-40 is a registered trademark of WD-40 Company; the illustrations are original and do not reproduce its packaging or logo.

## License

[MIT](LICENSE) © 2026 Alexandru-Ionuț Chiuță (Alexio).

## Support

If you like it: [Buy Me a Coffee](https://buymeacoffee.com/echo.of.the.strings).
