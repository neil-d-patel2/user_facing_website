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

## Content

The requested DesignPro wording is placeholder copy for SafeSock. Change the brand, copy, video URL, and navigation previews in `src/content.ts`.

Only the landing page is implemented. Navigation items open lightweight preview dialogs; the enrollment button shows the upcoming enrollment announcement. There is no application backend, mailing-list submission, or invented contact address.

`src/components/ShinyText.tsx` provides the reusable three-second, left-to-right gradient animation. The background video and shine can be paused together and respect the system’s reduced-motion preference. Inter is served locally through Fontsource.
