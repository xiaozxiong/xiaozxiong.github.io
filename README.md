# Zhixiong Xiao — Academic Homepage

Personal academic homepage built with **Jekyll**, deployed on **GitHub Pages**.

Design inspired by [jinghanyang.com](https://jinghanyang.com).

## Quick Start

### Prerequisites

- Ruby >= 3.0
- Bundler (`gem install bundler`)

### Local Development

```bash
cd academic-homepage

# Install dependencies
bundle install

# Start dev server (auto-reload on changes)
bundle exec jekyll serve

# Or build to _site/ directory
bundle exec jekyll build
```

Open <http://localhost:4000> in your browser.

### Deploy to GitHub Pages

1. Create a repository named **`xiaozxiong.github.io`** on GitHub
2. Push this project to the repo:

```bash
git init
git add -A
git commit -m "Initial commit"
git remote add origin git@github.com:xiaozxiong/xiaozxiong.github.io.git
git push -u origin main
```

3. Go to **Settings → Pages** → set source to `main` branch (root directory)
4. Done — your site is live at `https://xiaozxiong.github.io`

> GitHub Pages auto-detects Jekyll and builds the site on every push. No CI config needed.

---

## Maintaining Your Homepage

| Content | Where to edit |
|---------|--------------|
| Name, photo, about, research, experience, education, awards, teaching, news | [`_data/profile.yml`](_data/profile.yml) |
| Publications | [`_publications/`](_publications/) — one `.md` per paper |
| Colors & fonts | [`assets/css/style.css`](assets/css/style.css) (`:root` block) |
| Layout / sections | [`index.html`](index.html) + [`_layouts/default.html`](_layouts/default.html) |

### Your Photo

```yaml
# _data/profile.yml
photo: "/images/portrait.jpg"    # put the file in images/
```

Leave `""` to show your initial instead.

### Contact Links

```yaml
links:
  - icon: "✉️"
    text: "your@email.com"
    url: "mailto:your@email.com"
  - icon: "🐙"
    text: "GitHub"
    url: "https://github.com/xiaozxiong"
```

Add, remove, or reorder entries. The `icon` can be any emoji.

### About & Research

```yaml
about_lead: >-
  One-sentence research summary (displayed in larger text).

about_detail: >-
  Full paragraph with links to labs, advisors, institutions.

research_desc: >-
  Broader context for your research area.

interests:
  - "Topic One"
  - "Topic Two"
```

### Publications

Each paper is a markdown file in `_publications/{year}/`. Create a new file like `_publications/2026/my-paper.md`:

```yaml
---
title: "Your Paper Title"
date: 2026-01-15
selected: true                     # show on homepage (optional)
venue: "CONFERENCE 2026"
figure: ""                          # optional: /images/pubs/fig.png
authors:
  - name: "Zhixiong Xiao"
    me: true                        # bold your name
    # star: true                    # show * for equal contribution
    # hash: true                    # show # for corresponding author
  - name: "Coauthor Name"
links:
  - text: "PDF"
    url: "/assets/pubs/paper.pdf"
  - text: "Code"
    url: "https://github.com/..."
---

Optional abstract (not displayed on homepage).
```

| Field | Description |
|-------|-------------|
| `date` | Sort key — newest first. Use `YYYY-MM-DD` format |
| `selected: true` | Shows this paper on the homepage |
| `me: true` | Highlights that author in bold |
| `star: true` | Shows <span style="color:#9b5ea7">\*</span> after the name (equal contribution) |
| `hash: true` | Shows <span style="color:#3b6fa0">#</span> after the name (corresponding author) |
| `figure` | Thumbnail image path. Leave `""` for a placeholder icon |
| `links` | Displayed as `[PDF]` `[Code]` badges |

**To add a new paper:** drop a `.md` file in the right year folder — no other changes needed.

### Experience

```yaml
experience:
  - role: "Research Intern"
    institution: "Company / Lab"
    period: "Jun 2025 – Sep 2025"
```

### Education

```yaml
education:
  - degree: "Ph.D. in Computer Science"
    school: "University Name"
    period: "2026 – Present"
```

List newest first.

### Awards

```yaml
awards:
  - name: "Award Name"
    date: "Nov 2023"
```

### Teaching

```yaml
teaching:
  - role: "Teaching Assistant — Course Name"
    school: "University"
    period: "Fall 2024"
```

### News

```yaml
news:
  - date: "Jul 2026"
    text: "Started my PhD at OSU! 🎉"
```

The first entry automatically gets a **"New"** badge. To suppress it:

```yaml
  - date: "Jul 2026"
    text: "No badge here."
    is_new: false
```

### Photo Gallery (Beyond Research)

Uncomment the `beyond` section in `_data/profile.yml`:

```yaml
beyond:
  intro: >-
    Beyond research, I enjoy hiking, photography, and cooking.
  photos:
    - src: /images/gallery/photo1.jpg
      alt: "Hiking"
    - src: /images/gallery/photo2.jpg
      alt: "Lab dinner"
```

Hides automatically when commented out or when `photos` is empty.

---

## Adding Images

```bash
mkdir -p images/pubs images/gallery
```

```
images/
├── portrait.jpg           # profile photo
├── pubs/
│   └── paper-figure.png   # publication thumbnails
└── gallery/
    ├── photo1.jpg
    └── photo2.jpg
```

Reference them as `/images/portrait.jpg` in `_data/profile.yml` or `_publications/*.md`.

---

## Design Customization

All visual settings are in [`assets/css/style.css`](assets/css/style.css):

```css
:root {
  --bg:         #f4f6f8;    /* page background */
  --surface:    #ffffff;    /* card background */
  --ink:        #1a1a2e;    /* main text */
  --accent:     #3b6fa0;    /* accent color */
  --link:       #2f6fa8;    /* hyperlink color */
  --rose:       #9b5ea7;    /* section heading color */
  --radius:     18px;       /* card corner radius */
}
```

---

## Project Structure

```
academic-homepage/
├── _config.yml
├── Gemfile
├── index.html                   # homepage template
├── _layouts/
│   └── default.html             # HTML shell + nav + sidebar
├── _data/
│   └── profile.yml              # personal info (edit this)
├── _publications/
│   ├── 2022/
│   │   └── palette.md
│   ├── 2025/
│   │   └── sigmetrics25-rtgraph.md
│   └── 2026/
│       ├── gas.md
│       └── pars.md
├── assets/
│   └── css/
│       └── style.css
└── images/                      # create this, not tracked by git
```

---

## Tech Stack

- **Jekyll 4.4** — static site generator
- **GitHub Pages** — free hosting, auto-builds on push
- **Inter** — typeface from Google Fonts
- **Liquid** — templating (Jekyll's native engine)
- **Vanilla JS** — only ~20 lines for nav scroll tracking
