# Phebian Chukwurah - Personal Website

This is my personal website built with Next.js, featuring a blog with markdown support and a modern, responsive design.

## Features

- **Next.js 14** - React framework with static site generation
- **Markdown Blog** - Write posts in markdown with frontmatter
- **Responsive Design** - Works on all devices
- **Dark/Light Theme** - Toggle between themes
- **Tag System** - Organize posts with tags
- **SASS Modules** - Scoped styling with CSS modules
- **Static Generation** - Fast, SEO-friendly static pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-site
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── content/
│   └── posts/          # Markdown blog posts
├── src/
│   ├── assets/
│   │   ├── images/     # Static images
│   │   └── style/      # SASS styles and variables
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   └── pages/         # Next.js pages
├── public/            # Static assets
└── package.json
```

## Adding Blog Posts

1. Create a new markdown file in `content/posts/`
2. Add frontmatter with metadata:

```markdown
---
title: Your Post Title
date: 2024-01-01
tags: ['Tag1', 'Tag2']
description: "Brief description of your post"
---

Your post content here...
```

3. The post will automatically appear on the blog page and be accessible at `/your-post-slug`

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js** - React framework
- **React** - UI library
- **SASS** - CSS preprocessor
- **Gray Matter** - Frontmatter parsing
- **Remark** - Markdown processing
- **Date-fns** - Date formatting

## License

This project is open source and available under the [MIT License](LICENSE).
