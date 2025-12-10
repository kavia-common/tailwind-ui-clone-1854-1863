import React from "react";
import CodeViewer from "./CodeViewer";

// PUBLIC_INTERFACE
export default function PreviewCard({ title, description, preview, code, language = "jsx" }) {
  /** Card that displays a live preview with matching code viewer below */
  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden transition hover:shadow-lg">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>
          <span className="inline-flex items-center gap-1 text-ocean-secondary text-xs font-semibold bg-amber-50 px-2 py-1 rounded">
            Ocean
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="rounded-xl border border-gray-100 p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
          {preview}
        </div>
      </div>

      <div className="p-5 pt-0">
        <CodeViewer code={code} language={language} initiallyOpen={false} />
      </div>
    </div>
  );
}
