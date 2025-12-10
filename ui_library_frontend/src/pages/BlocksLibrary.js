import React, { useMemo } from "react";
import Sidebar from "../components/Sidebar";

/**
 * PUBLIC_INTERFACE
 * BlocksLibrary
 * Simplified page: UI Blocks sidebar intentionally has no items. Main content shows an empty state.
 */
export default function BlocksLibrary() {
  // No categories for UI Blocks
  const blocksCategories = useMemo(() => [], []);

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          {/* Sidebar with no items */}
          <div className="hidden md:block">
            <Sidebar title="UI Blocks" categories={blocksCategories} onSelect={() => {}} />
          </div>
          <div className="md:hidden">
            <Sidebar title="UI Blocks" categories={blocksCategories} onSelect={() => {}} />
          </div>

          {/* Empty state in main content */}
          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">UI Blocks</h2>
              <p className="text-gray-600 mt-1">No blocks are available.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-white">
                <h3 className="font-semibold text-gray-900">Nothing to show here</h3>
                <p className="text-sm text-gray-600 mt-1">
                  The UI Blocks library is currently empty.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
