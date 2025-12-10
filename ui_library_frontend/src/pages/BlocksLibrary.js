import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PreviewCard from "../components/PreviewCard";
import {
  getDefaultCatalogSlug,
  getCatalogItemBySlug,
} from "../components";

/**
 * BlocksLibrary
 * PUBLIC_INTERFACE
 * UI Blocks explorer with:
 * - Uses the standard/default sidebar behavior (same Sidebar component)
 * - Lists the specified UI Blocks items in the exact order
 * - For each item: render live preview and Tailwind-only <section>-wrapped code snippet
 * - Does not modify any existing preview/snippet implementations
 */
export default function BlocksLibrary() {
  // Build the Blocks sidebar list exactly as requested, using default Sidebar behavior (flat list).
  const blocksCategories = useMemo(
    () => [
      { key: "hero-section", label: "Hero section" },
      { key: "cta-section", label: "CTA section" },
      { key: "pricing-section", label: "Pricing Section" },
      { key: "stats", label: "Stats" },
      { key: "testimonial", label: "Testimonial" },
      { key: "team-sections", label: "Team sections" },
      { key: "faqs", label: "FAQs" },
      { key: "footers", label: "Footers" },
      { key: "flayout-menues", label: "Flayout Menues" },
      { key: "features-section", label: "Features section" },
      { key: "bento-grids", label: "Bento grids" },
      { key: "header-section", label: "Header section" },
      { key: "newsletter-section", label: "Newsletter Section" },
      { key: "blog-section", label: "Blog section" },
      { key: "contact-section", label: "Contact section" },
      { key: "content-section", label: "content section" },
      { key: "logo-cloud", label: "logo cloud" },
      { key: "banners", label: "Banners" },
      { key: "404-pages", label: "404 pages" },
      { key: "landing-pages", label: "Landing pages" },
      { key: "about-pages", label: "About pages" },
    ],
    []
  );

  // For content rendering in the main area, continue using the existing catalog helpers where possible.
  // We map each flat "key" to an internal 'slug' for the preview/code resolution.
  // If a slug doesn't exist in the catalog, we show a placeholder card explaining that it's coming soon.
  const orderedSlugs = useMemo(
    () => blocksCategories.map((c) => c.key),
    [blocksCategories]
  );

  // Initialize selected slug from URL if present; fallback to the first item in our ordered list (mirrors default behavior).
  const readSlugFromUrl = () => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("item");
      if (q) return q;
      // fallback to first requested item
      return orderedSlugs[0] || getDefaultCatalogSlug();
    } catch {
      return orderedSlugs[0] || getDefaultCatalogSlug();
    }
  };

  const [selectedSlug, setSelectedSlug] = useState(readSlugFromUrl());

  // Keep selection synced on history navigation
  useEffect(() => {
    const onPop = () => setSelectedSlug(readSlugFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Standard onSelect handler: update URL ?item=<slug> and scroll to top
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

  // Try to resolve via existing catalog. This preserves all preview/snippet implementations.
  const current = getCatalogItemBySlug(selectedSlug);

  // For items not present in the existing catalog, render a friendly placeholder (no change to snippets elsewhere).
  const PlaceholderCard = ({ title }) => (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">
          Preview coming soon. This item is listed in the UI Blocks sidebar as requested and routes correctly.
        </p>
      </div>
      <div className="p-5">
        <div className="rounded-xl border border-dashed border-gray-300 p-6 bg-gray-50 text-sm text-gray-600">
          No snippet available yet for: <span className="font-medium">{title}</span>
        </div>
      </div>
    </div>
  );

  // Compute the human-readable title for the current selection from our ordered list for consistent header text.
  const currentTitle =
    blocksCategories.find((c) => c.key === selectedSlug)?.label || current?.title || "UI Block";

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="UI Blocks" categories={blocksCategories} onSelect={handleSelect} />
          </div>
          <div className="md:hidden">
            <Sidebar title="UI Blocks" categories={blocksCategories} onSelect={handleSelect} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">UI Blocks</h2>
              <p className="text-gray-600 mt-1">
                {currentTitle ? `Selected: ${currentTitle}` : "Select a block from the sidebar"}
              </p>
            </div>

            {/* Render only the selected item to match default behavior */}
            <div className="grid grid-cols-1 gap-6">
              {current ? (
                <PreviewCard
                  title={current.title}
                  description={current.description || "Preview and Tailwind Play–ready HTML snippet."}
                  preview={current.preview || null}
                  code={current.htmlSnippet || ""}
                />
              ) : (
                // If the selected slug is not in the existing catalog, show placeholder card
                <PlaceholderCard title={currentTitle} />
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
