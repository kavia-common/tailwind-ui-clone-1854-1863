import React from "react";
import { OceanButton, OceanCard } from "./samples";
import ButtonsDemo from "../pages/Components/ButtonsDemo";
import TablesDemo, {
  TablesBasicOnly,
  TablesSortableOnly,
  TablesFilterOnly,
  TablesPaginatedSelectableOnly,
} from "../pages/Components/TablesDemo";

/**
 * This file defines:
 * - catalog: list of component items grouped by category with Tailwind Play–ready HTML snippets
 * - previewComponents: mapping of slug -> live preview React element
 * - PUBLIC_INTERFACE helper functions to drive sidebar and selection
 *
 * Notes:
 * - All code snippets are plain HTML and wrapped in a single <section>…</section> using class attributes.
 * - The preview components are minimal React elements used for live rendering alongside the code.
 * - Ocean Professional colors: Primary #2563EB, Secondary #F59E0B
 */

// Utility to make safe slugs if needed (kept in case of dynamic additions)
const toSlug = (label) =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/<[^>]*>/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Ocean gradient scaffold used in most snippets
const shell = (inner) => `
<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
  ${inner}
</section>
`.trim();

// Short helpers for repeated UI atoms in snippets
const oceanBtnPrimary = `class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow-sm hover:shadow-md hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-blue-500/30"`;
const oceanBtnSecondary = `class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#F59E0B] text-white shadow-sm hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-amber-500/30"`;

// Live preview mini components (no external libs)
const PBadge = ({ text = "New" }) => (
  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-ocean-primary border border-blue-200">
    {text}
  </span>
);
const PAvatar = () => (
  <div className="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-semibold">
    OA
  </div>
);
const PAvatarGroup = () => (
  <div className="flex -space-x-2">
    <div className="h-8 w-8 rounded-full bg-blue-200 border-2 border-white" />
    <div className="h-8 w-8 rounded-full bg-amber-200 border-2 border-white" />
    <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white" />
  </div>
);
const PAlert = () => (
  <div className="rounded-lg border border-blue-200 bg-blue-50 text-blue-800 px-4 py-3">
    Ocean info alert — keep actions clear and concise.
  </div>
);
const PAccordion = () => (
  <div className="space-y-2">
    <div className="rounded-lg border border-gray-200 bg-white">
      <button className="w-full flex items-center justify-between p-3">
        <span className="font-medium text-gray-900">What is Ocean UI?</span>
        <span className="text-gray-500">+</span>
      </button>
      <div className="border-t border-gray-200 p-3 text-sm text-gray-600">
        A Tailwind-inspired component library using a blue & amber theme.
      </div>
    </div>
  </div>
);
const PBlockquote = () => (
  <blockquote className="border-l-4 border-blue-200 pl-4 italic text-gray-700">
    “Simplicity is the soul of efficiency.”
  </blockquote>
);
const PButtons = () => (
  <div className="flex flex-wrap items-center gap-3">
    <OceanButton>Primary</OceanButton>
    <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-ocean-secondary text-white shadow-sm hover:shadow-md transition">
      Secondary
    </button>
  </div>
);
const PButtonGroup = () => (
  <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-white">
    <button className="px-4 py-2 text-sm text-white bg-ocean-primary">Left</button>
    <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Middle</button>
    <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Right</button>
  </div>
);
const PCard = () => <OceanCard title="Ocean Card">Minimal content sample.</OceanCard>;
const PChat = () => (
  <div className="space-y-2">
    <div className="max-w-[70%] rounded-2xl p-3 bg-white border border-gray-200">Hello from Ocean!</div>
    <div className="max-w-[70%] ml-auto rounded-2xl p-3 bg-blue-600 text-white">Hi there 👋</div>
  </div>
);
const PCarousel = () => (
  <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
    <div className="grid grid-cols-3 gap-2 p-3">
      <div className="h-20 rounded-lg bg-blue-100" />
      <div className="h-20 rounded-lg bg-amber-100" />
      <div className="h-20 rounded-lg bg-gray-100" />
    </div>
  </div>
);
const PCollapse = () => (
  <div className="rounded-lg border border-gray-200 bg-white">
    <button className="w-full p-3 text-left font-medium">Section title</button>
  </div>
);
const PDatepicker = () => (
  <div className="inline-flex items-center gap-2">
    <input type="date" className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
    <button className="px-3 py-2 rounded-lg bg-ocean-primary text-white">Pick</button>
  </div>
);
const PDevices = () => (
  <div className="flex items-end gap-3">
    <div className="h-16 w-10 bg-gray-200 rounded-lg" />
    <div className="h-24 w-14 bg-gray-300 rounded-xl" />
    <div className="h-32 flex-1 bg-gray-100 rounded-2xl" />
  </div>
);
const PLists = () => (
  <ul className="list-disc pl-5 text-gray-700">
    <li>Ocean item A</li>
    <li>Ocean item B</li>
  </ul>
);
const PListGroup = () => (
  <ul className="rounded-lg border border-gray-200 overflow-hidden">
    <li className="px-4 py-2 bg-gray-50">Item 1</li>
    <li className="px-4 py-2">Item 2</li>
  </ul>
);
const PLegend = () => (
  <div className="flex items-center gap-3">
    <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB]" /> Sales
    <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" /> Profit
  </div>
);
const PProgress = () => (
  <div className="w-full">
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full w-1/2 bg-[#2563EB]" />
    </div>
  </div>
);
const PUpload = () => (
  <div className="space-y-2">
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full w-2/3 bg-[#2563EB]" />
    </div>
    <div className="text-xs text-gray-600">Uploading… 66%</div>
  </div>
);
const PRatings = () => (
  <div className="flex items-center gap-1 text-amber-500">
    <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
  </div>
);
const PSkeleton = () => (
  <div className="animate-pulse space-y-2">
    <div className="h-4 bg-gray-200 rounded"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);
const PSpinner = () => (
  <div className="flex items-center gap-2">
    <div className="h-5 w-5 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
    <span className="text-sm text-gray-700">Loading…</span>
  </div>
);
const PStyledIcons = () => (
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]" />
    <div className="h-8 w-8 rounded-lg bg-blue-200" />
  </div>
);
const PToast = () => (
  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
    <span className="h-2 w-2 rounded-full bg-[#2563EB]"></span>
    <span className="text-sm text-gray-800">Saved successfully</span>
  </div>
);
const PTimeline = () => (
  <div className="relative pl-6">
    <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200"></div>
    <div className="mb-4">
      <div className="h-3 w-3 rounded-full bg-[#2563EB] absolute left-1.5"></div>
      <div className="ml-4 text-sm">Started</div>
    </div>
    <div>
      <div className="h-3 w-3 rounded-full bg-[#F59E0B] absolute left-1.5"></div>
      <div className="ml-4 text-sm">Completed</div>
    </div>
  </div>
);
const PTree = () => (
  <ul className="text-sm text-gray-800">
    <li>Root
      <ul className="pl-5 list-disc">
        <li>Branch A</li>
        <li>Branch B</li>
      </ul>
    </li>
  </ul>
);

// Layout & content previews
const PContainer = () => <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-xl p-4">Responsive container</div>;
const PColumns = () => (
  <div className="columns-1 md:columns-2 gap-4">
    <div className="mb-4 rounded-lg bg-white border border-gray-200 p-3">Column A</div>
    <div className="mb-4 rounded-lg bg-white border border-gray-200 p-3">Column B</div>
  </div>
);
const PGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="h-12 rounded-lg bg-white border border-gray-200" />
    ))}
  </div>
);
const PSplitter = () => (
  <div className="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-4">
    <div className="rounded-xl bg-white border border-gray-200 p-4">Main</div>
    <div className="rounded-xl bg-white border border-gray-200 p-4">Aside</div>
  </div>
);
const PTypography = () => (
  <div>
    <h3 className="text-lg font-semibold text-gray-900">Heading</h3>
    <p className="text-gray-700 mt-1">Body text with Ocean theme colors.</p>
  </div>
);
const PImages = () => (
  <div className="flex items-center gap-3">
    <div className="h-16 w-24 rounded-lg bg-gray-200" />
    <div className="h-16 w-24 rounded-lg bg-gray-200" />
  </div>
);
const PLinks = () => (
  <div className="space-x-3">
    <a href="#x" className="text-ocean-primary">Primary link</a>
    <a href="#y" className="text-gray-700 hover:text-ocean-primary">Muted link</a>
  </div>
);
const PDividers = () => (
  <div>
    <div className="text-sm text-gray-700 mb-2">Above</div>
    <hr className="border-blue-200" />
    <div className="text-sm text-gray-700 mt-2">Below</div>
  </div>
);
const PKbd = () => (
  <kbd className="px-2 py-1 rounded border border-gray-300 bg-gray-50 text-xs">⌘K</kbd>
);
const PScrollbar = () => (
  <div className="h-24 overflow-y-auto border border-gray-200 rounded-lg p-3 code-scrollbar bg-white">
    <div className="h-40 bg-gradient-to-b from-blue-50 to-amber-50 rounded" />
  </div>
);

