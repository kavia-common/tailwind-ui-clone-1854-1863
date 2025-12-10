import React, { useState } from "react";

/**
 * Sidebar supports two data shapes:
 * - Flat categories: [{ key, label }]
 * - Grouped categories with items: [{ key, label, items: [{ label, slug }] }]
 * If items are provided, it renders group headers and nested anchor buttons.
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
  };

  return (
    <aside className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden m-2 px-3 py-2 rounded-md bg-white text-gray-700 shadow hover:shadow-md border border-gray-200 transition"
        aria-expanded={open}
        aria-controls="left-sidebar"
      >
        {open ? "Hide" : "Show"} {title}
      </button>

      <div
        id="left-sidebar"
        className={`md:static fixed z-30 top-16 bottom-0 md:top-auto md:bottom-auto md:z-auto w-72 bg-white border-r border-gray-200 transition-transform ease-gentle ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 h-full overflow-y-auto">
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
