# Full Feature List

## Core Experience
The UI Library delivers a Tailwind UI–like experience with live component and block previews, concise code examples, and a fast, responsive interface. Built with React (Create React App) and Tailwind CSS, it emphasizes minimalism, smooth interactions, and a polished Ocean Professional theme across pages and components.

- Built with React using Create React App; client-side routing via react-router-dom
- Tailwind CSS integrated through PostCSS; theme extensions configured in tailwind.config.js
- Fixed top navbar with active route highlighting and gradient background
- Three main pages: Home, Component Library, and UI Blocks
- Live Preview + Code tabs through reusable PreviewCard and CodeViewer components
- Accessible, keyboard-friendly controls and consistent focus states
- Minimalistic design with rounded corners, soft shadows, and subtle gradients

## Navigation & Discovery
Navigation is optimized around a fixed top navbar and a left sidebar for category browsing. The app syncs selection state to the URL to enable shareable deep links.

- Top navbar: always visible; highlights the active route (Home, Components, UI Blocks, Installation)
- Left sidebar: collapsible and category-driven; supports both flat and grouped category data structures
- URL query parameter syncing: selected items use ?item=<slug> for Components and Blocks pages
- Smooth scroll-to-top behavior on selection changes for focused content viewing

## Component Previews
Previews are presented in cards with a uniform look and feel, using the Ocean theme and utilities for spacing, typography, and elevation cues.

- Preview cards (PreviewCard) with title/description, tabbed Preview/Code interface
- Live component previews using JSX or generated demo sections
- Ocean-themed containers with rounded-2xl borders, soft shadows, and gradient backdrops
- Demo pages for Buttons and Tables, plus additional previews cataloged via uiCatalog.js

## Code Viewing & Copy
Code interactions are simple and reliable, leveraging PrismJS for client-side syntax highlighting and a robust copy mechanism.

- Toggleable code viewer (CodeViewer) with “Show/Hide code” controls per card
- Syntax highlighting via PrismJS (languages: JSX and markup)
- Copy-to-clipboard support with modern Clipboard API and textarea fallback
- Derived section-only HTML snippets or explicit snippets for accurate, copy-ready examples

## Responsiveness & Layout
The layout is responsive at multiple breakpoints and keeps content readable and accessible across devices.

- Fixed top navbar; content area accounts for 4rem height offset (pt-16)
- Library pages use a two-column layout on md+ and stack on small screens
- Sidebars are sticky on desktop (md: top-16) with independent scroll; off-canvas style on mobile
- Content areas use overflow-y-auto to prevent document-level scroll issues
- Preview grids and blocks adapt across sm, md, and lg breakpoints

## Theming & Styling (Ocean Professional)
A consistent, modern theme is provided through Tailwind extensions and utility classes, keeping UI elements cohesive.

- Color palette:
  - Primary: #2563EB (ocean.primary)
  - Secondary/Success: #F59E0B (ocean.secondary, ocean.success)
  - Error: #EF4444 (ocean.error)
  - Background: #f9fafb (ocean.bg)
  - Surface: #ffffff (ocean.surface)
  - Text: #111827 (ocean.text)
- Subtle gradient background via bg-ocean-gradient
- Soft shadows (shadow-soft) and rounded corners (rounded-xl/rounded-2xl)
- Smooth transitions and gentle easing (transition, ease-gentle)
- Consistent, readable typography and spacing for previews and cards

## Pages & Information Architecture
The app provides a clear IA with three feature-rich pages and an Installation page.

- Home
  - Project overview and calls to action to explore Components and UI Blocks
  - Ocean-themed highlight cards describing theme, responsiveness, and code previews
- Component Library
  - Sidebar-driven selection of components with a single PreviewCard render
  - URL-driven state using ?item=<slug>, back/forward sync, smooth scroll on change
  - Use of uiCatalog.js to resolve previews and code snippets
- UI Blocks
  - Sidebar-driven selection of block sections (e.g., Hero, CTA, Pricing, Stats, Team, FAQs, Footers, Flyout Menus, Features, Bento grids, Header, Newsletter, Blog, Contact, Content, Logo Cloud, Banners, 404, Landing, About)
  - Blocks use a single <section> preview and section-only, copy-ready HTML snippets
  - Same selection sync and scroll behavior as the Component Library
- Installation
  - Linked from the navbar to provide setup guidance (present in routes and file structure)

