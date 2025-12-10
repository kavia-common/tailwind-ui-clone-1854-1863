import React, { useState } from "react";

// PUBLIC_INTERFACE
export default function Sidebar({ title = "Categories", categories = [], onSelect }) {
  /** Collapsible left sidebar with categories list */
  const [open, setOpen] = useState(true);

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
        <div className="p-4">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{title}</div>
          <ul className="space-y-1">
            {categories.map((c) => (
              <li key={c.key}>
                <button
                  onClick={() => onSelect && onSelect(c)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-ocean-primary transition text-sm text-gray-700"
                >
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
