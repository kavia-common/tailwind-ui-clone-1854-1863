import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PreviewCard from "../components/PreviewCard";
import { OceanButton, OceanCard } from "../components/samples";
import { getSidebarGroupsFromCatalog, getAllComponentAnchors } from "../components/uiCatalog";

// PUBLIC_INTERFACE
export default function ComponentsLibrary() {
  /** Component Library page with persistent, collapsible left sidebar */
  const sidebarGroups = useMemo(() => getSidebarGroupsFromCatalog(), []);
  const [active, setActive] = useState(sidebarGroups[0] || null);

  // Tailwind Play–ready example snippets for demo (existing previews kept)
  const buttonCode = `
<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
  <button class="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow-sm hover:shadow-md hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-blue-500/40">
    Click me
  </button>
</section>
  `;

  const cardCode = `
<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
  <div class="rounded-xl border border-gray-200 bg-white p-4">
    <div class="font-semibold text-gray-900">Hello</div>
    <div class="text-sm text-gray-600 mt-1">This is an example card.</div>
  </div>
</section>
  `;

  // Prepare invisible anchor placeholders for each catalog item
  const anchors = useMemo(() => getAllComponentAnchors(""), []);
  const AnchorPlaceholders = () => (
    <div className="sr-only" aria-hidden="true">
      {anchors.map((a) => (
        <div key={a.href} id={`${a.groupKey}__${a.slug}`} />
      ))}
    </div>
  );

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="Components" categories={sidebarGroups} onSelect={setActive} />
          </div>
          <div className="md:hidden">
            <Sidebar title="Components" categories={sidebarGroups} onSelect={setActive} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <AnchorPlaceholders />
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Component Library</h2>
              {active?.label && <p className="text-gray-600 mt-1">Group: {active.label}</p>}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PreviewCard
                title="Ocean Button"
                description="Primary action button with Ocean styling."
                preview={<OceanButton>Click me</OceanButton>}
                code={buttonCode}
              />
              <PreviewCard
                title="Ocean Card"
                description="Simple information card."
                preview={<OceanCard title="Hello">This is an example card.</OceanCard>}
                code={cardCode}
              />
            </div>

            <div className="mt-10">
              <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-white">
                <h3 className="font-semibold text-gray-900">Coming soon</h3>
                <p className="text-sm text-gray-600 mt-1">
                  The sidebar now includes all requested groups and items. Selecting items will scroll to their anchor placeholders. Component pages/demos will be implemented later.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
