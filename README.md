# Dota Tarot · 刀塔塔罗

A Dota 2 personality test and daily fortune, in English and 简体中文.

- **Personality reading:** pick your lane (Pos 1–5) and up to 3 favourite heroes, and three illustrated tarot cards reveal your archetype, with a trait chart.
- **Daily fortune (每日占卜):** draw one card a day for your luck, lucky hero, role and item, and a do/don't (宜/忌) for today's games.
- **Share posters:** save a 1080×1920 poster of your reading or daily card for WeChat Moments, Discord and similar.

## Layout

- `public/`: the website (plain HTML, CSS and JavaScript; no build step)
  - `index.html`: page structure and the `#tarot-ink` SVG filter that gives hero art its printed-tarot look
  - `css/style.css`: styles and animations
  - `js/data.js`: heroes, roles, traits and English reading text
  - `js/i18n.js`: interface strings and Chinese translations
  - `js/app.js`: app logic, sound effects and poster drawing
- `worker.js`: Cloudflare Worker that serves `public/` and relays Dota 2 art at `/img/...` (needed so posters can draw the images, and for networks that block Steam's CDN)
- `wrangler.jsonc`: Cloudflare Worker config

## Adding hero art

The site can show original AI-generated art for each hero instead of Valve's.

1. Generate images with the prompts in [`art/PROMPTS.md`](art/PROMPTS.md) (also `art/prompts.csv`).
2. Save them in `art-source/` named by hero slug, e.g. `juggernaut.png` (this folder isn't committed).
3. Run `python tools/prepare_art.py`. It writes cropped `.webp` files to `public/art/` and updates `public/art/manifest.js`.
4. Commit and push.

Heroes without art keep the Valve art in the inked tarot style, so art can be added a few heroes at a time.
A reading uses the new art only when all of its chosen heroes have it.

## Deploying

The Cloudflare Worker is connected to this repo, so every push to `main` redeploys the site.
After changing a CSS or JS file, bump the `?v=` number on its link in `public/index.html` so browsers fetch the new version.

## Disclaimer

Fan-made for fun. Not affiliated with or endorsed by Valve. Dota 2 and all hero art © Valve Corporation. Hero and item images come from Valve's public CDN.
