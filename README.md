# charvi-world · a playable 3D portfolio

A **3D world portfolio** built with React, Vite, Three.js, React Three Fiber, drei, GSAP, Framer Motion, React Router and Tailwind CSS.

The homepage is not a conventional site — it is a **miniature island** you explore. Six locations
(About, Projects, Certifications, Collections, Resume, Contact) sit on the island, each with its own
building and **giant extruded 3D sign**. Clicking a sign flies the camera over for a cinematic
arrival, then the world dissolves into an orange/cream curtain that opens the matching page.

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
```

## How it works

- **`src/data/`** — all content lives here. Edit these files to personalise the whole site:
  - `content.js`  → your name, bio, education, experience, philosophy, social links
  - `projects.js` → projects (title, year, category, description, palette, artwork seed)
  - `certifications.js` → certificates (title, organization, year, description, verificationLink)
  - `collections.js` → collections (concept, inspiration, materials, palette, 3 looks each)
  - `skills.js`   → skill groups and the tool chips
  - `locations.js`→ the world map: where each site/sign sits, and where the camera lands
  - `posters.js`  → original procedural SVG artwork generator (no external images needed)
- **`src/components/three/`** — the WebGL world: `World`, `Terrain` (vertex-coloured island +
  river bed), `Water` (distort water + shoreline), `Paths` (tubes, plaza, bridge, pavers),
  `Trees`/`Grass`/`Rocks`, `BuildingsA/B/C` (house, studio, gallery, showroom, booth, desk),
  `WorldText` (giant beveled `Text3D` signs), `Character` (auto-walking avatar),
  `Effects` (clouds, birds, fireflies), `CameraController` (GSAP cinematic camera).
- **Navigation flow** — signs call `camStore.requestFly()` → GSAP flies the camera in-canvas →
  on arrival `navStore.go()` fires → `TransitionVeil` (in `App.jsx`) drops the curtain →
  React Router swaps the route → the curtain lifts. "RETURN TO WORLD" reverses it.
- **`PublicURL issues`** — the extruded letters use a bundled Helvetiker typeface
  (`public/fonts/helvetiker_bold.typeface.json`) and UI fonts come from `@fontsource`, so the
  site works fully offline.

## Tips

- `data/posters.js` is a tiny generative art engine — change `seed` per project to reshuffle the artwork.
- On low-end/mobile devices shadows shrink, DPR drops and fireflies turn off automatically.
- Replace the abstract avatar by swapping `makeAvatar(7)` for any image in `About.jsx`.

## Stack

React 18 · Vite · Three.js · @react-three/fiber · @react-three/drei · GSAP · Framer Motion ·
React Router · Tailwind CSS · pdf-lib (client-side resume PDF)