// Navigation previews
const PNavbar = () => (
  <div className="rounded-xl bg-white border border-gray-200 p-4 flex items-center justify-between">
    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]" />
    <div className="flex items-center gap-3">
      <a href="#a" className="text-gray-700 hover:text-ocean-primary text-sm">Docs</a>
      <a href="#b" className="text-gray-700 hover:text-ocean-primary text-sm">Blog</a>
      <button className="px-3 py-1.5 rounded-lg bg-ocean-primary text-white text-sm">Sign in</button>
    </div>
  </div>
);
const PMega = () => (
  <div className="rounded-xl bg-white border border-gray-200 p-4">
    <div className="font-semibold text-gray-900 mb-2">Products</div>
    <div className="grid grid-cols-2 gap-3 text-sm">
      <a href="#x" className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100">Analytics</a>
      <a href="#y" className="p-3 rounded-lg hover:bg-gray-50 border border-gray-100">Reports</a>
    </div>
  </div>
);
const PNavs = () => (
  <div className="inline-flex items-center gap-3">
    <a href="#one" className="text-ocean-primary font-medium">Overview</a>
    <a href="#two" className="text-gray-700 hover:text-ocean-primary">Settings</a>
  </div>
);
const PTabs = () => (
  <div>
    <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-white">
      <button className="px-4 py-2 bg-gray-50 text-ocean-primary font-medium">Details</button>
      <button className="px-4 py-2 hover:bg-gray-50">Usage</button>
    </div>
  </div>
);
const PSidebarNew = () => (
  <div className="grid grid-cols-[200px_1fr] gap-3">
    <div className="rounded-lg border border-gray-200 bg-white p-3">Sidebar</div>
    <div className="rounded-lg border border-gray-200 bg-white p-3">Content</div>
  </div>
);
const PScrollspy = () => (
  <div className="flex items-start gap-4">
    <ul className="w-40 text-sm">
      <li className="text-ocean-primary">Intro</li>
      <li className="text-gray-700">API</li>
    </ul>
    <div className="flex-1 h-24 rounded-lg border border-gray-200 bg-white" />
  </div>
);
const PBreadcrumb = () => (
  <nav className="text-sm text-gray-600">
    <ol className="flex items-center gap-2">
      <li><a href="#home" className="text-gray-700 hover:text-ocean-primary">Home</a></li>
      <li>/</li>
      <li className="text-gray-900">Library</li>
    </ol>
  </nav>
);
const PPagination = () => (
  <div className="inline-flex items-center gap-1">
    <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">Prev</button>
    <button className="px-3 py-1.5 rounded-lg bg-ocean-primary text-white">1</button>
    <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">2</button>
    <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">Next</button>
  </div>
);
const PStepper = () => (
  <div className="flex items-center gap-3">
    <div className="h-8 w-8 rounded-full bg-[#2563EB] text-white grid place-items-center text-sm">1</div>
    <div className="h-0.5 w-8 bg-gray-300"></div>
    <div className="h-8 w-8 rounded-full bg-gray-200 grid place-items-center text-sm">2</div>
  </div>
);

