# Yash Gupta — Portfolio

A premium, product-style software engineer portfolio built with React, Vite, Tailwind CSS, and Framer Motion. Inspired by the design language of Vercel, Linear, GitHub, and Apple: dark, minimal, purposeful.

## Tech Stack

- React 18 (JavaScript, no TypeScript)
- Vite
- React Router v6
- Tailwind CSS
- Framer Motion
- React Icons
- EmailJS (contact form, no backend required)

## Folder Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer, Button, SectionHeading, ProjectCard, SkillCard, Timeline
│   └── sections/        # Hero, About, Skills, Projects, Experience, Achievements, Leadership, Contact
├── pages/
│   ├── Home.jsx                 # assembles all sections
│   ├── ProjectDetails.jsx        # case-study page per tech project
│   └── ProjectArchitecture.jsx    # deep-dive architecture page (flagship project)
├── data/                # projects.js, skills.js, experience.js, achievements.js
├── constants/            # site-wide links, nav items, EmailJS config, animation variants
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

```bash
npm install
npm run dev
```

The site runs at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview   # preview the production build locally
```

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), click **New Project**, and import the repo.
3. Vercel auto-detects Vite — leave the build command as `npm run build` and the output directory as `dist`.
4. Deploy. Every push to your main branch will trigger a new deployment.

Alternatively, from the CLI:

```bash
npm install -g vercel
vercel
```

## Customization Guide

### 1. Replace placeholder links

Search the project for any string starting with `FILL_` and replace it with your real value. The main ones live in `src/constants/index.js`:

```js
export const SOCIAL_LINKS = {
  github: 'FILL_GITHUB_LINK',       // → your GitHub profile URL
  linkedin: 'FILL_LINKEDIN_LINK',    // → your LinkedIn profile URL
  leetcode: 'FILL_LEETCODE_LINK',     // → your LeetCode profile URL
  resume: 'FILL_RESUME_LINK',          // → a hosted PDF (e.g. from /public or Google Drive)
  email: 'engineeryash0995@gmail.com',
}
```

Project-level GitHub/demo links live in `src/data/projects.js` (`FILL_GITHUB_PLACEMENT`, `FILL_PLACEMENT_DEMO`, etc.) — replace each with the real repository and deployment URLs.

### 2. Configure EmailJS (contact form)

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an email service and a template with `name`, `email`, `subject`, and `message` variables.
3. Copy your Service ID, Template ID, and Public Key into `src/constants/index.js`:

```js
export const EMAILJS_CONFIG = {
  serviceId: 'FILL_EMAILJS_SERVICE_ID',
  templateId: 'FILL_EMAILJS_TEMPLATE_ID',
  publicKey: 'FILL_EMAILJS_PUBLIC_KEY',
}
```

### 3. Update resume

Add your resume PDF to `public/` (e.g. `public/resume.pdf`) and set `SOCIAL_LINKS.resume` to `/resume.pdf`, or link to an external hosted file.

### 4. Add real project screenshots

`src/pages/ProjectDetails.jsx` and `src/pages/ProjectArchitecture.jsx` include placeholder screenshot blocks. Drop images into `src/assets/images/`, import them, and render them in place of the dashed placeholder boxes.

### 5. Edit content

All copy lives in `src/data/*.js` and inline in the section components under `src/components/sections/`. Nothing is hardcoded outside of these — update the data files first before touching components.

## Notes

- The Projects section includes a "System Architecture" deep-dive page for the flagship Campus Placement Management System project (`/project/placement-system/architecture`), covering authentication flow, database schema, API design, folder structure, and key engineering trade-offs — useful to link directly in interviews.
- Reduced-motion preferences are respected site-wide via a `prefers-reduced-motion` media query in `index.css`.
- All interactive elements have visible keyboard focus states for accessibility.
