import React, { useMemo, useState } from "react";
import CodeViewer from "./CodeViewer";

/**
 * Build a Tailwind Play–ready snippet from provided html and optional assets.
 * Ensures preserved indentation and a minimal wrapper if not provided.
 */
// PUBLIC_INTERFACE
export function buildTailwindPlaySnippet({ html, extraCss = "", extraJs = "" }) {
  const headerLines = [
    "/* Tailwind Play: https://play.tailwindcss.com/ */",
    extraCss.trim() ? "/* extra CSS included below */" : "",
    extraJs.trim() ? "/* extra JS included below */" : "",
  ].filter(Boolean);
  const header = headerLines.join("\n");

  const body = html && html.trim().length ? html.trim() : '<div class="p-4">Hello Tailwind</div>';

  const parts = [header, header ? "" : "", body];
  if (extraCss.trim()) {
    parts.push("", "/* --- extra CSS ---", extraCss.trim(), "--- end extra CSS --- */");
  }
  if (extraJs.trim()) {
    parts.push("", "/* --- extra JS ---", extraJs.trim(), "--- end extra JS --- */");
  }
  return parts.filter((p, i, a) => !(p === "" && a[i - 1] === "")).join("\n");
}

/**
 * Attempt to convert common JSX/TSX fragments into HTML-friendly Tailwind markup.
 * - Converts className -> class
 * - Removes export wrapper and outer return() if present
 * - Replaces <>...</> fragments with a minimal div wrapper
 * - Naively unwraps array .map(...) blocks keeping inner node example
 * - Strips {"text"} and {children}
 */
// PUBLIC_INTERFACE
export function jsxLikeToHtmlSnippet(input = "") {
  if (!input) return "";
  let out = String(input);

  // Remove export function wrapper before the return(
  out = out.replace(/export\s+function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{\s*[\s\S]*?return\s*\(\s*/m, "");
  // Remove the trailing )};
  out = out.replace(/\)\s*;?\s*\}\s*$/m, "");

  // Replace className with class
  out = out.replace(/className=/g, "class=");

  // Replace simple fragments with a wrapper
  out = out.replace(/<>/g, '<div class="p-4">').replace(/<\/>/g, "</div>");

  // Expand self-closing elements into explicit closing for non-void tags
  out = out.replace(/<([a-zA-Z]+)([^>]*)\s\/>/g, "<$1$2></$1>");

  // Strip {children}
  out = out.replace(/\{\s*children\s*\}/g, "");
  // Replace {"text"} or {'text'} or {`text`} with text
  out = out.replace(/\{\s*["'`](.*?)["'`]\s*\}/g, "$1");

  // Replace { array.map(() => ( ... )) } with inner content (naive)
  out = out.replace(/\{\s*[^}]*?\.map\([^)]*?=>\s*\(\s*([\s\S]*?)\s*\)\s*\)\s*\}/gm, "$1");

  const trimmed = out.trim();

  // If it already starts with an element, return it
  if (/^<([a-z-]+)(\s|>)/i.test(trimmed)) {
    return trimmed;
  }
  // Otherwise wrap it to ensure it's valid in Play
  return `<div class="p-4">\n${trimmed}\n</div>`;
}

// PUBLIC_INTERFACE
export default function PreviewCard({ title, description, preview, code, language = "jsx" }) {
  /**
   * Card component that displays a live preview and a toggleable code viewer.
   * - Top-right segmented toggle between "Preview" and "Code"
   * - Defaults to "Preview"
   * - Code pane includes a copy-to-clipboard button
   * - Copy button now copies a Tailwind Play–ready HTML snippet
   */
  const [activeTab, setActiveTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  const playSnippet = useMemo(() => {
    const raw = (code || "").trim();

    const looksHtml =
      /class="/.test(raw) ||
      /<\s*(div|button|section|ul|li|span|header|footer)\b/i.test(raw);

    const htmlCandidate = looksHtml ? raw : jsxLikeToHtmlSnippet(raw);
    return buildTailwindPlaySnippet({ html: htmlCandidate });
  }, [code]);

  const handleCopy = async () => {
    const text = playSnippet;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && navigator.clipboard.writeText) {
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
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm transition ${copied ? "ring-2 ring-blue-500/30" : ""}`}
        aria-label="Copy Tailwind Play snippet to clipboard"
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
    ),
    [copied, playSnippet]
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
          <CodeViewer code={code} language={language} initiallyOpen={true} />
        </div>
      )}
    </div>
  );
}
