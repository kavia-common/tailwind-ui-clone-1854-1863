import React, { useMemo, useState } from "react";
import { Button } from "../../components/ui";
import CodeViewer from "../../components/CodeViewer";

/**
 * PUBLIC_INTERFACE
 * ButtonsDemo displays the reusable Button component variants and sizes,
 * and shows JSX code snippets that are generated from the exact same data used to render the preview.
 * This guarantees 1:1 parity between what users see and what they copy.
 */
export default function ButtonsDemo() {
  // Icons used in examples
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
   * Define a single source of truth for all examples.
   * Each group has:
   * - heading: section title
   * - wrapperClass: container className for the buttons within the preview <section>
   * - buttons: ordered list of Button props and inner text
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

  // Helper to render a Button from config (for the live preview)
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

  // Convert group config into a JSX snippet string that mirrors the rendered preview exactly.
  const buildJsxSnippet = (group) => {
    const importLine = `import { Button } from "${group.importPath}";`;

    const iconBlock =
`const LeftIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const RightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" />
  </svg>
);`;

    // Build each <Button ...>Text</Button> line ensuring prop ordering and values match render
    const btnToLine = (b) => {
      const props = [];
      // Maintain consistent prop order: size, variant, disabled, loading, fullWidth, leftIcon, rightIcon
      if (b.size) props.push(`size="${b.size}"`);
      if (b.variant) props.push(`variant="${b.variant}"`);
      if (b.disabled) props.push("disabled");
      if (b.loading) props.push("loading");
      if (b.fullWidth) props.push("fullWidth");
      if (b.leftIcon) props.push("leftIcon={LeftIcon}");
      if (b.rightIcon) props.push("rightIcon={RightIcon}");
      const propsStr = props.length ? " " + props.join(" ") : "";
      return `      <Button${propsStr}>${b.children}</Button>`;
    };

    const needsIcons = group.buttons.some((b) => b.leftIcon || b.rightIcon);

    const lines = [
      importLine,
      "",
      ...(needsIcons ? [iconBlock, ""] : []),
      "export function Example() {",
      "  return (",
      `    <div className="${group.wrapperClass}">`,
      ...group.buttons.map(btnToLine),
      "    </div>",
      "  );",
      "}",
    ];

    return lines.join("\n").trim();
  };

  // Build memoized previews and their code from the same config
  const sections = useMemo(() => {
    return exampleGroups.map((g) => {
      const preview = (
        <div className={g.wrapperClass}>
          {g.buttons.map((b, i) => renderBtn(b, i))}
        </div>
      );
      const code = buildJsxSnippet(g);
      return { heading: g.heading, preview, code };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // all configs are static

  // local copy helper (mirrors PreviewCard copy)
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

  // Section component to render preview + code tab, consistent with app catalog conventions.
  const SnippetSection = ({ heading, preview, code }) => {
    const [tab, setTab] = useState("preview");
    const { copied, copy } = useCopy();

    const CopyBtn = (
      <button
        type="button"
        onClick={() => copy(code)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm transition ${copied ? "ring-2 ring-blue-500/30" : ""}`}
        aria-label="Copy JSX snippet"
        title="Copy JSX snippet"
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
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{heading}</h3>
          <div className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5">
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={`px-3 py-1.5 text-sm rounded-md transition ${tab === "preview" ? "bg-white text-ocean-primary shadow-sm" : "text-gray-700 hover:text-ocean-primary"}`}
            >
              Preview
            </button>
            <button
              type="button"
              onClick={() => setTab("code")}
              className={`px-3 py-1.5 text-sm rounded-md transition ${tab === "code" ? "bg-white text-ocean-primary shadow-sm" : "text-gray-700 hover:text-ocean-primary"}`}
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

  // Render all sections based on single source of truth
  return (
    <div className="space-y-8">
      {sections.map((s) => (
        <SnippetSection key={s.heading} heading={s.heading} preview={s.preview} code={s.code} />
      ))}
    </div>
  );
}
