# haoz0206.github.io

Personal academic homepage for Hao Zhong — a zero-build static site hosted on GitHub Pages.
Live at **https://haoz0206.github.io**.

## Editing

All content lives in **`js/data.js`** — the single source of truth. To update the
site, edit only that file (no HTML changes needed):

- **`profile`** — name, tagline, affiliation, social links
- **`about`** — the About paragraphs (HTML allowed)
- **`news`** — add a new item to the **top** of the array
- **`pubs`** — add / edit / reorder publications; set `selected: true` to feature one
- **`education`** — degrees

Your own name (`Hao Zhong`) is auto-bolded in author lists. Publication badges:
`venue` is the small grey label, `tag` is the coloured pill (e.g. `Poster`), and
`links` is a `{ label: url }` map rendered as buttons.

## Local preview

Just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

Useful URL params: `?theme=dark` and `?pubs=all`.

## Structure

```
index.html        page shell
css/style.css     styles (light/dark via [data-theme])
js/data.js        <-- edit this to update content
js/main.js        renders data.js + theme/filter toggles
assets/img/       favicon (+ optional images)
.nojekyll         serve files as-is (no Jekyll processing)
```

## Deployment

This is a GitHub **user site**: pushing to the default branch of the
`haoz0206.github.io` repo publishes automatically to the live site.

For hosting, custom domain (`me.haoz.uk`), DNS records, HTTPS, and
troubleshooting, see **[DEPLOYMENT.md](DEPLOYMENT.md)**.
