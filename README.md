# Yue Jiang research website

A lightweight static research website built from the August 2026 CV. It requires no build system and can be hosted directly on GitHub Pages.

## Preview locally

From this folder, run:

```powershell
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Publish with GitHub Pages

1. Create a public GitHub repository named `YueJiangJerry.github.io`.
2. Upload every file and folder from this directory to the repository root.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. GitHub will display the public URL once deployment finishes.

The default address will be `https://yuejiangjerry.github.io/`.

## Update content

- Homepage copy: `index.html`
- Publication data: `data/publications.json`
- Visual style: `assets/styles.css`
- Publication filtering: `assets/publications.js`

## Privacy decisions in this draft

The public site includes the professional UNSW email and the supplied profile photograph. It intentionally excludes the home address and telephone number. No downloadable CV is included until a public-safe version is prepared.
