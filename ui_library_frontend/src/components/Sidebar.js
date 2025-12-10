import React, { useState } from "react";

/**
 * Sidebar supports two data shapes:
 * - Flat categories: [{ key, label }]
 * - Grouped categories with items: [{ key, label, items: [{ label, slug }] }]
 * If items are provided, it renders group headers and nested anchor buttons.
 *
 * Enhancements:
 * - On desktop (md+): sticky sidebar that persists while scrolling.
 * - On mobile: collapsible off-canvas that slides in under the fixed navbar.
 * - Constrained height with its own scroll area (overflow-y-auto) and smooth scrollbar styling.
 */

// PUBLIC_INTERFACE
export default function Sidebar({ title = "Categories", categories = [], onSelect }) {
  /** Collapsible left sidebar with categories list */
  const [open, setOpen] = useState(true);

  const isGrouped = Array.isArray(categories) && categories.some((c) => Array.isArray(c.items));

  const handleClick = (group, item) => {
    // Forward selection up (pass slug for item-level selection)
    if (onSelect) {
      if (item?.slug) onSelect(item.slug);
      else onSelect(group);
    }

    // Update URL for shareable selection and scroll to top of content
    if (typeof window !== "undefined") {
      if (item?.slug) {
        const url = new URL(window.location.href);
        url.searchParams.set("item", item.slug);
        window.history.replaceState(null, "", url.toString());
      }
      // smooth scroll to top of main content
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Close the off-canvas menu on mobile after selection for better UX
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setOpen(false);
      }
    }
  };

  // Fixed navbar height is 4rem (h-16). Use calc(100vh - 4rem) for max height.
  // On desktop we use sticky with top: 4rem; on mobile it's fixed top-16.
  return (
    <aside className="relative">
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden m-2 px-3 py-2 rounded-md bg-white text-gray-700 shadow hover:shadow-md border border-gray-200 transition"
        aria-expanded={open}
        aria-controls="left-sidebar"
      >
        {open ? "Hide" : "Show"} {title}
      </button>

      {/* Container handles position and width for both mobile and desktop */}
      <div
        id="left-sidebar"
        className={`w-72 bg-white border-r border-gray-200 z-30 transition-transform ease-gentle
        md:translate-x-0
        md:sticky md:top-16
        md:h-[calc(100vh-4rem)]
        fixed top-16 bottom-0
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        aria-hidden={!open && typeof window !== "undefined" && window.innerWidth < 768}
      >
        {/* Scroll area with custom scrollbar style */}
        <div className="p-4 h-full overflow-y-auto code-scrollbar">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</div>

          {!isGrouped && (
            <ul className="space-y-1">
              {categories.map((c) => (
                <li key={c.key}>
                  <button
                    onClick={() => handleClick(c)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-ocean-primary transition text-sm text-gray-700"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {isGrouped && (
            <div className="space-y-5">
              {categories.map((group) => (
                <div key={group.key}>
                  <div className="px-3 py-2 text-[13px] font-semibold text-gray-900 bg-gray-50 border border-gray-200 rounded-lg">
                    {group.label}
                  </div>
                  <ul className="mt-2 space-y-1">
                    {(group.items || []).map((item) => (
                      <li key={`${group.key}-${item.slug}`}>
                        <button
                          onClick={() => handleClick(group, item)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-ocean-primary transition text-sm text-gray-700"
                          title={item.label}
                        >
                          <span className="inline-flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-200" />
                            {item.label}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
