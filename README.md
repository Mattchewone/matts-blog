# Matt’s blog

This is a **content-driven** personal blog built with **Next.js (App Router)** and **MDX**, deployed as a static export to **GitHub Pages**.

### Content

- Posts live in `content/blog/*.mdx`.
- Images downloaded during migration live in `public/content-images/`.

### Local development

```bash
npm install
npm run dev
```

### Build (static export)

GitHub Pages uses a base path, so locally you can mimic it like this:

```bash
NEXT_PUBLIC_BASE_PATH=/matts-blog npm run build
```

### One-time migration from `mattchaffe.uk`

This fetches the current live posts and writes them as MDX in this repo:

```bash
node scripts/migrate-from-mattchaffe.mjs
```
