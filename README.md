# Abhishek Soundalgekar — Portfolio

Personal portfolio site built with React, Vite, Tailwind CSS, Framer Motion,
and a Three.js / react-three-fiber animated hero. Deployed on Vercel.

**Live:** [is.gd/abhisound](http://is.gd/abhisound)

## Tech stack

- **React 18 + Vite** — app shell and build tooling
- **Tailwind CSS** — styling, dark mode via the `class` strategy
- **Framer Motion** — scroll-triggered and entrance animations
- **@react-three/fiber + drei + three.js** — animated 3D hero background
- **react-icons** — GitHub / LinkedIn / LeetCode / GfG iconography

## Project structure

```
portfolio-website/
├── public/assets/       # resume.pdf, favicon, OG image
├── src/
│   ├── components/      # section components (Hero, About, Experience, ...)
│   │   └── three/       # HeroScene.jsx — the animated 3D background
│   ├── App.jsx           # nav, theme toggle, scroll progress, layout
│   └── main.jsx
├── index.html
└── vite.config.js
```

## Local development

```bash
cd portfolio-website
npm install
npm run dev       # http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build locally
```

## Deployment

Deployed on **Vercel**. The root [`vercel.json`](./vercel.json) points Vercel
at the `portfolio-website/` subfolder (`buildCommand` + `outputDirectory`), so
no dashboard configuration is required — every push to `main` redeploys
automatically.

## Content

Experience, education, skills, and project details mirror the latest resume.
Update `src/components/Experience.jsx`, `Projects.jsx`, `Skills.jsx`, and
`Education.jsx` directly to keep the site in sync with future resume changes.
