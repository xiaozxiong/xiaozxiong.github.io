# Zhixiong Xiao — Academic Homepage

基于 Jekyll 4.4、Liquid 和原生 CSS/JavaScript 的个人学术主页，用于部署到 GitHub Pages。日常更新主要编辑 YAML 和 Markdown，不需要修改页面模板。

## 本地预览与构建

需要 Ruby 3.0 或更新版本，以及 Bundler。在项目根目录运行：

```bash
bundle install
bundle exec jekyll serve
```

打开 <http://127.0.0.1:4000/>。服务运行期间，内容和样式修改通常会自动触发构建；刷新浏览器查看。修改 `_config.yml` 后需要重启服务。

如果端口被占用，先确认是否已有预览服务，或者换一个端口：

```bash
bundle exec jekyll serve --port 4001
```

对应地址为 <http://127.0.0.1:4001/>。在服务终端按 `Ctrl+C` 停止预览。

只构建、不启动服务：

```bash
bundle exec jekyll build
```

构建输出在 `_site/`。不要直接编辑这个目录，下一次构建会重新生成文件。README 已从站点输出中排除。

样式文件、网站图标和导航 Logo 的地址包含构建时间版本号，便于更新缓存。如果仍显示旧样式，先确认预览服务使用的是当前项目，再尝试 `Ctrl+Shift+R` 强制刷新。仅修改文件不会更新已经部署的线上网站。

## 当前页面与导航

| 页面 | 本地地址 | 当前状态 |
|---|---|---|
| Home | `/` | 导航可见，包含 About Me、Research interests、News 和 Selected Publications |
| Publications | `/publications` | 导航可见，按年份排列论文，带年份跳转和滚动高亮 |
| CV | `/cv` | 已隐藏导航入口，页面仍会生成，可直接访问 |
| Beyond | `/beyond` | 已隐藏导航入口，页面仍会生成，可直接访问 |

所有页面共用个人信息栏、顶部导航和居中页脚。隐藏 CV 页面入口不会影响个人信息栏中的 Curriculum Vitae PDF 下载链接。

### 恢复隐藏的导航入口

在 `_layouts/default.html` 的 `<nav class="nav-links">` 中添加对应链接：

```liquid
<a href="{{ '/cv' | relative_url }}" class="nav-item" {% if page.url contains 'cv' %}aria-current="page"{% endif %}>CV</a>
<a href="{{ '/beyond' | relative_url }}" class="nav-item" {% if page.url contains 'beyond' %}aria-current="page"{% endif %}>Beyond</a>
```

删除导航链接只会隐藏入口，不会禁止访问原地址。如果需要停止生成页面，可在 `_config.yml` 的 `exclude` 列表中添加 `cv.html` 或 `beyond.html`，然后重启并重新构建。已经下载或被缓存的内容不会因此收回。

## 常用修改位置

| 要修改的内容 | 文件或目录 |
|---|---|
| 姓名、头像、身份、学校、邮箱、个人介绍、社交链接 | `_data/profile.yml` |
| 教育、经历、奖项、服务、教学、技能 | `_data/profile.yml`，由 `cv.html` 展示 |
| 研究方向 | `_research/*.md` |
| 新闻 | `_news/*.md` |
| 论文 | `_publications/<year>/*.md` |
| Beyond 活动与图片说明 | `_beyond/*.md` |
| 头像 | `images/portrait.jpg`，或修改 `profile.yml` 中的 `photo` |
| 导航 Logo 与浏览器图标 | `images/logo.png` |
| 微信二维码 | `images/wechat.png` |
| 下载版 CV | `assets/cv/xiao_cv.pdf` |
| 论文 PDF / Slides | `assets/pubs/`、`assets/slides/` |
| 字体、颜色、间距、响应式布局 | `assets/css/style.css` |
| 共享个人信息栏 | `_includes/profile.html` |
| 论文链接按钮与图标 | `_includes/publication-link.html` |
| 首页结构 | `index.html` |
| 论文列表、年份导航与高亮逻辑 | `publications.html` |
| 导航、页脚、外部字体与图标库 | `_layouts/default.html` |
| 网站名称、描述、域名、集合配置 | `_config.yml` |

## 更新个人信息

编辑 `_data/profile.yml`：

