import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PreviewCard from "../components/PreviewCard";
import {
  getSidebarGroupsFromCatalog,
  getDefaultCatalogSlug,
  getCatalogItemBySlug,
} from "../components";

/**
 * BlocksLibrary
 * PUBLIC_INTERFACE
 * UI Blocks explorer with:
 * - Uses the standard/default sidebar behavior and grouping helpers (same as ComponentsLibrary)
 * - For each item: a live preview and a Tailwind-only <section>-wrapped code snippet
 * - Ocean Professional theme styling consistent with the app
 */
export default function BlocksLibrary() {
  // Build sidebar groups using the same helper used elsewhere to ensure default behavior
  const sidebarGroups = useMemo(() => getSidebarGroupsFromCatalog(), []);

  // Read initial selection from URL or fallback to default catalog slug
  const readSlugFromUrl = () => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("item");
      return q || getDefaultCatalogSlug();
    } catch {
      return getDefaultCatalogSlug();
    }
  };

  const [selectedSlug, setSelectedSlug] = useState(readSlugFromUrl());

  // Keep selection in sync with browser navigation (default behavior)
  useEffect(() => {
    const onPop = () => setSelectedSlug(readSlugFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Standard onSelect handler to update selection and URL
  const handleSelect = (value) => {
    if (typeof value === "string") {
      setSelectedSlug(value);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("item", value);
        window.history.replaceState(null, "", url.toString());
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Resolve current item via shared catalog helper
  const current = getCatalogItemBySlug(selectedSlug);

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="UI Blocks" categories={sidebarGroups} onSelect={handleSelect} />
          </div>
          <div className="md:hidden">
            <Sidebar title="UI Blocks" categories={sidebarGroups} onSelect={handleSelect} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">UI Blocks</h2>
              <p className="text-gray-600 mt-1">
                {current?.title ? `Selected: ${current.title}` : "Select a block from the sidebar"}
              </p>
            </div>

            {/* Render only the selected item to match default behavior */}
            <div className="grid grid-cols-1 gap-6">
              {current && (
                <PreviewCard
                  title={current.title}
                  description={current.description || "Preview and Tailwind Play–ready HTML snippet."}
                  preview={current.preview || null}
                  code={current.htmlSnippet || ""}
                />
              )}

              {!current && (
                <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-white">
                  <h3 className="font-semibold text-gray-900">No block selected</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Choose an item from the left sidebar to see its preview and code snippet.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
