import React, { useMemo, useState } from "react";
import CodeViewer from "./CodeViewer";

// PUBLIC_INTERFACE
export default function PreviewCard({ title, description, preview, code, language = "jsx" }) {
  /**
   * Card component that displays a live preview and a toggleable code viewer.
   * - Top-right segmented toggle between "Preview" and "Code"
   * - Defaults to "Preview"
   * - Code pane includes a copy-to-clipboard button
   */
  const [activeTab, setActiveTab] = useState("preview");

  const canCopy = typeof navigator !== "undefined" && !!navigator.clipboard;
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText((code || "").trim());
      // brief visual confirmation via alert to avoid adding extra state/UI
      // (kept minimal and non-blocking in UX)
      // eslint-disable-next-line no-alert
      alert("Code copied to clipboard");
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert("Failed to copy");
    }
  };

  const CopyButton = useMemo(
    () => (
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm transition"
        aria-label="Copy code to clipboard"
        title="Copy code"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" className="text-ocean-primary" fill="currentColor" aria-hidden="true">
          <path d="M8 7a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V7zm-3 3h1v7a3 3 0 0 0 3 3h8v1a2 2 0 0 1-2 2H6a4 4 0 0 1-4-4v-7a2 2 0 0 1 2-2z"/>
        </svg>
        <span className="text-sm font-medium">Copy</span>
      </button>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [code]
  );

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden transition hover:shadow-lg">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-600 mt-1">{description}</p>}
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1 text-ocean-secondary text-xs font-semibold bg-amber-50 px-2 py-1 rounded">
              Ocean
            </span>
            <div className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5">
              <button
                type="button"
                onClick={() => setActiveTab("preview")}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  activeTab === "preview"
                    ? "bg-white text-ocean-primary shadow-sm"
                    : "text-gray-700 hover:text-ocean-primary"
                }`}
                aria-pressed={activeTab === "preview"}
              >
                Preview
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1.5 text-sm rounded-md transition ${
                  activeTab === "code"
                    ? "bg-white text-ocean-primary shadow-sm"
                    : "text-gray-700 hover:text-ocean-primary"
                }`}
                aria-pressed={activeTab === "code"}
              >
                Code
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeTab === "preview" && (
        <div className="p-5">
          <div className="rounded-xl border border-gray-100 p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
            {preview}
          </div>
        </div>
      )}

      {activeTab === "code" && (
        <div className="p-5 pt-0">
          <div className="mb-3 flex items-center justify-end">
            {canCopy && CopyButton}
          </div>
          <CodeViewer code={code} language={language} initiallyOpen={true} />
        </div>
      )}
    </div>
  );
}
