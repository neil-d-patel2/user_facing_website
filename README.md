# SafeSock landing page

A responsive, full-screen video hero built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, and Lucide React.

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run lint
npm run build
```

`npm run preview` serves the production build locally.

## Deployment

The live site is [neil-d-patel2.github.io/user_facing_website](https://neil-d-patel2.github.io/user_facing_website/).

GitHub Pages uses GitHub Actions as its publishing source. Every push to `main` runs `.github/workflows/deploy.yml`, which installs the locked dependencies, checks the code, builds the app, and publishes `dist`. The workflow obtains the site's base path from GitHub Pages so scripts, styles, fonts, and the favicon load under the repository URL. Local development continues to use `/`.

To verify the same build locally:

```sh
VITE_BASE_PATH=/user_facing_website/ npm run build
VITE_BASE_PATH=/user_facing_website/ npm run preview
```

Then open `http://127.0.0.1:4173/user_facing_website/`.

## Content

The landing page introduces SafeSock’s connected recovery direction: gait and weight-bearing insight, clinician workflows, and a simpler patient experience. Change the copy, video URL, and informational panels in `src/content.ts`.

Only the landing page is implemented. Navigation and the main button open informational dialogs. Remote visits, interactive 3D assessment, clinician selection, scheduling, and joint-loading estimates are explicitly described as planned capabilities. No patient data, bookings, contact submissions, or clinical assessments are collected by this site.

[Product context and priorities](docs/product-context.md) records the reference repository, the requested clinical workflows, implementation challenges, and the recommended build order. The original video, typography, and animated hero design are preserved.

`src/components/ShinyText.tsx` provides the reusable three-second, left-to-right gradient animation. The background video and shine can be paused together and respect the system’s reduced-motion preference. Inter is served locally through Fontsource.
