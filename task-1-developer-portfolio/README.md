# Nagaraju Bhargav — Developer Portfolio

A responsive, animated portfolio built with React + Vite. Includes a purple-accented dark theme, light-theme toggle, mobile navigation, project detail modals, skills, resume link, and contact links.

## Requirements

- Node.js 20.19+ or 22.12+ recommended
- npm
- Git (for deployment)

## Run locally

```bash
# 1. Extract this project and open the folder in VS Code
cd nagaraju-bhargav-portfolio

# 2. Install packages
npm install

# 3. Start the development server
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## Before publishing — personalize these values

In `src/App.jsx`:
- Replace `your.email@example.com` with your real public contact email.
- Replace the generic GitHub and LinkedIn URLs with your profiles.
- In the `projects` array, replace sample GitHub links with the correct project repository URLs and add live-demo URLs if available.
- Review the project descriptions and technology tags so they accurately reflect what you implemented.

Add your resume PDF at `public/resume.pdf`. The resume button links to that path. Do not publish personal phone numbers or private information unless you intend them to be public.

## Verify production build

```bash
npm run build
npm run preview
```

Vite writes the production site to `dist/`.

## Deploy to Vercel

### Option A — GitHub import (recommended)

1. Create a new GitHub repository, for example `nagaraju-bhargav-portfolio`.
2. Push this project:

```bash
git init
git add .
git commit -m "Build developer portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/nagaraju-bhargav-portfolio.git
git push -u origin main
```

3. Sign in at https://vercel.com/ and choose **Add New → Project**.
4. Import your GitHub repository.
5. Vercel should detect Vite. Use:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
6. Select **Deploy**. Vercel provides a live URL.
7. Later pushes to the connected branch trigger deployments automatically.

### Option B — Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. For a production deployment:

```bash
vercel --prod
```

## Project structure

```text
nagaraju-bhargav-portfolio/
├── index.html
├── package.json
├── README.md
├── public/
│   └── (put resume.pdf here)
└── src/
    ├── App.jsx
    ├── main.jsx
    └── styles.css
```

## Features

- Mobile-first responsive layout with CSS Grid and Flexbox
- Persistent dark/light theme preference via localStorage
- Mobile hamburger navigation
- Smooth in-page navigation and reduced-motion support
- Accessible project dialogs (Escape key and backdrop close)
- Responsive skill and project cards
- Resume download link and contact shortcuts
- No backend or environment variables required

## Notes

The contact email and profile links are placeholders. Project performance claims are intentionally omitted; add metrics only when you have verified results. This is a frontend-only portfolio.