- `name`、`name_cn`：信息栏中的英文名和中文名。中文名优先使用系统楷体，回退到宋体等衬线字体，实际字形随设备变化。
- `photo`：圆形头像的图片路径。设为 `""` 时显示英文名首字母占位。
- `affiliation`、`school`：身份和学校，分别显示在独立行。
- `email`：显示邮箱文字并生成 `mailto:` 链接，当前不显示邮箱图标。
- `about_detail`：About Me 正文，支持 `<strong>`、`<a>` 等 HTML。链接显示下划线，加粗文字为黑色。
- `about_lead`：可选的较大字号引言；当前未启用。
- `links`：社交链接。显示顺序与 YAML 顺序一致；当前微信排在最后。
- `pronouns`：当前模板未展示这个字段。

### 社交图标

社交链接显示为横向排列的品牌图标，不显示文字；`text` 用于悬停提示和无障碍名称，仍需填写。例如：

```yaml
links:
  - icon: "fa-brands fa-github"
    text: "GitHub"
    url: "https://github.com/your-account"
  - icon: "fa-brands fa-weixin"
    text: "WeChat"
    url: "/images/wechat.png"
```

`icon` 使用 Font Awesome 类名。现有平台配色在 CSS 的 `.id-links .fa-*` 规则中定义；新平台可按需添加颜色规则。微信链接当前直接打开二维码图片，没有弹窗交互。

### 更换 CV PDF

替换 `assets/cv/xiao_cv.pdf`，或在 `profile.yml` 中添加 `cv_link` 指定其他路径或外部 URL：

```yaml
cv_link: "/assets/cv/xiao_cv.pdf"
```

网页 CV 与 PDF 独立维护，不会自动同步。`education`、`experience`、`awards`、`services`、`teaching`、`skills` 的条目按 YAML 中的顺序显示，应手动把新内容放在前面。

教育条目支持 `degree`、`school`、`logo`、`advisor`、`period`；经历条目支持 `role`、`institution`、`logo`、`period`。其他字段可参照现有条目。

## 添加或修改论文

在 `_publications/<year>/` 创建 Markdown 文件，例如 `_publications/2026/example-paper.md`：

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

| 字段 | 用途 |
|---|---|
| `date` | 决定排序和年份分组，使用 `YYYY-MM-DD` |
| `selected: true` | 同时显示在首页 Selected Publications |
| 不填 `selected` 或设为 `false` | 只显示在 Publications 页面 |
| `venue` | 会议或期刊名称 |
| `authors` | 按所填顺序显示作者 |
| `me: true` | 加粗该作者姓名 |
| `star: true` | 姓名后加 `*`，表示共同贡献 |
| `hash: true` | 姓名后加 `#`，表示通讯作者 |
| `links` | 按所填顺序显示图标按钮，可省略或设为 `[]` |

首页与完整列表共用论文条目样式：标题、作者、会议名称均为 Arial 16px，通过字重区分层级。链接使用圆角描边按钮；`PDF` / `Paper`、`Code`、`Slide` / `Slides` 会匹配对应图标，其他名称使用通用外链图标。

两个列表都按 `date` 降序排列。目录年份仅用于整理文件，实际显示年份来自 `date`。年份导航、锚点和当前年份高亮自动生成，不需要手动维护。

把 PDF、Slides 放进相应资源目录，再填写路径。`figure` 字段目前不展示缩略图，文件正文也不作为摘要显示。更新论文直接修改文件，删除论文则删除对应 Markdown 文件。

## 添加新闻

在 `_news/` 创建文件：

```yaml
---
title: "Our paper was accepted to CONF 2026!"
date: 2026-10-20
---
```

新闻按日期降序排列、按年份分组。年份在左侧、内容在中间、日期在右侧；手机端日期放到内容下方。新闻正文为 17px，日期为 15px。只显示 `title`，文件正文和 `is_new` 字段不参与展示，没有自动 New 标记。

## 更新 Research interests

编辑或新增 `_research/*.md`：

```yaml
---
title: "GPU RT Core Repurposing"
order: 1
desc: >-
  Repurposing ray tracing hardware for computations beyond graphics.
---
```

方向按 `order` 升序排列，建议使用不重复的整数。`desc` 支持 HTML，文件正文不展示。当前标题和说明中的加粗文字均为黑色，旧文件里的 `interests` 标签字段已不再显示，无需维护。