// Basic forms previews
const PInput = () => <input className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="Your name" />;
const PInputGroup = () => (
  <div className="flex">
    <span className="inline-flex items-center px-3 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-600">@</span>
    <input className="px-3 py-2 rounded-r-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="username" />
  </div>
);
const PTextarea = () => <textarea className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" rows="3" placeholder="Message"></textarea>;
const PFileInput = () => (
  <label className="flex items-center gap-3 px-3 py-2 rounded-lg border border-dashed border-gray-300 bg-white cursor-pointer">
    <input type="file" className="hidden" />
    <span className="text-sm text-gray-700">Choose file</span>
  </label>
);
const PCheckbox = () => (
  <label className="inline-flex items-center gap-2 text-sm text-gray-800">
    <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30" />
    Subscribe
  </label>
);
const PRadio = () => (
  <label className="inline-flex items-center gap-2 text-sm text-gray-800">
    <input type="radio" name="r" className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500/30" />
    Option
  </label>
);
const PSwitch = () => (
  <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
    <span className="inline-block h-5 w-5 translate-x-1 rounded-full bg-white shadow transition"></span>
  </button>
);
const PSelect = () => (
  <select className="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30">
    <option>One</option>
    <option>Two</option>
  </select>
);
const PRange = () => <input type="range" className="w-48 accent-blue-600" />;
const PColor = () => <input type="color" className="h-9 w-12 p-1 rounded border border-gray-300" />;
const PTime = () => <input type="time" className="px-3 py-2 rounded-lg border border-gray-300 bg-white" />;

