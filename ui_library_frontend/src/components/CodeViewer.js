import React, { useEffect, useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup"; // html
import "prismjs/themes/prism.css";

/**
 * Copy helper with Clipboard API + textarea fallback (for older browsers / http origins).
 * Returns a Promise resolved on success and rejected on error.
 */
async function copyText(text) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // fall-through to textarea method
    }
  }
  return new Promise((resolve, reject) => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      if (ok) resolve();
      else reject(new Error("execCommand copy failed"));
    } catch (e) {
      reject(e);
    }
  });
}

// PUBLIC_INTERFACE
export default function CodeViewer({
  code = "",
  language = "jsx",
  initiallyOpen = false,
  showCopy = false,
  onCopy, // optional external copy handler; if provided, it will be used
}) {
  /** Toggleable code viewer with syntax highlighting; lightweight via PrismJS */
  const [open, setOpen] = useState(initiallyOpen);
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    try {
      const grammar = Prism.languages[language] || Prism.languages.jsx;
      return Prism.highlight(code.trim(), grammar, language);
    } catch {
      return code;
    }
  }, [code, language]);

  useEffect(() => {
    Prism.highlightAll();
  }, [open, highlighted]);

  const handleCopy = async () => {
    const text = String(code ?? "");
    try {
      if (typeof onCopy === "function") {
        await onCopy(text);
      } else {
        await copyText(text);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // eslint-disable-next-line no-alert
      alert("Failed to copy");
    }
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="text-xs font-semibold tracking-wider text-gray-600 uppercase">Code</div>
        <div className="flex items-center gap-2">
          {showCopy && (
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-md bg-white text-gray-700 border border-gray-200 hover:shadow transition ${
                copied ? "ring-2 ring-blue-500/30" : ""
              }`}
              aria-label="Copy code snippet"
              title="Copy snippet"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                className={copied ? "text-green-600" : "text-ocean-primary"}
                fill="currentColor"
                aria-hidden="true"
              >
                {copied ? (
                  <path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                ) : (
                  <path d="M8 7a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2V7zm-3 3h1v7a3 3 0 0 0 3 3h8v1a2 2 0 0 1-2 2H6a4 4 0 0 1-4-4v-7a2 2 0 0 1 2-2z" />
                )}
              </svg>
              <span className="font-medium">{copied ? "Copied" : "Copy"}</span>
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="text-sm px-3 py-1 rounded-md bg-white text-gray-700 border border-gray-200 hover:shadow transition"
            aria-expanded={open}
          >
            {open ? "Hide" : "Show"} code
          </button>
        </div>
      </div>
      {open && (
        <div className="relative bg-gray-900">
          <pre className="overflow-auto code-scrollbar text-sm leading-6">
            <code
              className={`language-${language} block p-4 text-gray-100`}
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </pre>
        </div>
      )}
    </div>
  );
}
