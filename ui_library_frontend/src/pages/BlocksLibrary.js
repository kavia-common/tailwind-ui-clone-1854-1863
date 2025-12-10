import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PreviewCard from "../components/PreviewCard";

// PUBLIC_INTERFACE
export default function BlocksLibrary() {
  /** UI Blocks page with sidebar and example blocks */
  const categories = useMemo(
    () => [
      { key: "hero", label: "Hero Sections" },
      { key: "features", label: "Feature Grids" },
      { key: "cta", label: "Call to Action" }
    ],
    []
  );
  const [active, setActive] = useState(categories[0]);

  const FeatureGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {["Fast", "Accessible", "Beautiful"].map((k) => (
        <div key={k} className="rounded-xl bg-white p-4 border border-gray-200">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-amber-400 mb-2" />
          <div className="font-semibold text-gray-900">{k}</div>
          <div className="text-sm text-gray-600 mt-1">Ocean styled block preview.</div>
        </div>
      ))}
    </div>
  );

  const blockCode = `
export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {["Fast", "Accessible", "Beautiful"].map((k) => (
        <div key={k} className="rounded-xl bg-white p-4 border border-gray-200">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-amber-400 mb-2" />
          <div className="font-semibold text-gray-900">{k}</div>
          <div className="text-sm text-gray-600 mt-1">Ocean styled block preview.</div>
        </div>
      ))}
    </div>
  );
}
  `;

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="Blocks" categories={categories} onSelect={setActive} />
          </div>
          <div className="md:hidden">
            <Sidebar title="Blocks" categories={categories} onSelect={setActive} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">UI Blocks</h2>
              <p className="text-gray-600 mt-1">Category: {active?.label}</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <PreviewCard
                title="Feature Grid"
                description="A simple 3-column feature grid block."
                preview={<FeatureGrid />}
                code={blockCode}
                language="jsx"
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