// Advanced forms previews
const PAdvSelect = () => <PSelect />;
const PCombobox = () => <input className="px-3 py-2 rounded-lg border border-gray-300 bg-white" placeholder="Search options…" />;
const PSearchbox = () => (
  <div className="flex rounded-lg border border-gray-300 overflow-hidden">
    <span className="px-3 bg-gray-50 text-gray-600">🔎</span>
    <input className="flex-1 px-3 py-2 outline-none" placeholder="Search..." />
  </div>
);
const PInputNumber = () => <input type="number" className="px-3 py-2 rounded-lg border border-gray-300 bg-white" defaultValue="42" />;
const PStrongPassword = () => (
  <div className="space-y-2">
    <input type="password" className="px-3 py-2 rounded-lg border border-gray-300 bg-white w-64" placeholder="Password" />
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div className="h-full w-1/3 bg-[#EF4444]"></div>
    </div>
  </div>
);
const PTogglePassword = () => (
  <div className="flex items-center">
    <input type="password" className="px-3 py-2 rounded-l-lg border border-gray-300 bg-white" value="secret" readOnly />
    <button className="px-3 py-2 rounded-r-lg border border-gray-300 bg-gray-50">Show</button>
  </div>
);
const PToggleCount = () => (
  <div className="inline-flex items-center gap-2">
    <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">-</button>
    <span className="w-8 text-center">1</span>
    <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">+</button>
  </div>
);
const PCopyMarkup = () => (
  <div className="inline-flex items-center gap-2">
    <input readOnly value="<div>Sample</div>" className="px-3 py-2 rounded-lg border border-gray-300 bg-white w-48" />
    <button className="px-3 py-2 rounded-lg bg-ocean-primary text-white">Copy</button>
  </div>
);
const PPinInput = () => (
  <div className="flex items-center gap-2">
    {Array.from({ length: 4 }).map((_, i) => (
      <input key={i} maxLength={1} className="w-10 text-center px-2 py-2 rounded-lg border border-gray-300 bg-white" defaultValue="" />
    ))}
  </div>
);
const POverlays = () => (
  <div className="relative">
    <button className="px-3 py-2 rounded-lg bg-ocean-primary text-white">Open</button>
    <div className="mt-2 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700">Overlay content</div>
  </div>
);
const PDropdown = () => {
  // Interactive dropdown with keyboard and outside-click handling
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const firstItemRef = React.useRef(null);

  // Close on outside click
  React.useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      const b = buttonRef.current;
      const m = menuRef.current;
      if (b && b.contains(e.target)) return;
      if (m && m.contains(e.target)) return;
      setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Close on Escape and move focus back to button
  React.useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        // Return focus to trigger
        setTimeout(() => buttonRef.current?.focus(), 0);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus first item when opening
  React.useEffect(() => {
    if (open) {
      const id = setTimeout(() => {
        firstItemRef.current?.focus();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [open]);

  return (
    <div className="relative inline-block text-left">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30"
      >
        Menu
        <svg className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <div
          ref={menuRef}
          role="menu"
          aria-label="Dropdown menu"
          className="absolute left-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow-lg p-1 text-sm z-10"
        >
          <a
            href="#"
            ref={firstItemRef}
            role="menuitem"
            tabIndex={0}
            className="block px-3 py-2 rounded hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            Item A
          </a>
          <a
            href="#"
            role="menuitem"
            tabIndex={0}
            className="block px-3 py-2 rounded hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            Item B
          </a>
          <a
            href="#"
            role="menuitem"
            tabIndex={0}
            className="block px-3 py-2 rounded hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
            onClick={() => setOpen(false)}
          >
            Item C
          </a>
        </div>
      )}
    </div>
  );
};
const PContext = () => (
  <div className="rounded-lg border border-gray-200 bg-white p-4">Right-click menu example</div>
);
const PModal = () => (
  <div className="relative">
    <div className="rounded-lg border border-gray-200 bg-white p-4">Modal content</div>
  </div>
);
const PDrawer = () => (
  <div className="rounded-lg border border-gray-200 bg-white p-4">Drawer panel</div>
);
const PPopover = () => (
  <div className="relative inline-block">
    <button className="px-3 py-2 rounded-lg border border-gray-200 bg-white">Hover me</button>
    <div className="mt-2 w-48 rounded-lg border border-gray-200 bg-white p-3 text-sm">Popover content</div>
  </div>
);
const PTooltip = () => (
  <div className="inline-block">
    <button className="px-3 py-2 rounded-lg border border-gray-200 bg-white">Hover</button>
    <div className="mt-1 text-xs text-gray-700">Tooltip text</div>
  </div>
);

/**
 * Tables previews (single-section wrappers)
 */
const PTableBasic = () => (
  <div className="space-y-8">
    <TablesBasicOnly />
  </div>
);
const PTableSortable = () => (
  <div className="space-y-8">
    <TablesSortableOnly />
  </div>
);
const PTableFiltering = () => (
  <div className="space-y-8">
    <TablesFilterOnly />
  </div>
);
const PTableEditable = () => (
  <div className="space-y-8">
    <TablesPaginatedSelectableOnly />
  </div>
);

/**
 * Internal catalog definition with Tailwind Play–ready snippets
 * Every htmlSnippet is a single-root <section>…</section> block using class attributes.
 */
const catalog = [
  {
    key: "layout-content",
    label: "Layout & Content",
    items: [
      {
        slug: "container",
        title: "Container",
        htmlSnippet: shell(`
  <div class="mx-auto max-w-3xl bg-white border border-gray-200 rounded-xl p-4">
    Responsive container
  </div>
        `),
      },
      {
        slug: "columns",
        title: "Columns",
        htmlSnippet: shell(`
  <div class="columns-1 md:columns-2 gap-4">
    <div class="mb-4 rounded-lg bg-white border border-gray-200 p-3">Column A</div>
    <div class="mb-4 rounded-lg bg-white border border-gray-200 p-3">Column B</div>
  </div>
        `),
      },
      {
        slug: "grid",
        title: "Grid",
        htmlSnippet: shell(`
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    <div class="h-12 rounded-lg bg-white border border-gray-200"></div>
    <div class="h-12 rounded-lg bg-white border border-gray-200"></div>
    <div class="h-12 rounded-lg bg-white border border-gray-200"></div>
    <div class="h-12 rounded-lg bg-white border border-gray-200"></div>
  </div>
        `),
      },
      {
        slug: "layout-splitter",
        title: "Layout Splitter",
        htmlSnippet: shell(`
  <div class="grid grid-cols-1 md:grid-cols-[1fr_240px] gap-4">
    <div class="rounded-xl bg-white border border-gray-200 p-4">Main</div>
    <div class="rounded-xl bg-white border border-gray-200 p-4">Aside</div>
  </div>
        `),
      },
      {
        slug: "typography",
        title: "Typography",
        htmlSnippet: shell(`
  <div>
    <h3 class="text-lg font-semibold text-gray-900">Heading</h3>
    <p class="text-gray-700 mt-1">Body text with Ocean colors.</p>
  </div>
        `),
      },
      {
        slug: "images",
        title: "Images",
        htmlSnippet: shell(`
  <div class="flex items-center gap-3">
    <div class="h-16 w-24 rounded-lg bg-gray-200"></div>
    <div class="h-16 w-24 rounded-lg bg-gray-200"></div>
  </div>
        `),
      },
      {
        slug: "links",
        title: "Links",
        htmlSnippet: shell(`
  <div class="space-x-3">
    <a href="#" class="text-[#2563EB] hover:opacity-90">Primary link</a>
    <a href="#" class="text-gray-700 hover:text-[#2563EB]">Muted link</a>
  </div>
        `),
      },
      {
        slug: "dividers-hr",
        title: "Dividers and <hr>",
        htmlSnippet: shell(`
  <div>
    <div class="text-sm text-gray-700 mb-2">Above</div>
    <hr class="border-blue-200" />
    <div class="text-sm text-gray-700 mt-2">Below</div>
  </div>
        `),
      },
      {
        slug: "kbd",
        title: "KBD",
        htmlSnippet: shell(`
  <kbd class="px-2 py-1 rounded border border-gray-300 bg-gray-50 text-xs">⌘K</kbd>
        `),
      },
      {
        slug: "custom-scrollbar",
        title: "Custom Scrollbar",
        htmlSnippet: shell(`
  <div class="h-24 overflow-y-auto border border-gray-200 rounded-lg p-3 code-scrollbar bg-white">
    <div class="h-40 bg-gradient-to-b from-blue-50 to-amber-50 rounded"></div>
  </div>
        `),
      },
    ],
  },
  {
    key: "base-components",
    label: "Base Components",
    items: [
      {
        slug: "accordion",
        title: "Accordion",
        htmlSnippet: shell(`
  <div class="space-y-2">
    <div class="rounded-lg border border-gray-200 bg-white">
      <button class="w-full flex items-center justify-between p-3">
        <span class="font-medium text-gray-900">What is Ocean UI?</span>
        <span class="text-gray-500">+</span>
      </button>
      <div class="border-t border-gray-200 p-3 text-sm text-gray-600">
        A Tailwind-inspired component library using a blue & amber theme.
      </div>
    </div>
  </div>
        `),
      },
      {
        slug: "alerts",
        title: "Alerts",
        htmlSnippet: shell(`
  <div class="rounded-lg border border-blue-200 bg-blue-50 text-blue-800 px-4 py-3">
    Ocean info alert — keep actions clear and concise.
  </div>
        `),
      },
      {
        slug: "avatar",
        title: "Avatar",
        htmlSnippet: shell(`
  <div class="relative inline-flex items-center justify-center h-10 w-10 rounded-full bg-blue-100 text-blue-800 font-semibold">
    OA
  </div>
        `),
      },
      {
        slug: "avatar-group",
        title: "Avatar Group",
        htmlSnippet: shell(`
  <div class="flex -space-x-2">
    <div class="h-8 w-8 rounded-full bg-blue-200 border-2 border-white"></div>
    <div class="h-8 w-8 rounded-full bg-amber-200 border-2 border-white"></div>
    <div class="h-8 w-8 rounded-full bg-gray-200 border-2 border-white"></div>
  </div>
        `),
      },
      {
        slug: "badge",
        title: "Badge",
        htmlSnippet: shell(`
  <span class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2563EB] border border-blue-200">
    New
  </span>
        `),
      },
      {
        slug: "blockquote",
        title: "Blockquote",
        htmlSnippet: shell(`
  <blockquote class="border-l-4 border-blue-200 pl-4 italic text-gray-700">
    “Simplicity is the soul of efficiency.”
  </blockquote>
        `),
      },
      {
        slug: "buttons",
        title: "Buttons",
        htmlSnippet: shell(`
  <div class="flex flex-wrap items-center gap-3">
    <button ${oceanBtnPrimary}>Primary</button>
    <button ${oceanBtnSecondary}>Secondary</button>
  </div>
        `),
      },
      {
        slug: "buttons-reusable",
        title: "Reusable Buttons",
        htmlSnippet: shell(`
  <div class="flex flex-wrap items-center gap-3">
    <button class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-sm">Primary</button>
    <button class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 shadow-sm">Secondary</button>
    <button class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 px-4 py-2 text-sm border border-blue-600 text-blue-700 bg-transparent hover:bg-blue-50 focus:ring-blue-500 shadow-sm">Outline</button>
  </div>
        `),
      },
      {
        slug: "button-group",
        title: "Button Group",
        htmlSnippet: shell(`
  <div class="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-white">
    <button class="px-4 py-2 text-sm text-white bg-[#2563EB]">Left</button>
    <button class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Middle</button>
    <button class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Right</button>
  </div>
        `),
      },
      {
        slug: "card",
        title: "Card",
        htmlSnippet: shell(`
  <div class="rounded-xl border border-gray-200 bg-white p-4">
    <div class="font-semibold text-gray-900">Card Title</div>
    <div class="text-sm text-gray-600 mt-1">Content goes here.</div>
  </div>
        `),
      },
      {
        slug: "chat-bubbles",
        title: "Chat Bubbles",
        htmlSnippet: shell(`
  <div class="space-y-2">
    <div class="max-w-[70%] rounded-2xl p-3 bg-white border border-gray-200">Hello from Ocean!</div>
    <div class="max-w-[70%] ml-auto rounded-2xl p-3 bg-[#2563EB] text-white">Hi there 👋</div>
  </div>
        `),
      },
      {
        slug: "carousel",
        title: "Carousel",
        htmlSnippet: shell(`
  <div class="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
    <div class="grid grid-cols-3 gap-2 p-3">
      <div class="h-20 rounded-lg bg-blue-100"></div>
      <div class="h-20 rounded-lg bg-amber-100"></div>
      <div class="h-20 rounded-lg bg-gray-100"></div>
    </div>
  </div>
        `),
      },
      {
        slug: "collapse",
        title: "Collapse",
        htmlSnippet: shell(`
  <div class="rounded-lg border border-gray-200 bg-white">
    <button class="w-full p-3 text-left font-medium">Section title</button>
  </div>
        `),
      },
      {
        slug: "datepicker",
        title: "Datepicker",
        htmlSnippet: shell(`
  <div class="inline-flex items-center gap-2">
    <input type="date" class="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
    <button class="px-3 py-2 rounded-lg bg-[#2563EB] text-white">Pick</button>
  </div>
        `),
      },
      {
        slug: "devices",
        title: "Devices",
        htmlSnippet: shell(`
  <div class="flex items-end gap-3">
    <div class="h-16 w-10 bg-gray-200 rounded-lg"></div>
    <div class="h-24 w-14 bg-gray-300 rounded-xl"></div>
    <div class="h-32 flex-1 bg-gray-100 rounded-2xl"></div>
  </div>
        `),
      },
      {
        slug: "lists",
        title: "Lists",
        htmlSnippet: shell(`
  <ul class="list-disc pl-5 text-gray-700">
    <li>Ocean item A</li>
    <li>Ocean item B</li>
  </ul>
        `),
      },
      {
        slug: "list-group",
        title: "List Group",
        htmlSnippet: shell(`
  <ul class="rounded-lg border border-gray-200 overflow-hidden">
    <li class="px-4 py-2 bg-gray-50">Item 1</li>
    <li class="px-4 py-2">Item 2</li>
  </ul>
        `),
      },
      {
        slug: "legend-indicator",
        title: "Legend Indicator",
        htmlSnippet: shell(`
  <div class="flex items-center gap-3">
    <span class="h-2.5 w-2.5 rounded-full bg-[#2563EB]"></span> Sales
    <span class="h-2.5 w-2.5 rounded-full bg-[#F59E0B]"></span> Profit
  </div>
        `),
      },
      {
        slug: "progress",
        title: "Progress",
        htmlSnippet: shell(`
  <div class="w-full">
    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div class="h-full w-1/2 bg-[#2563EB]"></div>
    </div>
  </div>
        `),
      },
      {
        slug: "file-uploading-progress",
        title: "File Uploading Progress",
        htmlSnippet: shell(`
  <div class="space-y-2">
    <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div class="h-full w-2/3 bg-[#2563EB]"></div>
    </div>
    <div class="text-xs text-gray-600">Uploading… 66%</div>
  </div>
        `),
      },
      {
        slug: "ratings",
        title: "Ratings",
        htmlSnippet: shell(`
  <div class="flex items-center gap-1 text-[#F59E0B]">
    <span>★</span><span>★</span><span>★</span><span>★</span><span class="text-gray-300">★</span>
  </div>
        `),
      },
      {
        slug: "skeleton",
        title: "Skeleton",
        htmlSnippet: shell(`
  <div class="animate-pulse space-y-2">
    <div class="h-4 bg-gray-200 rounded"></div>
    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
        `),
      },
      {
        slug: "spinners",
        title: "Spinners",
        htmlSnippet: shell(`
  <div class="flex items-center gap-2">
    <div class="h-5 w-5 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin"></div>
    <span class="text-sm text-gray-700">Loading…</span>
  </div>
        `),
      },
      {
        slug: "styled-icons",
        title: "Styled Icons",
        htmlSnippet: shell(`
  <div class="flex items-center gap-3">
    <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]"></div>
    <div class="h-8 w-8 rounded-lg bg-blue-200"></div>
  </div>
        `),
      },
      {
        slug: "toasts",
        title: "Toasts",
        htmlSnippet: shell(`
  <div class="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm">
    <span class="h-2 w-2 rounded-full bg-[#2563EB]"></span>
    <span class="text-sm text-gray-800">Saved successfully</span>
  </div>
        `),
      },
      {
        slug: "timeline",
        title: "Timeline",
        htmlSnippet: shell(`
  <div class="relative pl-6">
    <div class="absolute left-2 top-0 bottom-0 w-px bg-gray-200"></div>
    <div class="mb-4 relative">
      <div class="h-3 w-3 rounded-full bg-[#2563EB] absolute -left-3 top-0.5"></div>
      <div class="ml-1 text-sm">Started</div>
    </div>
    <div class="relative">
      <div class="h-3 w-3 rounded-full bg-[#F59E0B] absolute -left-3 top-0.5"></div>
      <div class="ml-1 text-sm">Completed</div>
    </div>
  </div>
        `),
      },
      {
        slug: "tree-view",
        title: "Tree View",
        htmlSnippet: shell(`
  <ul class="text-sm text-gray-800">
    <li>Root
      <ul class="pl-5 list-disc">
        <li>Branch A</li>
        <li>Branch B</li>
      </ul>
    </li>
  </ul>
        `),
      },
    ],
  },
  {
    key: "navigations",
    label: "Navigations",
    items: [
      {
        slug: "navbar",
        title: "Navbar",
        htmlSnippet: shell(`
  <div class="rounded-xl bg-white border border-gray-200 p-4 flex items-center justify-between">
    <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]"></div>
    <div class="flex items-center gap-3">
      <a href="#" class="text-gray-700 hover:text-[#2563EB] text-sm">Docs</a>
      <a href="#" class="text-gray-700 hover:text-[#2563EB] text-sm">Blog</a>
      <button class="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-sm">Sign in</button>
    </div>
  </div>
        `),
      },
      {
        slug: "mega-menu",
        title: "Mega Menu",
        htmlSnippet: shell(`
  <div class="rounded-xl bg-white border border-gray-200 p-4">
    <div class="font-semibold text-gray-900 mb-2">Products</div>
    <div class="grid grid-cols-2 gap-3 text-sm">
      <a href="#" class="p-3 rounded-lg hover:bg-gray-50 border border-gray-100">Analytics</a>
      <a href="#" class="p-3 rounded-lg hover:bg-gray-50 border border-gray-100">Reports</a>
    </div>
  </div>
        `),
      },
      {
        slug: "navs",
        title: "Navs",
        htmlSnippet: shell(`
  <div class="inline-flex items-center gap-3">
    <a href="#" class="text-[#2563EB] font-medium">Overview</a>
    <a href="#" class="text-gray-700 hover:text-[#2563EB]">Settings</a>
  </div>
        `),
      },
      {
        slug: "tabs",
        title: "Tabs",
        htmlSnippet: shell(`
  <div>
    <div class="inline-flex rounded-lg border border-gray-200 overflow-hidden bg-white">
      <button class="px-4 py-2 bg-gray-50 text-[#2563EB] font-medium">Details</button>
      <button class="px-4 py-2 hover:bg-gray-50">Usage</button>
    </div>
  </div>
        `),
      },
      {
        slug: "sidebar-new",
        title: "Sidebar New",
        htmlSnippet: shell(`
  <div class="grid grid-cols-[200px_1fr] gap-3">
    <div class="rounded-lg border border-gray-200 bg-white p-3">Sidebar</div>
    <div class="rounded-lg border border-gray-200 bg-white p-3">Content</div>
  </div>
        `),
      },
      {
        slug: "scrollspy",
        title: "Scrollspy",
        htmlSnippet: shell(`
  <div class="flex items-start gap-4">
    <ul class="w-40 text-sm">
      <li class="text-[#2563EB]">Intro</li>
      <li class="text-gray-700">API</li>
    </ul>
    <div class="flex-1 h-24 rounded-lg border border-gray-200 bg-white"></div>
  </div>
        `),
      },
      {
        slug: "breadcrumb",
        title: "Breadcrumb",
        htmlSnippet: shell(`
  <nav class="text-sm text-gray-600">
    <ol class="flex items-center gap-2">
      <li><a href="#" class="text-gray-700 hover:text-[#2563EB]">Home</a></li>
      <li>/</li>
      <li class="text-gray-900">Library</li>
    </ol>
  </nav>
        `),
      },
      {
        slug: "pagination",
        title: "Pagination",
        htmlSnippet: shell(`
  <div class="inline-flex items-center gap-1">
    <button class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">Prev</button>
    <button class="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white">1</button>
    <button class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">2</button>
    <button class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">Next</button>
  </div>
        `),
      },
      {
        slug: "stepper",
        title: "Stepper",
        htmlSnippet: shell(`
  <div class="flex items-center gap-3">
    <div class="h-8 w-8 rounded-full bg-[#2563EB] text-white grid place-items-center text-sm">1</div>
    <div class="h-0.5 w-8 bg-gray-300"></div>
    <div class="h-8 w-8 rounded-full bg-gray-200 grid place-items-center text-sm">2</div>
  </div>
        `),
      },
    ],
  },
  {
    key: "basic-forms",
    label: "Basic Forms",
    items: [
      { slug: "input", title: "Input", htmlSnippet: shell(`<input class="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="Your name" />`) },
      { slug: "input-group", title: "Input Group", htmlSnippet: shell(`
  <div class="flex">
    <span class="inline-flex items-center px-3 rounded-l-lg border border-gray-300 bg-gray-50 text-gray-600">@</span>
    <input class="px-3 py-2 rounded-r-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="username" />
  </div>
      `) },
      { slug: "textarea", title: "Textarea", htmlSnippet: shell(`<textarea class="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" rows="3" placeholder="Message"></textarea>`) },
      { slug: "file-input", title: "File Input", htmlSnippet: shell(`
  <label class="flex items-center gap-3 px-3 py-2 rounded-lg border border-dashed border-gray-300 bg-white cursor-pointer">
    <input type="file" class="hidden" />
    <span class="text-sm text-gray-700">Choose file</span>
  </label>
      `) },
      { slug: "checkbox", title: "Checkbox", htmlSnippet: shell(`
  <label class="inline-flex items-center gap-2 text-sm text-gray-800">
    <input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30" />
    Subscribe
  </label>
      `) },
      { slug: "radio", title: "Radio", htmlSnippet: shell(`
  <label class="inline-flex items-center gap-2 text-sm text-gray-800">
    <input type="radio" name="r" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500/30" />
    Option
  </label>
      `) },
      { slug: "switch", title: "Switch", htmlSnippet: shell(`
  <button class="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200">
    <span class="inline-block h-5 w-5 translate-x-1 rounded-full bg-white shadow transition"></span>
  </button>
      `) },
      { slug: "select", title: "Select", htmlSnippet: shell(`
  <select class="px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30">
    <option>One</option>
    <option>Two</option>
  </select>
      `) },
      { slug: "range-slider", title: "Range Slider", htmlSnippet: shell(`<input type="range" class="w-48 accent-blue-600" />`) },
      { slug: "color-picker", title: "Color Picker", htmlSnippet: shell(`<input type="color" class="h-9 w-12 p-1 rounded border border-gray-300" />`) },
      { slug: "timepicker", title: "TimePicker", htmlSnippet: shell(`<input type="time" class="px-3 py-2 rounded-lg border border-gray-300 bg-white" />`) },
    ],
  },
  {
    key: "advanced-forms",
    label: "Advanced Forms",
    items: [
      { slug: "advanced-select", title: "Advanced Select", htmlSnippet: shell(`<select class="px-3 py-2 rounded-lg border border-gray-300 bg-white"><option>Alpha</option><option>Beta</option></select>`) },
      { slug: "combobox", title: "ComboBox", htmlSnippet: shell(`<input class="px-3 py-2 rounded-lg border border-gray-300 bg-white" placeholder="Search options…" />`) },
      { slug: "searchbox", title: "SearchBox", htmlSnippet: shell(`
  <div class="flex rounded-lg border border-gray-300 overflow-hidden">
    <span class="px-3 bg-gray-50 text-gray-600">🔎</span>
    <input class="flex-1 px-3 py-2 outline-none" placeholder="Search..." />
  </div>
      `) },
      { slug: "input-number", title: "Input Number", htmlSnippet: shell(`<input type="number" class="px-3 py-2 rounded-lg border border-gray-300 bg-white" value="42" />`) },
      { slug: "strong-password", title: "Strong Password", htmlSnippet: shell(`
  <div class="space-y-2">
    <input type="password" class="px-3 py-2 rounded-lg border border-gray-300 bg-white w-64" placeholder="Password" />
    <div class="h-2 bg-gray-200 rounded-full overflow-hidden"><div class="h-full w-1/3 bg-[#EF4444]"></div></div>
  </div>
      `) },
      { slug: "toggle-password", title: "Toggle Password", htmlSnippet: shell(`
  <div class="flex items-center">
    <input type="password" class="px-3 py-2 rounded-l-lg border border-gray-300 bg-white" value="secret" />
    <button class="px-3 py-2 rounded-r-lg border border-gray-300 bg-gray-50">Show</button>
  </div>
      `) },
      { slug: "toggle-count", title: "Toggle Count", htmlSnippet: shell(`
  <div class="inline-flex items-center gap-2">
    <button class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">-</button>
    <span class="w-8 text-center">1</span>
    <button class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white">+</button>
  </div>
      `) },
      { slug: "copy-markup", title: "Copy Markup", htmlSnippet: shell(`
  <div class="inline-flex items-center gap-2">
    <input value="&lt;div&gt;Sample&lt;/div&gt;" class="px-3 py-2 rounded-lg border border-gray-300 bg-white w-48" />
    <button class="px-3 py-2 rounded-lg bg-[#2563EB] text-white">Copy</button>
  </div>
      `) },
      { slug: "pin-input", title: "PIN Input", htmlSnippet: shell(`
  <div class="flex items-center gap-2">
    <input maxlength="1" class="w-10 text-center px-2 py-2 rounded-lg border border-gray-300 bg-white" />
    <input maxlength="1" class="w-10 text-center px-2 py-2 rounded-lg border border-gray-300 bg-white" />
    <input maxlength="1" class="w-10 text-center px-2 py-2 rounded-lg border border-gray-300 bg-white" />
    <input maxlength="1" class="w-10 text-center px-2 py-2 rounded-lg border border-gray-300 bg-white" />
  </div>
      `) },
      { slug: "overlays", title: "Overlays", htmlSnippet: shell(`
  <div class="relative">
    <button class="px-3 py-2 rounded-lg bg-[#2563EB] text-white">Open</button>
    <div class="mt-2 rounded-lg border border-gray-200 bg-white p-3 text-sm text-gray-700">Overlay content</div>
  </div>
      `) },
      { slug: "dropdown", title: "Dropdown", htmlSnippet: shell(`
  <div class="relative inline-block text-left">
    <button class="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">
      Menu
      <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" clip-rule="evenodd"/></svg>
    </button>
    <div class="absolute left-0 mt-2 w-44 rounded-lg border border-gray-200 bg-white shadow p-1 text-sm">
      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-50">Item A</a>
      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-50">Item B</a>
      <a href="#" class="block px-3 py-2 rounded hover:bg-gray-50">Item C</a>
    </div>
  </div>
      `) },
      { slug: "context-menu", title: "Context Menu", htmlSnippet: shell(`
  <div class="rounded-lg border border-gray-200 bg-white p-4">Right-click menu example</div>
      `) },
      { slug: "modal", title: "Modal", htmlSnippet: shell(`
  <div class="relative">
    <div class="rounded-lg border border-gray-200 bg-white p-4">Modal content</div>
  </div>
      `) },
      { slug: "offcanvas-drawer", title: "Offcanvas (Drawer)", htmlSnippet: shell(`
  <div class="rounded-lg border border-gray-200 bg-white p-4">Drawer panel</div>
      `) },
      { slug: "popover", title: "Popover", htmlSnippet: shell(`
  <div class="relative inline-block">
    <button class="px-3 py-2 rounded-lg border border-gray-200 bg-white">Hover me</button>
    <div class="mt-2 w-48 rounded-lg border border-gray-200 bg-white p-3 text-sm">Popover content</div>
  </div>
      `) },
      { slug: "tooltip", title: "Tooltip", htmlSnippet: shell(`
  <div class="inline-block">
    <button class="px-3 py-2 rounded-lg border border-gray-200 bg-white">Hover</button>
    <div class="mt-1 text-xs text-gray-700">Tooltip text</div>
  </div>
      `) },
    ],
  },
  {
    key: "tables",
    label: "Tables",
    items: [
      {
        slug: "table-basic",
        title: "Basic Table",
        htmlSnippet: shell(`
  <div class="rounded-xl border border-gray-200 overflow-hidden bg-white">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-gray-700">Name</th>
          <th class="px-4 py-2 text-gray-700">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-t border-gray-100">
          <td class="px-4 py-2">Jane</td>
          <td class="px-4 py-2">Engineer</td>
        </tr>
        <tr class="border-t border-gray-100">
          <td class="px-4 py-2">Mark</td>
          <td class="px-4 py-2">Designer</td>
        </tr>
      </tbody>
    </table>
  </div>
        `),
      },
      { slug: "table-sortable", title: "Sortable Table", htmlSnippet: shell(`
  <div class="rounded-xl border border-gray-200 overflow-hidden bg-white">
    <table class="w-full text-left text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-4 py-2 text-gray-700">Name</th>
          <th class="px-4 py-2 text-gray-700">Role</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-t border-gray-100">
          <td class="px-4 py-2">Jane</td>
          <td class="px-4 py-2">Engineer</td>
        </tr>
        <tr class="border-t border-gray-100">
          <td class="px-4 py-2">Mark</td>
          <td class="px-4 py-2">Designer</td>
        </tr>
      </tbody>
    </table>
  </div>
      `) },
      { slug: "table-filtering", title: "Filtering Table", htmlSnippet: shell(`
  <div class="space-y-3">
    <input class="px-3 py-2 rounded-lg border border-gray-300 bg-white w-64" placeholder="Filter…" />
    <div class="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-gray-700">Name</th>
            <th class="px-4 py-2 text-gray-700">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-gray-100">
            <td class="px-4 py-2">Jane</td>
            <td class="px-4 py-2">Engineer</td>
          </tr>
          <tr class="border-t border-gray-100">
            <td class="px-4 py-2">Mark</td>
            <td class="px-4 py-2">Designer</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
      `) },
      { slug: "table-paginated-selectable", title: "Paginated + Selectable Table", htmlSnippet: shell(`
  <div class="space-y-3">
    <div class="inline-flex items-center gap-2">
      <span class="text-sm text-gray-700">Rows per page:</span>
      <select class="px-2 py-1 rounded-lg border border-gray-300 bg-white text-sm">
        <option>3</option><option>5</option><option>10</option>
      </select>
    </div>
    <div class="rounded-xl border border-gray-200 overflow-hidden bg-white">
      <div class="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div class="text-sm text-gray-700">
          Selected:
          <span class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2563EB] border border-blue-200">0</span>
        </div>
        <div class="text-xs text-gray-500">Showing 1-3 of 6</div>
      </div>
      <table class="w-full text-left text-sm">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-2 text-gray-700 w-10"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" /></th>
            <th class="px-4 py-2 text-gray-700">Name</th>
            <th class="px-4 py-2 text-gray-700">Email</th>
            <th class="px-4 py-2 text-gray-700">Role</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-gray-100">
            <td class="px-4 py-2"><input type="checkbox" class="h-4 w-4 rounded border-gray-300 text-blue-600" /></td>
            <td class="px-4 py-2">Jane Cooper</td>
            <td class="px-4 py-2">jane.cooper@example.com</td>
            <td class="px-4 py-2">Engineer</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
      `) },
    ],
  },
];

// Live preview mapping per slug
const previewComponents = {
  // Layout & content
  "container": <PContainer />,
  "columns": <PColumns />,
  "grid": <PGrid />,
  "layout-splitter": <PSplitter />,
  "typography": <PTypography />,
  "images": <PImages />,
  "links": <PLinks />,
  "dividers-hr": <PDividers />,
  "kbd": <PKbd />,
  "custom-scrollbar": <PScrollbar />,

  // Base components
  "accordion": <PAccordion />,
  "alerts": <PAlert />,
  "avatar": <PAvatar />,
  "avatar-group": <PAvatarGroup />,
  "badge": <PBadge />,
  "blockquote": <PBlockquote />,
  "buttons": <PButtons />,
  "buttons-reusable": <ButtonsDemo />,
  "button-group": <PButtonGroup />,
  "card": <PCard />,
  "chat-bubbles": <PChat />,
  "carousel": <PCarousel />,
  "collapse": <PCollapse />,
  "datepicker": <PDatepicker />,
  "devices": <PDevices />,
  "lists": <PLists />,
  "list-group": <PListGroup />,
  "legend-indicator": <PLegend />,
  "progress": <PProgress />,
  "file-uploading-progress": <PUpload />,
  "ratings": <PRatings />,
  "skeleton": <PSkeleton />,
  "spinners": <PSpinner />,
  "styled-icons": <PStyledIcons />,
  "toasts": <PToast />,
  "timeline": <PTimeline />,
  "tree-view": <PTree />,

  // Navigations
  "navbar": <PNavbar />,
  "mega-menu": <PMega />,
  "navs": <PNavs />,
  "tabs": <PTabs />,
  "sidebar-new": <PSidebarNew />,
  "scrollspy": <PScrollspy />,
  "breadcrumb": <PBreadcrumb />,
  "pagination": <PPagination />,
  "stepper": <PStepper />,

  // Basic forms
  "input": <PInput />,
  "input-group": <PInputGroup />,
  "textarea": <PTextarea />,
  "file-input": <PFileInput />,
  "checkbox": <PCheckbox />,
  "radio": <PRadio />,
  "switch": <PSwitch />,
  "select": <PSelect />,
  "range-slider": <PRange />,
  "color-picker": <PColor />,
  "timepicker": <PTime />,

  // Advanced forms
  "advanced-select": <PAdvSelect />,
  "combobox": <PCombobox />,
  "searchbox": <PSearchbox />,
  "input-number": <PInputNumber />,
  "strong-password": <PStrongPassword />,
  "toggle-password": <PTogglePassword />,
  "toggle-count": <PToggleCount />,
  "copy-markup": <PCopyMarkup />,
  "pin-input": <PPinInput />,
  "overlays": <POverlays />,
  "dropdown": <PDropdown />,
  "context-menu": <PContext />,
  "modal": <PModal />,
  "offcanvas-drawer": <PDrawer />,
  "popover": <PPopover />,
  "tooltip": <PTooltip />,

  // Tables (map to single-section wrappers)
  "table-basic": <PTableBasic />,
  "table-sortable": <PTableSortable />,
  "table-filtering": <PTableFiltering />,
  "table-paginated-selectable": <PTableEditable />,

  // Backward compat
  "buttons-primary": <OceanButton>Button</OceanButton>,
};

// PUBLIC_INTERFACE
export function getSidebarGroupsFromCatalog() {
  /** Return groups: [{ key, label, items: [{ label, slug }] }] */
  return catalog.map((group) => ({
    key: group.key,
    label: group.label,
    items: (group.items || []).map((item) => ({
      label: item.title,
      slug: item.slug,
    })),
  }));
}

// PUBLIC_INTERFACE
export function getDefaultCatalogSlug() {
  /** Returns default slug as a string */
  const firstGroup = catalog[0];
  if (firstGroup && firstGroup.items && firstGroup.items.length) {
    return firstGroup.items[0].slug;
  }
  return "";
}

// PUBLIC_INTERFACE
export function getCatalogItemBySlug(slug) {
  /** Returns { slug, title, htmlSnippet, preview } or null if not found */
  if (!slug) return null;
  for (const group of catalog) {
    for (const item of group.items || []) {
      if (item.slug === slug) {
        return {
          ...item,
          preview: previewComponents[item.slug] || null,
        };
      }
    }
  }
  return null;
}
