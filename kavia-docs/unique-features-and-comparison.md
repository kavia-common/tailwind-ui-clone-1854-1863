# Unique Features & Comparison

## Unique Features

- React + Tailwind stack with live previews
  - Built with Create React App, React Router, and Tailwind utilities; preview any component or block in a real React runtime.
  - Preview cards include Preview/Code tabs with smooth transitions and Ocean-themed surfaces.

- Toggleable, syntax‑highlighted code viewer
  - Integrated CodeViewer uses PrismJS for JSX/HTML highlighting.
  - Copy-to-clipboard with graceful fallback; optional initially-open state for faster inspection.

- Side-by-side library navigation
  - Fixed top navbar and persistent collapsible left sidebar for Components and UI Blocks pages.
  - URL-driven selection and deep-linkable items for predictable navigation.

- Code snippets derived from previews
  - PreviewCard auto-derives section-only HTML snippets when possible and falls back to a themed scaffold for clarity.
  - Clear separation between live JSX preview and extracted HTML code for easy copy/paste.

- Ocean Professional theme
  - Consistent blue/amber accents, soft shadows, and subtle gradients.
  - Ready-to-use utilities (e.g., bg-ocean-primary, text-ocean-primary, shadow-soft, bg-ocean-gradient) and CSS variables for theming in src/index.css.

- Responsive and accessible by default
  - Layout adapts across breakpoints; keyboard-focusable controls; semantic headings and buttons in demos.

- Tailwind CLI guidance page
  - An Installation page demonstrates a minimal Tailwind CLI workflow with concise steps and code blocks, complementing the CRA + PostCSS setup in this app.

## How This Differs From Other Tools

- Versus Tailwind CSS
  - Tailwind CSS is a utility-first CSS framework; it doesn’t provide React pages, previews, or code viewers.
  - This app is a working React UI library experience that uses Tailwind utilities to render live examples and extract shareable snippets.

- Versus Tailwind UI
  - Tailwind UI is a commercial set of professionally designed components and templates.
  - This app is an open sample library focused on the developer experience: live React previews, toggleable code, and Ocean Professional theme, not a commercial component pack.

- Versus Tailwind Plus
  - Tailwind Plus (third-party packs) typically provide component collections or templates.
  - This app delivers an interactive browsing experience with routing, collapsible sidebars, and a code viewer integrated into each preview card.

- Versus Preline
  - Preline is a component library built on Tailwind with ready-made UI pieces.
  - This app emphasizes a demo-workbench approach: live previews, preview-to-code flow, and a focused Ocean Professional aesthetic within a CRA environment.

- Bottom line
  - Use this app when you want a self-contained, React-powered playground with instant visual feedback, copyable HTML/JSX, and a consistent Ocean theme.
  - Reach for Tailwind CSS/Preline/Tailwind UI/Tailwind Plus when you need frameworks, production-grade component packs, or design systems to import—not an interactive preview and code inspection environment.

## Scope & Environment

- Context: React + Tailwind within a CRA project; Tailwind picked up via PostCSS; PrismJS for code highlighting.
- Pages: Home, Components, UI Blocks, Installation.
- Environment variables (optional): REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV (no hard-coded ports).
- Theme: Ocean Professional (primary #2563EB, secondary/success #F59E0B, error #EF4444, background #f9fafb, surface #ffffff, text #111827).
