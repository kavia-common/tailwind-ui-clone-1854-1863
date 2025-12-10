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
 *
 * This catalog purposely lists navigation items only (labels + safe slugs) for the sidebar.
 * For many items, we don't provide content (htmlSnippet/preview) yet; the Components page will still render and show a "No item selected" or empty state if necessary.
 */

// Utility to make safe slugs if needed in future expansions
const toSlug = (label) =>
  label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/<[^>]*>/g, "") // strip tags like <hr>
    .replace(/[^a-z0-9\s-]/g, "") // remove symbols
    .trim()
    .replace(/\s+/g, "-");

// Helper to build a minimal placeholder snippet (kept small to avoid implementing content)
const placeholder = (title) => `
<section class="min-h-[60px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
  <div class="rounded-xl border border-dashed border-gray-300 p-4 bg-white text-sm text-gray-600">
    Placeholder for: ${title}
  </div>
</section>
`.trim();

/**
 * Internal catalog definition (grouped)
 * All items include: slug, title, and minimal placeholder htmlSnippet to keep rendering functional.
 */
const catalog = [
  {
    key: "layout-content",
    label: "Layout & Content",
    items: [
      { slug: "container", title: "Container" },
      { slug: "columns", title: "Columns" },
      { slug: "grid", title: "Grid" },
      { slug: "layout-splitter", title: "Layout Splitter" },
      { slug: "typography", title: "Typography" },
      { slug: "images", title: "Images" },
      { slug: "links", title: "Links" },
      { slug: "dividers-hr", title: "Dividers and <hr>" },
      { slug: "kbd", title: "KBD" },
      { slug: "custom-scrollbar", title: "Custom Scrollbar" },
    ].map((i) => ({ ...i, htmlSnippet: placeholder(i.title) })),
  },
  {
    key: "base-components",
    label: "Base Components",
    items: [
      { slug: "accordion", title: "Accordion" },
      { slug: "alerts", title: "Alerts" },
      { slug: "avatar", title: "Avatar" },
      { slug: "avatar-group", title: "Avatar Group" },
      { slug: "badge", title: "Badge" },
      { slug: "blockquote", title: "Blockquote" },
      { slug: "buttons", title: "Buttons" },
      { slug: "button-group", title: "Button Group" },
      { slug: "card", title: "Card" },
      { slug: "chat-bubbles", title: "Chat Bubbles" },
      { slug: "carousel", title: "Carousel" },
      { slug: "collapse", title: "Collapse" },
      { slug: "datepicker", title: "Datepicker" },
      { slug: "devices", title: "Devices" },
      { slug: "lists", title: "Lists" },
      { slug: "list-group", title: "List Group" },
      { slug: "legend-indicator", title: "Legend Indicator" },
      { slug: "progress", title: "Progress" },
      { slug: "file-uploading-progress", title: "File Uploading Progress" },
      { slug: "ratings", title: "Ratings" },
      { slug: "skeleton", title: "Skeleton" },
      { slug: "spinners", title: "Spinners" },
      { slug: "styled-icons", title: "Styled Icons" },
      { slug: "toasts", title: "Toasts" },
      { slug: "timeline", title: "Timeline" },
      { slug: "tree-view", title: "Tree View" },
    ].map((i) => ({ ...i, htmlSnippet: placeholder(i.title) })),
  },
  {
    key: "navigations",
    label: "Navigations",
    items: [
      { slug: "navbar", title: "Navbar" },
      { slug: "mega-menu", title: "Mega Menu" },
      { slug: "navs", title: "Navs" },
      { slug: "tabs", title: "Tabs" },
      { slug: "sidebar-new", title: "Sidebar New" },
      { slug: "scrollspy", title: "Scrollspy" },
      { slug: "breadcrumb", title: "Breadcrumb" },
      { slug: "pagination", title: "Pagination" },
      { slug: "stepper", title: "Stepper" },
    ].map((i) => ({ ...i, htmlSnippet: placeholder(i.title) })),
  },
  {
    key: "basic-forms",
    label: "Basic Forms",
    items: [
      { slug: "input", title: "Input" },
      { slug: "input-group", title: "Input Group" },
      { slug: "textarea", title: "Textarea" },
      { slug: "file-input", title: "File Input" },
      { slug: "checkbox", title: "Checkbox" },
      { slug: "radio", title: "Radio" },
      { slug: "switch", title: "Switch" },
      { slug: "select", title: "Select" },
      { slug: "range-slider", title: "Range Slider" },
      { slug: "color-picker", title: "Color Picker" },
      { slug: "timepicker", title: "TimePicker" },
    ].map((i) => ({ ...i, htmlSnippet: placeholder(i.title) })),
  },
  {
    key: "advanced-forms",
    label: "Advanced Forms",
    items: [
      { slug: "advanced-select", title: "Advanced Select" },
      { slug: "combobox", title: "ComboBox" },
      { slug: "searchbox", title: "SearchBox" },
      { slug: "input-number", title: "Input Number" },
      { slug: "strong-password", title: "Strong Password" },
      { slug: "toggle-password", title: "Toggle Password" },
      { slug: "toggle-count", title: "Toggle Count" },
      { slug: "copy-markup", title: "Copy Markup" },
      { slug: "pin-input", title: "PIN Input" },
      { slug: "overlays", title: "Overlays" },
      { slug: "dropdown", title: "Dropdown" },
      { slug: "context-menu", title: "Context Menu" },
      { slug: "modal", title: "Modal" },
      { slug: "offcanvas-drawer", title: "Offcanvas (Drawer)" },
      { slug: "popover", title: "Popover" },
      { slug: "tooltip", title: "Tooltip" },
    ].map((i) => ({ ...i, htmlSnippet: placeholder(i.title) })),
  },
  {
    key: "tables",
    label: "Tables",
    items: [
      { slug: "table-basic", title: "Basic Table" },
      { slug: "table-sortable", title: "Sortable Table" },
      { slug: "table-filtering", title: "Filtering Table" },
      { slug: "table-editable", title: "Editable Table" },
    ].map((i) => ({ ...i, htmlSnippet: placeholder(i.title) })),
  },
];

// Minimal mappings for a few previews already available; others can be added later.
const previewComponents = {
  // Existing samples
  "buttons": <OceanButton>Button</OceanButton>,
  "card": <OceanCard title="Card Title">Content goes here.</OceanCard>,

  // Previously present examples mapped to new slugs where sensible
  "buttons-primary": <OceanButton>Button</OceanButton>,
};

// Ensure each item has a snippet; use placeholder if missing
for (const group of catalog) {
  for (const item of group.items) {
    if (!item.htmlSnippet) {
      item.htmlSnippet = placeholder(item.title);
    }
  }
}

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
