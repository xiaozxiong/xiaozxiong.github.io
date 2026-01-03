export const profile = {
	fullName: 'Zhixiong Xiao',
	title: '',
	institute: '',
	author_name: 'Zhixiong Xiao', // Author name to be highlighted in the papers section
	research_areas: [
		{ title: 'Computer Science', description: 'Brief description of the research interest', field: 'physics' },
	],
}

// Set equal to an empty string to hide the icon that you don't want to display
export const social = {
	email: 'xiaozx@sdu.edu.cn',
	linkedin: '',
	x: 'https://x.com/Alan72599473',
	github: 'https://github.com/xiaozxiong',
	gitlab: 'https://gitlab.com/xiaozhxiong',
	scholar: 'https://scholar.google.com/citations?user=5b52JIQAAAAJ&hl=zh-CN',
	inspire: '',
	arxiv: '',
	orcid: 'https://orcid.org/my-orcid?orcid=0009-0004-7296-9504',
}

export const template = {
	website_url: 'https://xiaozxiong.github.io', // Astro needs to know your site’s deployed URL to generate a sitemap. It must start with http:// or https://
	menu_left: false,
	transitions: true,
	lightTheme: 'light', // Select one of the Daisy UI Themes or create your own
	darkTheme: '', // Select one of the Daisy UI Themes or create your own
	excerptLength: 200,
	postPerPage: 5,
    base: '' // Repository name starting with /
}

export const seo = {
	default_title: 'Astro Academia',
	default_description: 'Astro Academia is a template for academic websites.',
	default_image: '/images/astro-academia.png',
}
