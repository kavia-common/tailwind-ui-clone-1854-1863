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
  const isHtml = /\<\s*(section|div|button|ul|li|span|header|footer|a|p|h[1-6])\b/i.test(html) || /class="/.test(html);
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
  out = out.replace(/export\s+(default\s+)?function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{\s*[\s\S]*?return\s*\(\s*/m, "");
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
  out = out.replace(/\{\s*[^}]*?\.map\([^)]*?=>\s*\(\s*([\s\S]*?)\s*\)\s*\)\s*\}/gm, "$1");

  return out.trim();
}

function wrapInSection(innerHtml) {
  // Ocean Professional: gradient bg scaffold
  const scaffoldClasses = "min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50";
  return `<section class="${scaffoldClasses}">
${innerHtml}
</section>`;
}

// PUBLIC_INTERFACE
export default function PreviewCard({ title, description, preview, code }) {
  /**
   * Card that shows Preview by default and a Code tab which displays the exact Tailwind Play–ready HTML snippet.
   * Copy button copies the same exact snippet (no JSX conversion in display).
   */
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

  const CopyButton = (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm transition ${copied ? "ring-2 ring-blue-500/30" : ""}`}
      aria-label="Copy Tailwind Play HTML snippet to clipboard"
      title="Copy Tailwind Play snippet"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" className={copied ? "text-green-600" : "text-ocean-primary"} fill="currentColor" aria-hidden="true">
        {copied ? (
          <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
        ) : (
          <path d="M8 7a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V7zm-3 3h1v7a3 3 0 0 0 3 3h8v1a2 2 0 0 1-2 2H6a4 4 0 0 1-4-4v-7a2 2 0 0 1 2-2z"/>
        )}
      </svg>
      <span className="text-sm font-medium">{copied ? "Copied" : "Copy"}</span>
    </button>
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
            {CopyButton}
          </div>
          {/* Show the exact HTML snippet, not JSX. Use html language for highlighting. */}
          <CodeViewer code={htmlSnippet} language="html" initiallyOpen={true} />
        </div>
      )}
    </div>
  );
}