About Me 的研究介绍在 `profile.yml` 中单独维护，不会从这些研究方向自动汇总。

## 更新 Beyond 内容

Beyond 当前隐藏导航入口，但仍可通过 `/beyond` 访问。图片放在 `images/gallery/`，活动文件放在 `_beyond/`：

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

活动按日期降序排列，只展示元数据中的标题、介绍和 `photos`。图片应填写简洁的 `alt` 描述。没有照片的活动会显示占位提示。

## 调整样式与图标

主要设计变量在 `assets/css/style.css` 的 `:root` 中：

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

这是变量节选，不要整段覆盖现有 `:root`。

- 桌面端采用居中双栏：左侧信息栏 240px，栏间距 64px；最大页面宽度 1360px。
- 1100px 以下缩小侧栏和留白；680px 以下改为上下排列，Logo 与导航也上下排列。
- 页面主标题使用 Arial 22.4px、黑色加粗，右侧带浅灰色横线，没有标题图标。
- Home 正文为 17px，精选论文与 Publications 保持 16px；CV 主要文字约 16.3px、日期 15px。
- Research interests 为 20px，方向说明为 17px，不展示标签。
- 链接、论文按钮和导航高亮使用紫色；个人信息栏的邮箱和 CV 按钮使用灰色，社交图标使用品牌配色。
- 导航文字单独使用 Inter 15px、字重 500。Inter 从 Google Fonts 加载，Font Awesome 从 CDN 加载，网络不可用时可能影响字体或图标显示。
- 个人信息栏头像为圆形，带浅灰色虚线外框。头像、姓名和邮箱居中；版权页脚也居中。

局部规则可能覆盖全局变量。调整某页时，优先检查 `.home-page`、`.publications-page`、`.cv-page`、`.beyond-page` 下的规则；共用论文条目则检查 `.pub-*`。

### 更换 ZX 标识

`images/logo.png` 同时用于浏览器图标和左上角导航 Logo，当前是透明背景、深色 ZX 图形。替换这个文件即可同步更新，建议保留正方形 PNG 和透明通道，当前尺寸为 512×512。

导航显示尺寸为桌面 56×56、手机 48×48，不等于图像文件本身的尺寸。桌面端标识区域与下方头像居中对齐。个人信息栏英文名和中文名仍来自 `profile.yml`。

中文名当前使用系统楷体/宋体字体栈，不再加载龙藏体；旧字体文件已删除。若要求不同设备完全一致，需要另行配置本地 Web 字体。

## 发布与更新检查

本地构建成功不代表已经发布。先到 GitHub 仓库的 Settings → Pages 确认当前发布来源，再提交并推送到对应分支，查看部署状态。这里没有额外的 Sites 托管配置。

每次修改后建议：

1. 运行 `bundle exec jekyll build`，确认 YAML 和 Liquid 模板没有错误。
2. 预览受影响页面，核对文字、作者顺序、日期和年份导航。
3. 查看窄屏布局，确认标题、侧栏和论文链接没有溢出。
4. 打开新增的 PDF、Slides、代码链接、二维码和照片，检查路径及大小写。
5. 运行 `git diff --check` 并查看 `git diff`，只提交本次需要的文件。

YAML 前后保留 `---`，使用空格缩进。含冒号的文本建议加引号，多行介绍使用 `>-`。布尔值使用不带引号的 `true` / `false`。

`_config.yml` 中的 `title` 和 `description` 用于浏览器标题和页面元描述，应随个人身份变化更新；它们不会自动从 `profile.yml` 同步。目前各页共用同一套网站标题和描述。

当前 `baseurl` 为空，目标部署在域名根目录。虽然主要导航使用 `relative_url`，个人内容和论文资源中仍可能存在 `/assets/...`、`/images/...` 等根路径；改为项目子路径部署时，需要同时检查这些内容链接。

## 项目结构

```text
academic-homepage/
├── _config.yml
├── Gemfile / Gemfile.lock
├── index.html
├── publications.html
├── cv.html                       # 导航隐藏，页面仍生成
├── beyond.html                   # 导航隐藏，页面仍生成
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
└── _site/                        # 自动生成，不要直接编辑
```

四个内容集合均配置为 `output: false`：它们向页面提供数据，不为每个 Markdown 文件单独生成详情页。
