import React, { useMemo, useState } from "react";
import { Button } from "../../components/ui";
import CodeViewer from "../../components/CodeViewer";

/**
 * PUBLIC_INTERFACE
 * ButtonsDemo renders reusable Button variants using the same <section> pattern as other components.
 * The code snippet is programmatically derived from the same JSX structure used to render the preview,
 * ensuring exact parity. It follows the same Preview/Code tabs and header layout convention.
 */
export default function ButtonsDemo() {
  // Small inline icons used in examples (same instances used for preview and code generation)
  const LeftIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
      <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
    </svg>
  );
  const RightIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
      <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" />
    </svg>
  );

  /**
   * Config describing all examples. This is the single source of truth used for both preview and snippet.
   * Each group has a heading, a wrapperClass applied to the inner container, and a list of Button props.
   */
  const exampleGroups = [
    {
      heading: "Primary",
      wrapperClass: "flex flex-wrap items-center gap-3",
      importPath: "@/components/ui",
      buttons: [
        { size: "sm", variant: "primary", children: "Small" },
        { size: "md", variant: "primary", children: "Medium" },
        { size: "lg", variant: "primary", children: "Large" },
        { size: "md", variant: "primary", disabled: true, children: "Disabled" },
        { size: "md", variant: "primary", loading: true, children: "Loading" },
        { size: "md", variant: "primary", leftIcon: "LeftIcon", children: "With Left Icon" },
        { size: "md", variant: "primary", rightIcon: "RightIcon", children: "With Right Icon" },
      ],
    },
    {
      heading: "Secondary",
      wrapperClass: "flex flex-wrap items-center gap-3",
      importPath: "@/components/ui",
      buttons: [
        { size: "sm", variant: "secondary", children: "Small" },
        { size: "md", variant: "secondary", children: "Medium" },
        { size: "lg", variant: "secondary", children: "Large" },
        { size: "md", variant: "secondary", disabled: true, children: "Disabled" },
        { size: "md", variant: "secondary", loading: true, children: "Loading" },
        { size: "md", variant: "secondary", leftIcon: "LeftIcon", children: "With Left Icon" },
        { size: "md", variant: "secondary", rightIcon: "RightIcon", children: "With Right Icon" },
      ],
    },
    {
      heading: "Outline",
      wrapperClass: "flex flex-wrap items-center gap-3",
      importPath: "@/components/ui",
      buttons: [
        { size: "sm", variant: "outline", children: "Small" },
        { size: "md", variant: "outline", children: "Medium" },
        { size: "lg", variant: "outline", children: "Large" },
        { size: "md", variant: "outline", disabled: true, children: "Disabled" },
        { size: "md", variant: "outline", loading: true, children: "Loading" },
        { size: "md", variant: "outline", leftIcon: "LeftIcon", children: "With Left Icon" },
        { size: "md", variant: "outline", rightIcon: "RightIcon", children: "With Right Icon" },
      ],
    },
    {
      heading: "Full Width",
      wrapperClass: "space-y-3",
      importPath: "@/components/ui",
      buttons: [
        { size: "md", variant: "primary", fullWidth: true, children: "Primary full width" },
        { size: "md", variant: "secondary", fullWidth: true, children: "Secondary full width" },
        { size: "md", variant: "outline", fullWidth: true, children: "Outline full width" },
      ],
    },
  ];

  // Strict prop order helper used for both rendering (props order not visible) and snippet generation (visible)
  const propsInOrder = (b) => {
    const ordered = [];
    if (b.size) ordered.push(['size', `"${b.size}"`]);
    if (b.variant) ordered.push(['variant', `"${b.variant}"`]);
    if (b.disabled) ordered.push(['disabled', null]);
    if (b.loading) ordered.push(['loading', null]);
    if (b.fullWidth) ordered.push(['fullWidth', null]);
    if (b.leftIcon) ordered.push(['leftIcon', '{LeftIcon}']);
    if (b.rightIcon) ordered.push(['rightIcon', '{RightIcon}']);
    return ordered;
  };

  // Live preview renderer
  const renderBtn = (cfg, idx) => (
    <Button
      key={idx}
      size={cfg.size}
      variant={cfg.variant}
      disabled={!!cfg.disabled}
      loading={!!cfg.loading}
      fullWidth={!!cfg.fullWidth}
      leftIcon={cfg.leftIcon ? LeftIcon : undefined}
      rightIcon={cfg.rightIcon ? RightIcon : undefined}
    >
      {cfg.children}
    </Button>
  );

  // Programmatically derive the JSX snippet from the same configuration and ensure <section> wrapper
  const buildSectionJsxSnippet = (group) => {
    const importLine = `import { Button } from "${group.importPath}";`;

    // Only include icons if any button needs them
    const needsIcons = group.buttons.some((b) => b.leftIcon || b.rightIcon);
    const iconBlock = needsIcons
      ? `const LeftIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const RightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" />
  </svg>
);`
      : "";

    const buttonLine = (b) => {
      const parts = propsInOrder(b).map(([k, v]) => (v === null ? k : `${k}=${v}`));
      const propsStr = parts.length ? " " + parts.join(" ") : "";
      return `        <Button${propsStr}>${b.children}</Button>`;
    };

    // The derived snippet follows the same <section> ... <div className={wrapperClass}> ... pattern
    const lines = [
      importLine,
      "",
      ...(iconBlock ? [iconBlock, ""] : []),
      "export function Example() {",
      "  return (",
      '    <section>',
      `      <div className="${group.wrapperClass}">`,
      ...group.buttons.map(buttonLine),
      "      </div>",
      "    </section>",
      "  );",
      "}",
    ];

    return lines.join("\n").trim();
  };

  // Build memoized sections with preview JSX and the derived code string
  const sections = useMemo(() => {
    return exampleGroups.map((g) => {
      const preview = (
        <section>
          <div className={g.wrapperClass}>
            {g.buttons.map((b, i) => renderBtn(b, i))}
          </div>
        </section>
      );
      const code = buildSectionJsxSnippet(g);
      return { heading: g.heading, preview, code };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // configs are static

  // Reusable copy hook (pattern consistent with PreviewCard behavior)
  const useCopy = () => {
    const [copied, setCopied] = useState(false);
    const copy = async (text) => {
      try {
        if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const t = document.createElement("textarea");
          t.value = text;
          t.setAttribute("readonly", "");
          t.style.position = "absolute";
          t.style.left = "-9999px";
          document.body.appendChild(t);
          t.select();
          document.execCommand("copy");
          document.body.removeChild(t);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      } catch {
        // eslint-disable-next-line no-alert
        alert("Failed to copy");
      }
    };
    return { copied, copy };
  };

  // Inline section renderer matching the library's Preview/Code tabs UI and spacing
  const SnippetSection = ({ heading, preview, code }) => {
    const [tab, setTab] = useState("preview");
    const { copied, copy } = useCopy();

    const CopyBtn = (
      <button
        type="button"
        onClick={() => copy(code)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm transition ${
          copied ? "ring-2 ring-blue-500/30" : ""
        }`}
        aria-label="Copy JSX snippet"
        title="Copy JSX snippet"
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
        <span className="text-sm font-medium">{copied ? "Copied" : "Copy"}</span>
      </button>
    );

    return (
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
          <div className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5">
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={`px-3 py-1.5 text-sm rounded-md transition ${
                tab === "preview" ? "bg-white text-ocean-primary shadow-sm" : "text-gray-700 hover:text-ocean-primary"
              }`}
              aria-pressed={tab === "preview"}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setTab("code")}
              className={`px-3 py-1.5 text-sm rounded-md transition ${
                tab === "code" ? "bg-white text-ocean-primary shadow-sm" : "text-gray-700 hover:text-ocean-primary"
              }`}
              aria-pressed={tab === "code"}
            >
              Code
            </button>
          </div>
        </div>

        {tab === "preview" && (
          <div className="mt-3 rounded-xl border border-gray-100 p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
            {preview}
          </div>
        )}

        {tab === "code" && (
          <div className="mt-3">
            <div className="mb-3 flex items-center justify-end">{CopyBtn}</div>
            <CodeViewer code={code} language="jsx" initiallyOpen />
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="space-y-8">
      {sections.map((s) => (
        <SnippetSection key={s.heading} heading={s.heading} preview={s.preview} code={s.code} />
      ))}
    </div>
  );
}
