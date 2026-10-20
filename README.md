# Zhixiong Xiao — Academic Homepage

A personal academic homepage built with Jekyll 4.4, Liquid templates, and plain CSS/JavaScript, intended for deployment on GitHub Pages. Routine content updates use YAML or Markdown files and do not require editing page templates.

## Local Preview

Requires Ruby >= 3.0 and Bundler. To get started:

```bash
bundle install
bundle exec jekyll serve
```

Open <http://localhost:4000>. While the server is running, content and style changes trigger automatic rebuilds; refresh your browser to see them. Restart the server after changing `_config.yml`.

If you see `Address already in use`, port 4000 is occupied. Open the existing preview or start on another port:

```bash
bundle exec jekyll serve --port 4001
```

Then open <http://localhost:4001>. Press `Ctrl+C` in the server terminal to stop it. If styles appear outdated, use `Ctrl+Shift+R` to force a browser refresh.

To build without starting a server:

```bash
bundle exec jekyll build
```

Generated files go into `_site/`. Do not edit them directly: the next build will overwrite them.

## Where to Make Changes

| Content | Location |
|---|---|
| Name, photo, biography, email, social links | `_data/profile.yml` |
| Education, experience, awards, service, teaching, skills | `_data/profile.yml`, displayed on the CV page |
| Publications | `_publications/year/*.md` |
| Homepage news | `_news/*.md` |
| Homepage research topics and tags | `_research/*.md` |
| Beyond activities and photos | `_beyond/*.md` |
| CV PDF | `assets/cv/xiao_cv.pdf` |
| Paper PDFs and slides | `assets/pubs/`, `assets/slides/` |
| Colors, fonts, corners, spacing, responsive layout | `assets/css/style.css` |
| Homepage structure | `index.html` |
| Publication list and year navigation | `publications.html` |
| CV and Beyond page structure | `cv.html`, `beyond.html` |
| Shared navigation, footer, font loading | `_layouts/default.html` |
| Site title, description, domain, collection settings | `_config.yml` |

## Add or Update a Publication

Copy an existing publication file into `_publications/year/` and give it a short descriptive filename, such as `_publications/2026/example-paper.md`:

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

Place the actual PDF and slides in the corresponding directories, then set their links. Add or remove entries in `links` as needed. If no links are available, omit the field or use `links: []`.

| Field | Current behavior |
|---|---|
| `title` | Paper title |
| `date` | Controls sorting and year grouping; use `YYYY-MM-DD` |
| `selected: true` | Also displays the paper under Selected Publications on the homepage |
| Omitted `selected` or `selected: false` | Displays the paper on the Publications page only |
| `venue` | Conference or journal name |
| `authors` | Displays authors in the order provided |
| `me: true` | Bolds that author's name |
| `star: true` | Adds `*` after the author's name for equal contribution |
| `hash: true` | Adds `#` after the author's name for a corresponding author |
| `links` | Displays links such as `[PDF]` and `[Code]` in the order provided |

Both pages sort papers by `date`, newest first. The Publications page generates its year navigation automatically. Directory names are for organization; the displayed year comes from `date`. Use unquoted boolean values `true` and `false`.

The `figure` field in some existing files is currently unused by the page templates and does not display a thumbnail. Markdown text after the second `---` is not displayed as an abstract either; the pages currently display only the metadata above.

To update or remove a paper, edit or delete its `.md` file. There is no need to maintain a separate list or year navigation.

## Personal Information and CV

Edit `_data/profile.yml`:

- `name`, `name_cn`: English and Chinese names.
- `photo`: Portrait path, such as `/images/portrait.jpg`. Set it to `""` to show a letter placeholder.
- `affiliation`, `school`: Position and institution on the homepage.
- `about_lead`: Optional introduction in larger text. `about_detail`: Detailed biography. Both fields are inserted as HTML and support tags such as `<strong>` and `<a>`.
- `email`: Used to generate the homepage email text and `mailto:` link.
- `links`: Social links. The `icon` field takes Font Awesome CSS classes, such as `fa-brands fa-github`, rather than emoji.
- `education`, `experience`, `awards`, `services`, `teaching`, `skills`: Corresponding CV sections. Entries appear in the order provided; place the newest entries first manually.

