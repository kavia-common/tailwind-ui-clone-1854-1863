import React from "react";

// PUBLIC_INTERFACE
export function OceanButton({ children = "Button" }) {
  /** Ocean themed button used for live preview rendering (code examples supplied as static HTML elsewhere) */
  return (
    <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-ocean-primary text-white shadow-sm hover:shadow-md hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-blue-500/40">
      {children}
    </button>
  );
}

// PUBLIC_INTERFACE
export function OceanCard({ title = "Card Title", children }) {
  /** Ocean themed card container used for live preview rendering (code examples supplied as static HTML elsewhere) */
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="text-sm text-gray-600 mt-1">{children || "Content goes here."}</div>
    </div>
  );
}
