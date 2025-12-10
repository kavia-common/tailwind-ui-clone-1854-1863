import React from "react";

/**
 * PUBLIC_INTERFACE
 * PreviewCard
 * Minimal card wrapper that only renders the live preview content.
 * Any previous Code/Preview tabs, code viewers, and copy controls have been removed.
 */
export default function PreviewCard({ title, description, preview }) {
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden transition hover:shadow-lg">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {title || "Preview"}
          </h3>
          {description ? (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          ) : null}
        </div>
      </div>

      {/* Live preview only */}
      <div className="p-5">
        <div className="rounded-xl border border-gray-100 p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
          {preview || (
            <section>
              <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-white">
                <h4 className="font-semibold text-gray-900">Preview unavailable</h4>
                <p className="text-sm text-gray-600 mt-1">
                  This item does not have a live preview.
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
