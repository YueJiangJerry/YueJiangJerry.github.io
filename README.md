# Yue Jiang research website

A lightweight static research website built from the August 2026 CV. It requires no build system and can be hosted directly on GitHub Pages.

- Live site: <https://yuejiangjerry.github.io/>
- Repository: <https://github.com/YueJiangJerry/YueJiangJerry.github.io>

## Preview locally

From this folder, run:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deployment

The site is published from the `main` branch of `YueJiangJerry/YueJiangJerry.github.io`. Changes committed to that branch are deployed automatically by GitHub Pages.

## Update content

- Homepage copy: `index.html`
- Publication data: `data/publications.json`
- Visual style: `assets/styles.css`
- Publication filtering: `assets/publications.js`

## Privacy decisions in this draft

The public site includes the professional UNSW email, the supplied profile photograph, and a downloadable public-safe CV. The CV excludes the personal contact section, including the home address and telephone number.
