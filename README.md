# Matt's blog

A **content-driven** personal blog built with **Next.js (App Router)** and **MDX**, deployed as a static export to **GitHub Pages** at [mattchaffe.uk](https://mattchaffe.uk).

### Content

Posts live in `content/blog/*.mdx`. Images live in `public/content-images/`.

### Local development

```bash
npm install
npm run dev
```

### Build (static export)

GitHub Pages deploys automatically on push to `main` via the workflow in `.github/workflows/github-pages.yml`. To mimic the production build locally:

```bash
npm run build
```

The workflow sets `NEXT_PUBLIC_SITE_URL=https://mattchaffe.uk` and uploads the `out/` directory as the Pages artifact.
