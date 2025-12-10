import React, { useMemo, useState } from "react";
import { Button } from "../../components/ui";
import CodeViewer from "../../components/CodeViewer";

/**
 * PUBLIC_INTERFACE
 * ButtonsDemo renders reusable Button variants using the same <section> pattern as other components.
 * The code snippet is programmatically derived from the same JSX used in the preview, but trimmed
 * so that it only includes the root <section> element and its contents (no imports, icon consts,
 * or wrapper components). If icons are used, the snippet inlines their SVGs inside the <section>.
 */
export default function ButtonsDemo() {
  // Small inline icons used in previews (React elements for live preview)
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
      buttons: [
        { size: "sm", variant: "primary", children: "Small" },
        { size: "md", variant: "primary", children: "Medium" },
        { size: "lg", variant: "primary", children: "Large" },
        { size: "md", variant: "primary", disabled: true, children: "Disabled" },
        { size: "md", variant: "primary", loading: true, children: "Loading" },
        { size: "md", variant: "primary", leftIcon: true, children: "With Left Icon" },
        { size: "md", variant: "primary", rightIcon: true, children: "With Right Icon" },
      ],
    },
    {
      heading: "Secondary",
      wrapperClass: "flex flex-wrap items-center gap-3",
      buttons: [
        { size: "sm", variant: "secondary", children: "Small" },
        { size: "md", variant: "secondary", children: "Medium" },
        { size: "lg", variant: "secondary", children: "Large" },
        { size: "md", variant: "secondary", disabled: true, children: "Disabled" },
        { size: "md", variant: "secondary", loading: true, children: "Loading" },
        { size: "md", variant: "secondary", leftIcon: true, children: "With Left Icon" },
        { size: "md", variant: "secondary", rightIcon: true, children: "With Right Icon" },
      ],
    },
    {
      heading: "Outline",
      wrapperClass: "flex flex-wrap items-center gap-3",
      buttons: [
        { size: "sm", variant: "outline", children: "Small" },
        { size: "md", variant: "outline", children: "Medium" },
        { size: "lg", variant: "outline", children: "Large" },
        { size: "md", variant: "outline", disabled: true, children: "Disabled" },
        { size: "md", variant: "outline", loading: true, children: "Loading" },
        { size: "md", variant: "outline", leftIcon: true, children: "With Left Icon" },
        { size: "md", variant: "outline", rightIcon: true, children: "With Right Icon" },
      ],
    },
    {
      heading: "Full Width",
      wrapperClass: "space-y-3",
      buttons: [
        { size: "md", variant: "primary", fullWidth: true, children: "Primary full width" },
        { size: "md", variant: "secondary", fullWidth: true, children: "Secondary full width" },
        { size: "md", variant: "outline", fullWidth: true, children: "Outline full width" },
      ],
    },
  ];

  // Live preview renderer (unchanged)
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

  // Serialize the same structure to an effective JSX string trimmed to the root <section>
  // We inline icons as SVG within the section so the snippet is self-contained.
  const serializeButton = (b) => {
    const base =
      'className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-sm"';

    const size = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-sm",
      lg: "px-5 py-2.5 text-base",
    }[b.size || "md"];

    const variant =
      b.variant === "secondary"
        ? "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500"
        : b.variant === "outline"
        ? "border border-blue-600 text-blue-700 bg-transparent hover:bg-blue-50 focus:ring-blue-500"
        : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500";

    const width = b.fullWidth ? "w-full" : "";
    const disabled = b.disabled ? " disabled" : "";
    const ariaDisabled = b.disabled ? ' aria-disabled={true}' : "";
    const ariaBusy = b.loading ? ' aria-busy={true}' : "";

    const spinner = b.loading
      ? '<span className="inline-block h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin" aria-hidden="true" /> '
      : "";

    const leftSvg = b.leftIcon
      ? `<span className="mr-2 -ml-1 inline-flex items-center" aria-hidden="true">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
</span>`
      : "";

    const rightSvg = b.rightIcon
      ? `<span className="ml-2 -mr-1 inline-flex items-center" aria-hidden="true">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-90">
    <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" />
  </svg>
</span>`
      : "";

    const classes = [base.replace('className="', "").replace('"', ""), size, variant, width]
      .filter(Boolean)
      .join(" ");

    // Construct inner content
    const content = `${spinner}<span>${b.children}</span>`;

    return `<button className="${classes}"${disabled}${ariaDisabled}${ariaBusy}>${leftSvg}<span className="inline-flex items-center gap-2">${content}</span>${rightSvg}</button>`;
  };

  const buildSectionSnippetOnly = (group) => {
    const inner = group.buttons.map(serializeButton).join("\n        ");
    return [
      "<section>",
      `  <div className="${group.wrapperClass}">`,
      `        ${inner}`,
      "  </div>",
      "</section>",
    ].join("\n");
  };

  const sections = useMemo(() => {
    return exampleGroups.map((g) => {
      const preview = (
        <section>
          <div className={g.wrapperClass}>
            {g.buttons.map((b, i) => renderBtn(b, i))}
          </div>
        </section>
      );
      const code = buildSectionSnippetOnly(g);
      return { heading: g.heading, preview, code };
    });
  }, []); // config is static

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
        aria-label="Copy section snippet"
        title="Copy section snippet"
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
            {/* Show only the <section>…</section> snippet. Keep JSX language for highlighting. */}
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
