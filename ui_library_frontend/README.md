# Ocean UI Library (React + Tailwind)

A Tailwind UI-like library built with Create React App and Tailwind CSS (via PostCSS). Features a fixed top navbar, three pages (Home, Components, UI Blocks), persistent collapsible left sidebar, preview cards, and toggleable code viewers with syntax highlighting.

## Scripts

- `npm start` – Start development server on port 3000
- `npm test` – Run tests
- `npm run build` – Build production bundle

No manual tailwind CLI invocation is needed; react-scripts picks up Tailwind via postcss.config.js.

## Theming

Ocean Professional theme:
- Primary: `#2563EB`
- Secondary/Success: `#F59E0B`
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`

Tailwind utilities and a subtle gradient are used for accents.

## Environment Variables

The app safely reads these if provided:
REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV

No ports are hard-coded; use REACT_APP_API_BASE for any API base URL.

## Structure

- `src/pages`: Home, ComponentsLibrary, BlocksLibrary
- `src/components`: Navbar (in App), Sidebar, PreviewCard, CodeViewer, samples

