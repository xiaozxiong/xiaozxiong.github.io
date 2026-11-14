# Zhixiong Xiao — Academic Homepage

A personal academic homepage built with Jekyll 4.4, Liquid, and plain CSS/JavaScript, intended for GitHub Pages. Routine updates use YAML and Markdown files without changing page templates.

## Local Preview and Build

Requires Ruby 3.0 or later and Bundler. Run these commands from the project root:

```bash
bundle install
bundle exec jekyll serve
```

Open <http://127.0.0.1:4000/>. Content and style changes normally trigger automatic rebuilds while the server runs; refresh the browser to see them. Restart the server after changing `_config.yml`.

If the port is occupied, check for an existing preview server or use another port:

```bash
bundle exec jekyll serve --port 4001
```

Then open <http://127.0.0.1:4001/>. Press `Ctrl+C` in the server terminal to stop it.

To build without starting a server:

```bash
bundle exec jekyll build
```

Generated files go into `_site/`. Do not edit that directory directly: subsequent builds regenerate its contents. README is excluded from the published output.

The stylesheet, favicon, and navigation logo URLs include a build-time version parameter to refresh browser caches. If changes do not appear, confirm that the preview server uses this checkout, then try `Ctrl+Shift+R`. Local edits do not update an already deployed website.

## Pages and Navigation

| Page | Local path | Current behavior |
|---|---|---|
| Home | `/` | Visible in navigation; includes About Me, Research interests, News, Selected Publications, and Services |
| Publications | `/publications` | Visible in navigation; papers grouped by year with year links and scroll highlighting |
| CV | `/cv` | Hidden from navigation; still generated and accessible directly |
| Beyond | `/beyond` | Hidden from navigation; still generated and accessible directly |

All pages share the profile sidebar, top navigation, and centered footer. Hiding the CV page from navigation does not affect the Curriculum Vitae PDF link in the sidebar.

### Restore a Hidden Navigation Link

Add the corresponding link inside `<nav class="nav-links">` in `_layouts/default.html`:

```liquid
<a href="{{ '/cv' | relative_url }}" class="nav-item" {% if page.url contains 'cv' %}aria-current="page"{% endif %}>CV</a>
<a href="{{ '/beyond' | relative_url }}" class="nav-item" {% if page.url contains 'beyond' %}aria-current="page"{% endif %}>Beyond</a>
```

Removing a navigation link does not restrict access to the page. To stop generating a page, add `cv.html` or `beyond.html` to the `exclude` list in `_config.yml`, then restart and rebuild. Previously downloaded or cached copies remain unaffected.

## Where to Make Changes

| Content | File or directory |
|---|---|
| Names, portrait, position, school, email, biography, social links | `_data/profile.yml` |
| Education, experience, awards, service, teaching, skills | `_data/profile.yml`, rendered by `cv.html` |
| Research topics | `_research/*.md` |
| News | `_news/*.md` |
| Publications | `_publications/<year>/*.md` |
| Beyond activities and photo descriptions | `_beyond/*.md` |
| Portrait | `images/portrait.jpg`, or change `photo` in `profile.yml` |
| Navigation logo and favicon | `images/logo.png` |
| WeChat QR code | `images/wechat.png` |
| Downloadable CV | `assets/cv/xiao_cv.pdf` |
| Paper PDFs and slides | `assets/pubs/`, `assets/slides/` |
| Fonts, colors, spacing, responsive layout | `assets/css/style.css` |
| Shared profile sidebar | `_includes/profile.html` |
| Publication link buttons and icons | `_includes/publication-link.html` |
| Homepage structure | `index.html` |
| Publication list, year navigation, highlighting logic | `publications.html` |
| Navigation, footer, external fonts and icon library | `_layouts/default.html` |
| Site title, description, domain, collections | `_config.yml` |

## Update Personal Information

Edit `_data/profile.yml`:

- `name`, `name_cn`: English and Chinese names in the sidebar. The Chinese name uses a system Kaiti font with Songti/serif fallbacks, so its appearance varies by device.
- `photo`: Path to the circular portrait. Set it to `""` to show the first letter of the English name instead.
- `affiliation`, `school`: Position and institution, displayed on separate lines.
- `email`: Visible email text and its `mailto:` link; no envelope icon is displayed.
- `about_detail`: About Me text, supporting HTML such as `<strong>` and `<a>`. Links are underlined and bold text is black.
- `about_lead`: Optional introduction in larger type; currently unused.
- `links`: Social links, displayed in YAML order. WeChat is currently last.
- `pronouns`: Not displayed by the current template.

