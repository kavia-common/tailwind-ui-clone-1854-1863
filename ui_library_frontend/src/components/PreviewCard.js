import React, { useMemo, useState } from "react";
import CodeViewer from "./CodeViewer";

/**
 * Normalize code into a Tailwind Play–ready HTML snippet wrapped in a single <section>…</section>.
 * - If input looks like JSX, convert className -> class and strip JSX constructs.
 * - Enforce a single <section> root wrapper with Ocean gradient background.
 * - No headers or comments: Play should accept the snippet as-is.
 */
// PUBLIC_INTERFACE
export function ensureSectionWrappedHtml(input = "") {
  const html = (input || "").trim();
  const isHtml =
    /\<\s*(section|div|button|ul|li|span|header|footer|a|p|h[1-6])\b/i.test(html) ||
    /class="/.test(html);
  const normalized = isHtml ? html : jsxToStaticHtml(html);

  // If already a single <section> root, keep as-is (but ensure class attributes)
  const trimmed = normalized.trim();
  const hasSectionRoot = /^\<\s*section\b[\s\S]*\<\/\s*section\s*\>$/i.test(trimmed);

  const finalInner = hasSectionRoot ? trimmed : wrapInSection(trimmed);
  return finalInner;
}

/**
 * Convert a JSX-like fragment into static HTML (best-effort):
 * - className -> class
 * - remove JS expressions like {"text"}, {children}
 * - unwrap simple array maps
 * - replace fragments <>...</> with a div
 * - expand self-closing non-void tags
 */
function jsxToStaticHtml(src = "") {
  let out = String(src);

  // Remove function/component wrappers with return(...)
  out = out.replace(
    /export\s+(default\s+)?function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{\s*[\s\S]*?return\s*\(\s*/m,
    ""
  );
  out = out.replace(/\)\s*;?\s*\}\s*$/m, "");

  // className -> class
  out = out.replace(/\bclassName=/g, "class=");

  // Replace fragments
  out = out.replace(/<>/g, '<div class="p-4">').replace(/<\/>/g, "</div>");

  // Expand self-closing tags (non-void)
  out = out.replace(/<([a-zA-Z]+)([^>]*)\s\/>/g, "<$1$2></$1>");

  // Remove {children}
  out = out.replace(/\{\s*children\s*\}/g, "");

  // Replace {"text"} or {'text'} or {`text`}
  out = out.replace(/\{\s*["'`](.*?)["'`]\s*\}/g, "$1");

  // Naively unwrap map(() => ( ... ))
  out = out.replace(
    /\{\s*[^}]*?\.map\([^)]*?=>\s*\(\s*([\s\S]*?)\s*\)\s*\)\s*\}/gm,
    "$1"
  );

  return out.trim();
}

function wrapInSection(innerHtml) {
  // Ocean Professional: gradient bg scaffold
  const scaffoldClasses = "min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50";
  return `<section class="${scaffoldClasses}">
${innerHtml}
</section>`;
}

/**
 * PUBLIC_INTERFACE
 * PreviewCard
 * Card that shows a Preview tab by default and a Code tab which displays the exact Tailwind Play–ready HTML snippet.
 * Copy button copies the same exact snippet (no JSX conversion in display other than the normalization above).
 */
export default function PreviewCard({ title, description, preview, code }) {
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  // Build the exact HTML snippet wrapped in <section>…</section>.
  const htmlSnippet = useMemo(() => ensureSectionWrappedHtml(code || ""), [code]);

  const handleCopy = async () => {
    const text = htmlSnippet;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // eslint-disable-next-line no-alert
      alert("Failed to copy");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden transition hover:shadow-lg">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
        <div>
          {title ? (
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          ) : (
            <h3 className="text-base font-semibold text-gray-900">Preview</h3>
          )}
          {description ? (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          ) : null}
        </div>
        {/* Tabs */}
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`px-3 py-1.5 text-sm rounded-md transition ${
              activeTab === "preview"
                ? "bg-blue-50 text-ocean-primary"
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
                ? "bg-blue-50 text-ocean-primary"
                : "text-gray-700 hover:text-ocean-primary"
            }`}
            aria-pressed={activeTab === "code"}
          >
            Code
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {activeTab === "preview" && (
          <div className="rounded-xl border border-gray-100 p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
            {/* The preview expects a <section> inside for consistency */}
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

        {activeTab === "code" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs text-gray-600">
                Tailwind Play–ready snippet (single &lt;section&gt; root)
              </div>
            </div>

            <CodeViewer code={htmlSnippet} language="html" initiallyOpen showCopy />
          </div>
        )}
      </div>
    </div>
  );
}