Education entries support `degree`, `school`, `logo`, `advisor`, and `period`. Experience entries support `role`, `institution`, `logo`, and `period`. Refer to existing entries for the other sections. The `pronouns` field is not currently displayed.

The homepage Curriculum Vitae link defaults to `/assets/cv/xiao_cv.pdf`. Replace that file to update the downloadable CV, or add `cv_link` to `profile.yml` to use another path or external URL. The web CV and PDF are maintained separately and do not synchronize automatically.

## Add News

Create `_news/2026-10-20-example.md`:

```yaml
---
title: "Our paper was accepted to CONF 2026!"
date: 2026-10-20
---
```

The homepage displays news newest first, grouped by year. It reads the text from `title`; the file body is not displayed. There is currently no automatic New badge, and `is_new` is not used.

## Update Research Topics

Add or edit a `.md` file in `_research/`:

```yaml
---
title: "GPU Acceleration"
order: 1
desc: "Using GPU hardware to accelerate general-purpose workloads."
interests:
  - "Computer Systems"
  - "High-Performance Computing"
---
```

The homepage sorts topics by `order` in ascending order; use distinct integers. The `interests` list is optional. The `desc` field supports HTML; the file body is not displayed.

## Add Beyond Activities and Photos

Place photos in `images/gallery/` and create `_beyond/2026-example.md`:

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

Activities appear newest first by `date`. Add images through the `photos` list and provide a brief description in `alt`. An activity without photos still displays its title, introduction, and a placeholder message. The file body is not displayed.

## Customize Styles

The `:root` block at the top of `assets/css/style.css` defines shared visual settings. Current key values include:

```css
:root {
  --bg:         #f4f6f8; /* Page background */
  --surface:    #ffffff; /* Card background */
  --ink:        #16162a; /* Primary text */
  --accent:     #3b6fa0; /* Interactive accent */
  --link:       #2f6fa8; /* Links */
  --rose:       #9b5ea7; /* Section headings */
  --radius:     14px;    /* Main card corner radius */
}
```

This is an excerpt; do not replace the entire `:root` block with it. The site uses a blue and purple palette, light card shadows, and thin separators between publications. The layout template loads Inter and Newsreader fonts and Font Awesome icons.

## Publishing and Update Checks

If GitHub Pages is configured for the repository, commit and push changes to the branch used for publishing, then check the repository's deployment status. Refer to Settings → Pages for the actual deployment branch and source. Building locally does not publish the site.

For each update:

1. Run `bundle exec jekyll build` to check for YAML or template errors.
2. Preview the affected pages locally and check text, dates, author order, and mobile layout.
3. Open new PDF, code, slide, and image links to verify that files exist and paths match their capitalization.
4. Review `git diff` to confirm the intended changes before committing and pushing.

Keep the two `---` lines surrounding each content file's YAML metadata. Use spaces for indentation. Quote titles or descriptions containing colons; use `>-` for multiline text.

The current `baseurl` is empty, and templates contain root-relative links such as `/publications`, so the site is intended to be hosted at a domain root. Moving to a subpath such as `/repo-name/` requires reviewing navigation and content links as well as changing `baseurl`.

## Project Structure

```text
academic-homepage/
├── _config.yml
├── Gemfile / Gemfile.lock
├── index.html
├── publications.html
├── cv.html
├── beyond.html
├── _layouts/default.html
├── _data/profile.yml
├── _publications/year/*.md
├── _news/*.md
├── _research/*.md
├── _beyond/*.md
├── assets/
│   ├── css/style.css
│   ├── cv/
│   ├── pubs/
│   └── slides/
├── images/
└── _site/                  # Generated build output
```

All four content collections use `output: false`: they supply data to the pages and do not generate individual detail pages for each Markdown file.
