import React from "react";
import { OceanButton, OceanCard } from "./samples";

/**
 * This file defines:
 * - catalog: list of component items grouped by category with Tailwind Play–ready HTML snippets
 * - previewComponents: mapping of slug -> live preview React element
 * - PUBLIC_INTERFACE helper functions to drive sidebar and selection
 *
 * Notes:
 * - All code snippets are plain HTML and wrapped in a single <section>…</section> where appropriate.
 * - The preview components are minimal React elements used for live rendering alongside the code.
 */

// Internal catalog definition (category groups and items)
const catalog = [
  {
    key: "elements",
    label: "Elements",
    items: [
      {
        slug: "button-primary",
        title: "Primary Button",
        // Tailwind Play–ready HTML snippet (<section> wrapper included)
        htmlSnippet: `
<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
  <button class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow-sm hover:shadow-md hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-blue-500/40">
    Button
  </button>
</section>
        `.trim(),
      },
      {
        slug: "card-simple",
        title: "Simple Card",
        htmlSnippet: `
<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
  <div class="rounded-xl border border-gray-200 bg-white p-4">
    <div class="font-semibold text-gray-900">Card Title</div>
    <div class="text-sm text-gray-600 mt-1">Content goes here.</div>
  </div>
</section>
        `.trim(),
      },
    ],
  },
  {
    key: "forms",
    label: "Forms",
    items: [
      {
        slug: "input-basic",
        title: "Basic Input",
        htmlSnippet: `
<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
  <label class="block text-sm font-medium text-gray-700 mb-1" for="email">Email</label>
  <input id="email" type="email" placeholder="you@example.com" class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500" />
</section>
        `.trim(),
      },
    ],
  },
];

// Mapping from slug to preview React element
const previewComponents = {
  "button-primary": <OceanButton>Button</OceanButton>,
  "card-simple": <OceanCard title="Card Title">Content goes here.</OceanCard>,
  "input-basic": (
    <div className="w-full max-w-sm">
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="you@example.com"
        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
      />
    </div>
  ),
};

/**
 * PUBLIC_INTERFACE
 * Build sidebar groups directly from the catalog suitable for <Sidebar /> grouped data.
 */
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

/**
 * PUBLIC_INTERFACE
 * Return the default catalog slug (first item of first group) to use when none selected.
 */
export function getDefaultCatalogSlug() {
  /** Returns default slug as a string */
  const firstGroup = catalog[0];
  if (firstGroup && firstGroup.items && firstGroup.items.length) {
    return firstGroup.items[0].slug;
  }
  return "";
}

/**
 * PUBLIC_INTERFACE
 * Lookup a catalog item by slug, merging its preview component for live rendering.
 */
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
