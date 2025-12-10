import React from "react";

/**
 * UI Components catalog defining groups, items, and safe slugs.
 * Used by the ComponentsLibrary sidebar to render navigable anchors/placeholders.
 */

// PUBLIC_INTERFACE
export const uiComponentsCatalog = [
  {
    key: "layout-content",
    label: "Layout & Content",
    items: [
      { label: "Container", slug: "container" },
      { label: "Columns", slug: "columns" },
      { label: "Grid", slug: "grid" },
      { label: "Layout Splitter", slug: "layout-splitter" },
      { label: "Typography", slug: "typography" },
      { label: "Images", slug: "images" },
      { label: "Links", slug: "links" },
      { label: "Dividers and <hr>", slug: "dividers-hr" },
      { label: "KBD", slug: "kbd" },
      { label: "Custom Scrollbar", slug: "custom-scrollbar" },
    ],
  },
  {
    key: "base-components",
    label: "Base Components",
    items: [
      { label: "Accordion", slug: "accordion" },
      { label: "Alerts", slug: "alerts" },
      { label: "Avatar", slug: "avatar" },
      { label: "Avatar Group", slug: "avatar-group" },
      { label: "Badge", slug: "badge" },
      { label: "Blockquote", slug: "blockquote" },
      { label: "Buttons", slug: "buttons" },
      { label: "Button Group", slug: "button-group" },
      { label: "Card", slug: "card" },
      { label: "Chat Bubbles", slug: "chat-bubbles" },
      { label: "Carousel", slug: "carousel" },
      { label: "Collapse", slug: "collapse" },
      { label: "Datepicker", slug: "datepicker" },
      { label: "Devices", slug: "devices" },
      { label: "Lists", slug: "lists" },
      { label: "List Group", slug: "list-group" },
      { label: "Legend Indicator", slug: "legend-indicator" },
      { label: "Progress", slug: "progress" },
      { label: "File Uploading Progress", slug: "file-uploading-progress" },
      { label: "Ratings", slug: "ratings" },
      { label: "Skeleton", slug: "skeleton" },
      { label: "Spinners", slug: "spinners" },
      { label: "Styled Icons", slug: "styled-icons" },
      { label: "Toasts", slug: "toasts" },
      { label: "Timeline", slug: "timeline" },
      { label: "Tree View", slug: "tree-view" },
    ],
  },
  {
    key: "navigations",
    label: "Navigations",
    items: [
      { label: "Navbar", slug: "navbar" },
      { label: "Mega Menu", slug: "mega-menu" },
      { label: "Navs", slug: "navs" },
      { label: "Tabs", slug: "tabs" },
      { label: "Sidebar New", slug: "sidebar-new" },
      { label: "Scrollspy", slug: "scrollspy" },
      { label: "Breadcrumb", slug: "breadcrumb" },
      { label: "Pagination", slug: "pagination" },
      { label: "Stepper", slug: "stepper" },
    ],
  },
  {
    key: "basic-forms",
    label: "Basic Forms",
    items: [
      { label: "Input", slug: "input" },
      { label: "Input Group", slug: "input-group" },
      { label: "Textarea", slug: "textarea" },
      { label: "File Input", slug: "file-input" },
      { label: "Checkbox", slug: "checkbox" },
      { label: "Radio", slug: "radio" },
      { label: "Switch", slug: "switch" },
      { label: "Select", slug: "select" },
      { label: "Range Slider", slug: "range-slider" },
      { label: "Color Picker", slug: "color-picker" },
      { label: "TimePicker", slug: "timepicker" },
    ],
  },
  {
    key: "advanced-forms",
    label: "Advanced Forms",
    items: [
      { label: "Advanced Select", slug: "advanced-select" },
      { label: "ComboBox", slug: "combobox" },
      { label: "SearchBox", slug: "searchbox" },
      { label: "Input Number", slug: "input-number" },
      { label: "Strong Password", slug: "strong-password" },
      { label: "Toggle Password", slug: "toggle-password" },
      { label: "Toggle Count", slug: "toggle-count" },
      { label: "Copy Markup", slug: "copy-markup" },
      { label: "PIN Input", slug: "pin-input" },
      { label: "Overlays", slug: "overlays" },
      { label: "Dropdown", slug: "dropdown" },
      { label: "Context Menu", slug: "context-menu" },
      { label: "Modal", slug: "modal" },
      { label: "Offcanvas (Drawer)", slug: "offcanvas-drawer" },
      { label: "Popover", slug: "popover" },
      { label: "Tooltip", slug: "tooltip" },
    ],
  },
  {
    key: "tables",
    label: "Tables",
    items: [
      { label: "basic table", slug: "table-basic" },
      { label: "sortable", slug: "table-sortable" },
      { label: "filtering", slug: "table-filtering" },
      { label: "editable", slug: "table-editable" },
    ],
  },
];

/**
 * Utility to flatten groups into sidebar categories with label and key while preserving grouping.
 * This returns a simple array of groups for Sidebar consumption.
 */
// PUBLIC_INTERFACE
export function getSidebarGroupsFromCatalog() {
  return uiComponentsCatalog.map((g) => ({
    key: g.key,
    label: g.label,
    items: g.items,
  }));
}

/**
 * Utility to get a combined list of all items with fully-qualified slugs (group/item).
 * Useful if building route-friendly anchors like #group__slug.
 */
// PUBLIC_INTERFACE
export function getAllComponentAnchors(prefix = "#") {
  const anchors = [];
  uiComponentsCatalog.forEach((group) => {
    group.items.forEach((item) => {
      anchors.push({
        groupKey: group.key,
        groupLabel: group.label,
        label: item.label,
        slug: item.slug,
        href: `${prefix}${group.key}__${item.slug}`,
      });
    });
  });
  return anchors;
}
