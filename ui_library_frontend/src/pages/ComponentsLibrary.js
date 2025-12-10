import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PreviewCard from "../components/PreviewCard";
import { OceanButton, OceanCard } from "../components/samples";

// PUBLIC_INTERFACE
export default function ComponentsLibrary() {
  /** Component Library page with persistent, collapsible left sidebar */
  const categories = useMemo(
    () => [
      { key: "buttons", label: "Buttons" },
      { key: "cards", label: "Cards" },
      { key: "forms", label: "Forms" },
      { key: "nav", label: "Navigation" }
    ],
    []
  );

  const [active, setActive] = useState(categories[0]);

  const buttonCode = `
import React from "react";

export function OceanButton({ children = "Button" }) {
  return (
    <button className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-ocean-primary text-white shadow-sm hover:shadow-md transition">
      {children}
    </button>
  );
}
  `;

  const cardCode = `
import React from "react";

export function OceanCard({ title = "Card Title", children }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="font-semibold text-gray-900">{title}</div>
      <div className="text-sm text-gray-600 mt-1">{children}</div>
    </div>
  );
}
  `;

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="Components" categories={categories} onSelect={setActive} />
          </div>
          <div className="md:hidden">
            <Sidebar title="Components" categories={categories} onSelect={setActive} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Component Library</h2>
              <p className="text-gray-600 mt-1">Category: {active?.label}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PreviewCard
                title="Ocean Button"
                description="Primary action button with Ocean styling."
                preview={<OceanButton>Click me</OceanButton>}
                code={buttonCode}
                language="jsx"
              />
              <PreviewCard
                title="Ocean Card"
                description="Simple information card."
                preview={<OceanCard title="Hello">This is an example card.</OceanCard>}
                code={cardCode}
                language="jsx"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
