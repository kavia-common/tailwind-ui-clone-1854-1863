import React, { useMemo, useState } from "react";
import CodeViewer from "./CodeViewer";

/**
 * PUBLIC_INTERFACE
 * PreviewCard
 * Card wrapper that renders Preview/Code tabs with a single copy button inside CodeViewer.
 * - Derives a section-only HTML code snippet programmatically if codeSnippet is not provided.
 * - To disable code tab (e.g., for Tables), pass disableCode={true}.
 */
export default function PreviewCard({
  title,
  description,
  preview,
  language = "markup",
  codeSnippet,
  disableCode = false,
}) {
  const [activeTab, setActiveTab] = useState("preview");

  // Lightweight derivation for a section-only snippet if none is provided.
  const derivedHtml = useMemo(() => {
    if (typeof codeSnippet === "string" && codeSnippet.trim().length > 0) {
      return codeSnippet;
    }
    const inner = "<!-- Insert your section markup here based on the live preview -->";
    return [
      '<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">',
      inner,
      "</section>",
    ].join("\n");
  }, [codeSnippet]);

  const showTabs = !disableCode;

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

      {/* Tabs */}
      {showTabs && (
        <div className="px-5 pt-4">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              type="button"
              className={`px-3 py-1.5 text-sm rounded-md ${
                activeTab === "preview"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </button>
            <button
              type="button"
              className={`px-3 py-1.5 text-sm rounded-md ${
                activeTab === "code"
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setActiveTab("code")}
            >
              Code
            </button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {activeTab === "code" && showTabs ? (
          <CodeViewer code={derivedHtml} language={language} initiallyOpen showCopy />
        ) : (
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
        )}
      </div>
    </div>
  );
}
