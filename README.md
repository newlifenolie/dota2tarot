# Dota Tarot · 刀塔塔罗

A Dota 2 personality test and daily fortune, in English and 简体中文.

- **Personality reading:** pick your lane (Pos 1–5) and up to 3 favourite heroes, and three tarot cards reveal your archetype, with a trait chart.
- **Daily fortune (每日占卜):** draw one card a day for your luck, lucky hero, role and item, and a do/don't (宜/忌) for today's games.

## Run locally

It's plain HTML, CSS and JavaScript with no build step. Open `index.html`, or serve the folder:

```bash
python -m http.server 5173
```

## Files

- `index.html`: page structure
- `css/style.css`: styles and animations
- `js/data.js`: heroes, roles, traits and English reading text
- `js/i18n.js`: interface strings and Chinese translations
- `js/app.js`: app logic

After changing a CSS or JS file, bump the `?v=` number on its link in `index.html` so browsers fetch the new version.

## Disclaimer

Fan-made for fun. Not affiliated with or endorsed by Valve. Dota 2 and all hero art © Valve Corporation. Hero and item images are loaded from Valve's public CDN.
