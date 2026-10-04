# Hao Zhong · 钟好

Personal academic homepage at **[me.haoz.uk](https://me.haoz.uk)**.
A static HTML/CSS/JavaScript site hosted on GitHub Pages, with no framework,
package installation, or build step. Page content is rendered in the browser.

## Local preview

Run from the repository root:

```bash
python3 -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000) and refresh after edits.
Keep the server running while previewing. Use `?theme=light` or `?theme=dark`
to preview a theme; otherwise the page uses the saved preference or system theme.

Work locally and review the result before publishing. A push to **`master`**
updates the public website; publish only after the owner approves the final version.
See [DEPLOYMENT.md](DEPLOYMENT.md) for the release workflow and domain setup.

## File structure

```text
.
├── index.html                  Page structure and search/social metadata
├── css/
│   └── style.css               Design tokens, typography, layout, themes, responsive rules
├── js/
│   ├── data.js                 Profile, biography, news, publications, education
│   └── main.js                 Rendering and theme controls
├── assets/fonts/               Self-hosted woff2 subsets with their OFL licenses
│   ├── SourceSerif4-display.woff2   Headings (static, weight 500, optical size 60)
│   ├── SourceSerif4-text.woff2      Serif text (variable, weights 400–600)
│   ├── SourceSerif4-text-italic.woff2   Serif italic (variable, weights 400–600)
│   ├── Inter-latin.woff2            Sans text and interface (variable, weights 400–700)
│   └── NotoSerifSC-name.woff2       The two glyphs of the Chinese name
├── assets/img/
│   ├── favicon.svg             Browser icon (serif HZ on clay)
│   ├── favicon-32.png          PNG fallback icon
│   ├── apple-touch-icon.png    iOS home-screen icon
│   ├── og.png                  Social sharing image
│   └── papers/
│       ├── reasonmatch.png     Publication thumbnails
│       ├── omni-r1.png
│       ├── active-o3.jpg
│       └── SOURCES.md          Original figures and crop descriptions
├── CNAME                       GitHub Pages custom domain
├── .nojekyll                   Serve files without Jekyll processing
├── robots.txt                  Crawler policy and sitemap location
├── sitemap.xml                 Canonical homepage URL and update date
├── .gitignore                  Local temporary files
├── README.md                   Content maintenance and local preview
└── DEPLOYMENT.md               Publishing, DNS, HTTPS, troubleshooting
```

## Content maintenance

Most content edits belong in **[js/data.js](js/data.js)**:

| Field | Usage |
| --- | --- |
| `profile` | English/Chinese names, role, affiliation, location, research-interest tags, contact links |
| `about` | Biography paragraphs in display order; HTML links/emphasis allowed |
| `news` | Newest first; the first three entries appear immediately, others under Earlier updates |
| `pubs` | Publications; selected work first, then other papers grouped by descending year |
| `education` | Degrees in display order |

Content is trusted, manually maintained source data. HTML fragments are rendered
as HTML, so do not insert unreviewed external markup.

### Publications

Each entry has `title`, `authors`, `venue`, `tag`, `year`, `selected`, and `links`.
Use an empty `tag` or `links` object when that information is unavailable.
The exact author name `Hao Zhong` is automatically emphasized.

- `selected: true` places the work in Selected publications. Selected entries
  retain their order in the array; other entries retain array order within each year.
- `year` is the conference/publication year, or the preprint/report year when
  there is no conference. The arXiv identifier may have an earlier year.
- `shortTitle` and `topic` label selected work; `summary` is an optional short
  research description and `note` is an optional additional note.
- `links` maps labels to URLs, such as `arXiv`, `Code`, and `Project`.
  Titles link to arXiv first, then the project or code when no arXiv link exists.

For thumbnails, add `img`, descriptive `imgAlt`, and the actual pixel dimensions
`imgWidth` / `imgHeight`. Store images in `assets/img/papers/` and record the
source and any crop in [SOURCES.md](assets/img/papers/SOURCES.md). Thumbnails are
shown in a fixed 5:4 frame and cropped to fill it; for a wide figure, set the
optional `imgPosition` (a CSS `object-position` value such as `"left center"`)
to choose the part that stays visible. Thumbnails link to the project page when
available. Selected entries without images use a text panel.

### Metadata and assets

Changes to the name, affiliation, research description, or social links may also
need updates in `index.html` (title, description, Open Graph/Twitter, JSON-LD).
These are separate from the rendered biography. Keep the canonical URL,
`CNAME`, `robots.txt`, and `sitemap.xml` consistent with the live domain.
Update the sitemap's `lastmod` date when publishing substantive homepage changes.
The sharing image lives in `assets/img/og.png`.

### Typography and brand assets

Fonts are self-hosted subsets in `assets/fonts/`: Source Serif 4 for headings and
the biography, Inter for interface and metadata text, and a two-glyph Noto Serif SC
file for the Chinese name. The serif includes an italic cut and old-style
numerals, used for News text, dates, education periods, and year labels. Each
ships with its SIL Open Font License text. The
subsets cover Latin, Latin Extended-A, and common punctuation; if content needs
other scripts, regenerate the subsets with fontTools (`pyftsubset`) instead of
loading fonts from a third-party CDN. The favicon, touch icon, and `og.png` share
the site's clay accent and serif; regenerate them together if the brand colour or
name changes.

A faint SVG noise overlay (`body::before` in `css/style.css`) gives the
background a paper texture; lower its `opacity` or delete the rule to remove it.
Section headings are numbered automatically with a CSS counter.

### Before publishing

- Preview wide and narrow layouts, both themes, and Earlier updates.
- Check publication counts, author names, thumbnails, links, and image descriptions.
- Run `git diff --check`; if Node.js is available, run
  `node --check js/data.js` and `node --check js/main.js`.
- Review the staged diff and ensure temporary files are not included.

## Content follow-ups

These are editorial follow-ups, not deployment requirements:

- Confirm the complete LLaDA 2.1 author list and add its paper/project link.
- Confirm presentation types for Exploring Spatial Intelligence and
  Preserving Source Video Realism before adding badges.
- Add a CV and further paper thumbnails when ready. The owner has chosen not to
  show a portrait; no placeholder is displayed.
- Consider Google Search Console submission and links from academic profiles.
