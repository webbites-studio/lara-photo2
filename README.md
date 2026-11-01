# Lara Nikolau — Photography Website

A horizontally scrolling editorial portfolio for photographer **Lara Nikolau**.

Photography is the dominant visual language. All images currently on the site are **placeholder Unsplash photographs** chosen to echo the mood of [Lara’s Instagram](https://www.instagram.com/lara_nikolau/) (natural light, genuine emotion, muted editorial warmth). They are **not** her work and should be replaced with original files before launch.

## Preview

Serve the folder over HTTP (required for some browsers with local ES/modules-free static files still being fine as `file://`, but HTTP is more reliable):

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

Alternatively use the Five Server / Live Server extension in VS Code.

## Structure

```
index.html        Horizontal homepage (hero → projects → portfolio → about → services → contact)
project.html      Horizontal project story (?slug=sunday-light)
css/style.css     Design system
js/data.js        Copy, categories, placeholder image IDs
js/main.js        Horizontal scroll, gallery, lightbox, form
```

## Design notes

- **Desktop:** vertical wheel / trackpad maps to a cinematic left-to-right filmstrip (`position: sticky` chassis).
- **Mobile (≤900px):** the same content stacks vertically with full-width photography.
- **Contact form** is client-side only (validation + success message). Wire to a backend or form service before production.
- Placeholder phone number uses the `555` exchange and must be replaced.

## Replacing photographs

Edit the Unsplash IDs in `js/data.js` (`img('...')`) and the two hero/about/contact `<img>` tags in `index.html`. Prefer `auto=format&fit=crop&w=…&q=80` (or local compressed assets) for fast loading.
