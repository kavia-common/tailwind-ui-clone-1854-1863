import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PreviewCard from "../components/PreviewCard";
import { getSidebarGroupsFromCatalog, getDefaultCatalogSlug, getCatalogItemBySlug } from "../components";

// PUBLIC_INTERFACE
export default function ComponentsLibrary() {
  /**
   * Components Library page that renders only the selected item's PreviewCard and code snippet.
   * Selection is synced via URL query ?item=<slug>. Default tab remains Preview within PreviewCard.
   */
  const sidebarGroups = useMemo(() => getSidebarGroupsFromCatalog(), []);

  // Track selected slug from URL (?item=slug); fallback to default registry slug.
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

  // Keep state in sync when URL changes (back/forward or external changes)
  useEffect(() => {
    const onPop = () => setSelectedSlug(readSlugFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // When sidebar selects a slug, update local state and ensure query string reflects it.
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
      // Scroll to top for a clean view of the selected card
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Resolve registry entry for current selection
  const current = getCatalogItemBySlug(selectedSlug);

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="Components" categories={sidebarGroups} onSelect={handleSelect} />
          </div>
          <div className="md:hidden">
            <Sidebar title="Components" categories={sidebarGroups} onSelect={handleSelect} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Component Library</h2>
              <p className="text-gray-600 mt-1">
                {current?.title ? `Selected: ${current.title}` : "Select a component from the sidebar"}
              </p>
            </div>

            {/* Render only the selected item */}
            <div className="grid grid-cols-1 gap-6">
              {current && (
                <PreviewCard
                  title={current.title}
                  description="Live preview and code"
                  preview={current.preview || null}
                  language="markup"
                />
              )}

              {!current && (
                <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-white">
                  <h3 className="font-semibold text-gray-900">No item selected</h3>
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