## Developer Experience
Developer productivity is prioritized via CRA conventions, simple scripts, and a clean, modular structure.

- CRA-based DX with hot reload and zero custom build wiring
- Scripts:
  - npm start (dev server, port 3000)
  - npm test
  - npm run build
- Tailwind integrated via PostCSS with content scanning across src/**/*.{js,jsx,ts,tsx}
- Clear file organization:
  - src/pages: Home, ComponentsLibrary, BlocksLibrary, Installation
  - src/components: Sidebar, PreviewCard, CodeViewer, ui/ primitives, catalog helpers
- Environment variable support (if provided): REACT_APP_API_BASE, REACT_APP_BACKEND_URL, REACT_APP_FRONTEND_URL, REACT_APP_WS_URL, REACT_APP_NODE_ENV
- No hard-coded API ports; REACT_APP_API_BASE preferred for API targeting

## Performance & Quality
The app emphasizes efficient rendering patterns and a focused UI for speed and clarity.

- Lightweight Prism-based highlighting loaded for JSX/markup only
- Incremental rendering of a single selected preview on library pages to minimize DOM work
- Dedicated scroll containers to avoid reflows at the document level
- Compact CSS via Tailwind utilities; theme extensions kept focused
- Smooth transitions with subtle easing for perceived performance

## Extensibility & Maintenance
The codebase is organized for easy extension, allowing painless addition of new components or blocks.

- Sidebar supports flat and grouped categories to organize growing catalogs
- uiCatalog.js centralizes component metadata, previews, and snippets
- PreviewCard and CodeViewer are reusable primitives for new items
- BlocksLibrary defines factories for consistent section previews and snippets
- Tailwind theme extensions are minimal and easy to modify in tailwind.config.js

## Navigation & Routing Details
Routes and navigation are implemented with BrowserRouter and NavLink, with active state styles applied.

- Routes: "/", "/components", "/blocks", "/installation"
- Active route highlighting with subtle white overlays on the gradient navbar
- Responsive spacing and keyboard-accessible focus-visible rings for links

## Sidebar Behaviors
The Sidebar component adapts to both desktop and mobile contexts with a consistent UX.

- Desktop: sticky sidebar (top-16) with its own scroll area and height constraints
- Mobile: collapsible off-canvas drawer toggled via a local control button
- Smooth transitions between open/close states
- URL updates on selection and automatic close on mobile to maintain context

## Preview & Code Cards
Reusable cards provide a consistent pattern for exploring UI elements.

- Tabs: Preview and Code (default tab is Preview)
- Code language configurable (typically markup for sections)
- Copy button with feedback state; clipboard fallback for broad compatibility
- Derived code: section-only snippets generated by factories or supplied by catalog entries

## Optional/Planned Enhancements
These items are not required for the current scope but would align with the architecture and improve experience further.

- Additional syntax languages in CodeViewer (TS/JSON) and lazy loading for larger bundles
- Search/filter across sidebar items for faster discovery
- Persisted UI preferences (e.g., remember last open tab, theme variant)
- More extensive accessibility testing and ARIA annotations for menus and dialogs
- Expanded UI Blocks (e.g., dashboards, auth pages, complex navs) and richer component demos
- Dark mode variant of the Ocean theme
- Integration tests for navigation and copy-to-clipboard workflows

## Technology Summary
- React, Create React App
- react-router-dom for routing
- Tailwind CSS via PostCSS; theme extended in tailwind.config.js
- PrismJS for syntax highlighting
- Minimal external dependencies; focus on simplicity and clarity

## Environment & Configuration
- Recognizes standard REACT_APP_* environment variables where applicable
- Port and API endpoints are not hard-coded; uses REACT_APP_API_BASE if provided
- Development server on port 3000 by default (npm start)

## Visual Language & Motion
The interface employs a clean, modern aesthetic with subtle accents to guide attention.

- Rounded corners on surfaces and controls (rounded-xl/rounded-2xl)
- Soft shadows (shadow-soft) for elevation; gentle hover shadows on interaction targets
- Subtle gradient backgrounds and color accents using the Ocean palette
- Smooth transitions and easing for tab toggle, sidebar toggle, and hover states

---
This feature list reflects the current implementation in the repository and aligns with the Ocean Professional theme and UX goals to mirror the Tailwind UI experience while remaining lightweight and developer-friendly.
