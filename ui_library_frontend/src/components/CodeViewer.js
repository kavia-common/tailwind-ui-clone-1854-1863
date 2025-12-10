import React, { useEffect, useMemo, useState } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markup"; // html
import "prismjs/themes/prism.css";

// PUBLIC_INTERFACE
export default function CodeViewer({ code = "", language = "jsx", initiallyOpen = false }) {
  /** Toggleable code viewer with syntax highlighting; lightweight via PrismJS */
  const [open, setOpen] = useState(initiallyOpen);
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

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
        <div className="text-xs font-semibold tracking-wider text-gray-600 uppercase">Code</div>
        <button
          onClick={() => setOpen(!open)}
          className="text-sm px-3 py-1 rounded-md bg-white text-gray-700 border border-gray-200 hover:shadow transition"
          aria-expanded={open}
        >
          {open ? "Hide" : "Show"} code
        </button>
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