### Social Icons

Social links appear as a horizontal row of brand icons without visible labels. Keep `text`: it provides the hover tooltip and accessible name. For example:

```yaml
links:
  - icon: "fa-brands fa-github"
    text: "GitHub"
    url: "https://github.com/your-account"
  - icon: "fa-brands fa-weixin"
    text: "WeChat"
    url: "/images/wechat.png"
```

The `icon` field uses Font Awesome classes. Brand colors are defined by `.id-links .fa-*` rules in the stylesheet; add a rule for a new platform if needed. The WeChat link opens the QR-code image directly, without a modal.

### Replace the CV PDF

Replace `assets/cv/xiao_cv.pdf`, or add `cv_link` to `profile.yml` to specify another path or external URL:

```yaml
cv_link: "/assets/cv/xiao_cv.pdf"
```

The homepage Services section reads the same `services` entries as the web CV, so updating them changes both pages.

The web CV and PDF are maintained separately and do not synchronize. Entries in `education`, `experience`, `awards`, `services`, `teaching`, and `skills` appear in YAML order; place newer entries first manually.

Education entries support `degree`, `school`, `logo`, `advisor`, and `period`. Experience entries support `role`, `institution`, `logo`, and `period`. Use the existing entries as examples for other sections.

## Add or Update a Publication

Create a Markdown file under `_publications/<year>/`, such as `_publications/2026/example-paper.md`:

```yaml
---
title: "Example Paper Title"
date: 2026-10-20
selected: true
venue: "Conference Name (CONF), 2026"
authors:
  - name: "Zhixiong Xiao"
    me: true
    star: true
  - name: "Coauthor Name"
    star: true
  - name: "Corresponding Author"
    hash: true
links:
  - text: "PDF"
    url: "/assets/pubs/example-paper.pdf"
  - text: "Slides"
    url: "/assets/slides/example-paper.pdf"
  - text: "Code"
    url: "https://github.com/owner/repository"
---
```

| Field | Behavior |
|---|---|
| `date` | Controls sorting and year grouping; use `YYYY-MM-DD` |
| `selected: true` | Also displays the paper under Selected Publications on Home |
| Omitted `selected` or `selected: false` | Displays the paper on Publications only |
| `venue` | Conference or journal name |
| `authors` | Displays authors in the specified order |
| `me: true` | Bolds that author's name |
| `star: true` | Adds `*` for equal contribution |
| `hash: true` | Adds `#` for a corresponding author |
| `links` | Displays icon buttons in the specified order; may be omitted or set to `[]` |

Home and Publications share the same paper styling: titles, authors, and venue names use Arial at 16px, with different font weights. Links use rounded outline buttons. `PDF` / `Paper`, `Code`, and `Slide` / `Slides` receive matching icons; other labels use a generic external-link icon.

Both lists sort by `date`, newest first. Directory names only organize files; displayed years come from `date`. Year links, anchors, and scroll highlighting are generated automatically.

Place PDFs and slides in the relevant asset directories before adding links. The `figure` field currently does not display a thumbnail, and the Markdown body is not rendered as an abstract. Edit a file to update a paper; delete it to remove the paper. Conference/journal type tags have not been implemented.

## Add News

Create a file in `_news/`:

```yaml
---
title: "Our paper was accepted to CONF 2026!"
date: 2026-10-20
---
```

News is sorted newest first and grouped by year. The year appears on the left, the announcement in the middle, and its date on the right. On mobile, the date moves below the announcement. News text is 17px and dates are 15px. Only `title` is displayed; the file body and `is_new` field are unused, and no automatic New badge is shown.

## Update Research Interests

Edit or add `_research/*.md`:

```yaml
---
title: "GPU RT Core Repurposing"
order: 1
desc: >-
  Repurposing ray tracing hardware for computations beyond graphics.
---
```

Topics are sorted by `order`, ascending; use distinct values. `desc` supports HTML, while the file body is unused. Bold text in topic titles and descriptions is black. The old `interests` tag lists are no longer displayed and do not need maintenance.

The research introduction in About Me is maintained separately in `profile.yml`; it is not generated from these topics.

## Update Beyond Content

Beyond is currently hidden from navigation but remains accessible at `/beyond`. Put photos in `images/gallery/` and activity files in `_beyond/`:

```yaml
---
title: "Conference Trip"
date: 2026-10-20
intro: >-
  A few photos from the trip.
photos:
  - src: "/images/gallery/example-1.jpg"
    alt: "Conference venue"
  - src: "/images/gallery/example-2.jpg"
    alt: "A walk after the conference"
---
```

