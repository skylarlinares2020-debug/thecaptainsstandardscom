# AGENTS.md — Captain's Standard LLC Website

## Architecture

Single-page marketing site built with TanStack Start (React SSR) and deployed on Netlify.

### Key Directories

```
src/
  routes/
    __root.tsx      — HTML shell, fonts, meta tags
    index.tsx       — Entire website (one page, all sections)
  styles.css        — All custom CSS using CSS variables (no Tailwind utilities used)
public/
  captains-logo.jpeg   — Company logo (circular crop in nav/footer)
  skylar-oakley.jpeg   — About section photo
  __forms.html         — Static skeleton for Netlify Forms build detection
  favicon.ico
```

## Coding Conventions

- All styles live in `src/styles.css` using CSS custom properties (prefixed `--`) and class names prefixed `cs-`.
- Tailwind is imported but not heavily used — custom CSS handles layout.
- The entire site is a single route (`src/routes/index.tsx`). Add new routes only if new pages are needed.
- Form submissions POST to `/__forms.html` (not `/`) to bypass the SSR catch-all — required for Netlify Forms to work in TanStack Start.

## Non-obvious Decisions

- `public/__forms.html` must stay in sync with the form fields in `index.tsx`. If fields are added/removed from the React form, update this file too, or Netlify will reject submissions with unknown fields.
- The `netlify-forms` feature is enabled via `node /opt/buildhome/.claude/skills/netlify-forms/scripts/enable.cjs`. Re-run if the feature appears disabled.
- The logo images are JPEG (not SVG) and displayed with `border-radius: 50%` to appear circular.
- Google Fonts are loaded via `<link>` tags in `__root.tsx`'s `head()` rather than `@import` in CSS, for better performance.
