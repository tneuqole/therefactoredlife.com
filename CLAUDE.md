# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # Start dev server at localhost:4321
pnpm build         # Build production site to ./dist/
pnpm preview       # Preview production build locally
pnpm astro check   # Type-check .astro files
pnpm deploy        # Build and push dist/ to gh-pages branch
```

No test or lint scripts are configured.

## Site Configuration

- **Site title/description**: `src/consts.ts` — update `SITE_TITLE` and `SITE_DESCRIPTION`
- **Site URL and integrations**: `astro.config.mjs` — update the `site` field from the placeholder `https://example.com`

## Architecture

### Content

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. The collection schema is defined in `src/content.config.ts` using Zod:

```
title: string (required)
description: string (required)
pubDate: date (required)
updatedDate: date (optional)
heroImage: image (optional)
```

Posts are fetched via `getCollection('blog')` and sorted by `pubDate` descending. Routes are statically generated at `/blog/{id}/` via `src/pages/blog/[...slug].astro`.

### Pages and Routing

File-based routing under `src/pages/`:
- `index.astro` — home page
- `about.astro` — about page (uses BlogPost layout with static props)
- `blog/index.astro` — blog listing (featured first post, then grid)
- `blog/[...slug].astro` — dynamic post pages
- `rss.xml.js` — RSS feed (GET handler using `@astrojs/rss`)

### Components and Layouts

`src/components/` contains shared components: `BaseHead`, `Header`, `Footer`, `HeaderLink`, `FormattedDate`. All pages use `BaseHead` for SEO (OG tags, canonical URLs, Twitter cards).

`src/layouts/BlogPost.astro` wraps all blog posts — pass `title`, `description`, `pubDate`, `updatedDate`, `heroImage` as props.

### Styling

Pure CSS with CSS custom properties — no Tailwind. Design tokens are defined in `src/styles/global.css`:
- `--accent`: #2337ff, `--accent-dark`: #000d8a
- `--gray`, `--gray-light`, `--gray-dark`, `--gray-gradient`
- Max content width: 720px; responsive breakpoint at 720px
- Font: Atkinson (custom `@font-face`, preloaded in BaseHead)

Component styles use Astro's scoped `<style>` tags.

### Images

Images in `src/assets/` are imported as `ImageMetadata` and rendered via Astro's `<Image>` component from `astro:assets` for automatic optimization.
