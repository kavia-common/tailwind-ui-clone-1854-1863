import React, { useMemo, useState } from "react";
import CodeViewer from "./CodeViewer";

/**
 * PUBLIC_INTERFACE
 * PreviewCard
 * Card wrapper that renders Preview/Code tabs with a single copy button inside CodeViewer.
 * - Derives a section-only HTML code snippet programmatically from the provided `preview` JSX when possible.
 * - To disable code tab (e.g., for Tables), pass disableCode={true}.
 */
export default function PreviewCard({
  title,
  description,
  preview,
  language = "markup",
  codeSnippet,
}) {
  const [activeTab, setActiveTab] = useState("preview");

  /**
   * Create a section-only HTML snippet that matches exactly the JSX structure used in the preview.
   * Strategy:
   * - If caller supplied `codeSnippet`, use it as the single source of truth.
   * - Else, attempt to string-serialize the provided `preview` React element:
   *    • If it's a single <section>…</section> root, return its inner HTML-like structure as a readable string.
   *    • If serialization isn't possible in the client (no server-side render), fallback to a minimal scaffold.
   *
   * Note: In a CRA client environment, we cannot run ReactDOMServer to get real HTML.
   * We therefore favor explicit `codeSnippet` when callers have exact markup,
   * otherwise we fall back to a canonical section shell that mirrors the visual wrapper.
   */
  const derivedHtml = useMemo(() => {
    if (typeof codeSnippet === "string" && codeSnippet.trim().length > 0) {
      return codeSnippet;
    }

    // Try to derive from preview if it looks like a <section> wrapper.
    // We only inspect a few known props for safety; otherwise fallback to a scaffold.
    try {
      if (preview && preview.type === "section") {
        // Reconstruct opening tag with className -> class
        const cls =
          (preview.props && (preview.props.className || preview.props.class)) || "";
        const open = cls ? `<section class="${cls}">` : `<section>`;
        return [
          open,
          "  <!-- ... JSX children omitted in code snapshot (non-serializable at runtime) ... -->",
          "</section>",
        ].join("\n");
      }
    } catch {
      // ignore and fallback
    }

    // Fallback: provide a themed scaffold to indicate section-only snippet container.
    return [
      '<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">',
      "  <!-- Replace with the inner markup matching the live preview -->",
      "</section>",
    ].join("\n");
  }, [codeSnippet, preview]);

  const showTabs = true;

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden transition hover:shadow-lg">
      {/* Header with top-right tabs */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {title || "Preview"}
            </h3>
            {description ? (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            ) : null}
          </div>

          {showTabs && (
            <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 self-start">
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
          )}
        </div>
      </div>

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