Activities appear newest first. Only the metadata title, introduction, and `photos` are displayed. Provide a short `alt` description for each image. Activities without photos show a placeholder message.

## Customize Styles and Icons

Shared design variables are defined in `:root` in `assets/css/style.css`:

```css
:root {
  --bg: #fff;
  --ink: #242424;
  --accent: #79518a;
  --link: #79518a;
  --accent-wash: #f6f1f8;
  --page-width: 1360px;
  --page-inset: 40px;
  --body-size: 16px;
  --body-font: Arial, 'Helvetica Neue', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
```

This is an excerpt; do not replace the entire existing `:root` block with it.

- Desktop pages use a centered two-column layout, capped at 1360px, with a 240px sidebar and a 64px column gap.
- At 1100px and below, the sidebar and side padding shrink. At 680px and below, the sidebar and content stack vertically, as do the navigation logo and links.
- Main section headings use bold black Arial at 22.4px, with a light gray line to the right and no heading icons.
- Home body text is 17px; selected papers and Publications use 16px. CV primary text is approximately 16.3px, with 15px dates.
- The Research interests heading is 20px and topic descriptions are 17px. Topic tags are hidden.
- Links, paper buttons, and active navigation use purple accents. Sidebar email text and the CV button use gray; social icons use brand colors.
- Navigation text uses Inter at 15px and weight 500. Inter loads from Google Fonts and Font Awesome from a CDN, so restricted networks may affect their appearance.
- The circular portrait has a light gray dashed outline. The portrait, names, email, and copyright footer are centered.

Page-specific rules can override shared variables. Check `.home-page`, `.publications-page`, `.cv-page`, and `.beyond-page` when changing a particular page. Shared paper styling uses `.pub-*` selectors.

### Replace the ZX Mark

`images/logo.png` is used for both the favicon and the navigation logo. It currently contains a dark ZX mark on a transparent background. Replace this file to update both; use a square PNG with transparency. The current file is 512×512.

The navigation displays it at 56×56 on desktop and 48×48 on mobile, independent of the source image dimensions. On desktop, its container is centered above the sidebar portrait. Sidebar names still come from `profile.yml`.

The Chinese name uses system Kaiti/Songti fonts. The previous Long Cang web font and its file have been removed. Consistent rendering across devices would require a locally hosted web font.

## Publishing and Update Checks

A successful local build does not publish the site. Check Settings → Pages in the GitHub repository for the configured publishing source, then commit and push to the appropriate branch and inspect the deployment status. This repository has no additional Sites hosting configuration.

For each update:

1. Run `bundle exec jekyll build` to check YAML and Liquid templates.
2. Preview affected pages and verify text, author order, dates, and year navigation.
3. Check narrow screens for overflowing headings, sidebar content, and paper links.
4. Open new PDFs, slides, code links, QR codes, and photos; check path capitalization.
5. Run `git diff --check`, review `git diff`, and commit only the intended files.

Keep the surrounding `---` delimiters in content files and use spaces for YAML indentation. Quote text containing colons, use `>-` for multiline descriptions, and use unquoted `true` / `false` for booleans.

The `title` and `description` in `_config.yml` control the browser title and page meta description. Update them when personal details change: they do not synchronize with `profile.yml`. All pages currently share the same site title and description.

The current `baseurl` is empty, targeting a domain root. Although main navigation uses `relative_url`, profile content and publication links may still contain root-relative `/assets/...` or `/images/...` paths. Review these links when deploying under a project subpath.

## Project Structure

```text
academic-homepage/
├── _config.yml
├── Gemfile / Gemfile.lock
├── index.html
├── publications.html
├── cv.html                       # Hidden from navigation; still generated
├── beyond.html                   # Hidden from navigation; still generated
├── _layouts/default.html
├── _includes/
│   ├── profile.html
│   └── publication-link.html
├── _data/profile.yml
├── _publications/<year>/*.md
├── _news/*.md
├── _research/*.md
├── _beyond/*.md
├── assets/
│   ├── css/style.css
│   ├── cv/
│   ├── pubs/
│   └── slides/
├── images/
│   ├── logo.png
│   ├── portrait.jpg
│   ├── wechat.png
│   ├── badges/
│   └── gallery/
└── _site/                        # Generated output; do not edit directly
```

All four content collections use `output: false`: they supply data to the pages without generating a separate detail page for each Markdown file.
