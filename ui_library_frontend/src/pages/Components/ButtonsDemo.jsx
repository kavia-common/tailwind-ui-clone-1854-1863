import React, { useMemo, useState } from "react";
import { Button } from "../../components/ui";
import CodeViewer from "../../components/CodeViewer";

/**
 * PUBLIC_INTERFACE
 * ButtonsDemo displays the reusable Button component variants and sizes,
 * and shows an exact JSX code snippet per section with copyable, syntax-highlighted code.
 */
export default function ButtonsDemo() {
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

  // Build exact JSX snippets that match the live examples below.
  const primaryCode = `
import { Button } from "@/components/ui";

const LeftIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const RightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" />
  </svg>
);

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
      <Button size="md" variant="primary" disabled>Disabled</Button>
      <Button size="md" variant="primary" loading>Loading</Button>
      <Button size="md" variant="primary" leftIcon={LeftIcon}>With Left Icon</Button>
      <Button size="md" variant="primary" rightIcon={RightIcon}>With Right Icon</Button>
    </div>
  );
}
`.trim();

  const secondaryCode = `
import { Button } from "@/components/ui";

const LeftIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const RightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" />
  </svg>
);

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" variant="secondary">Small</Button>
      <Button size="md" variant="secondary">Medium</Button>
      <Button size="lg" variant="secondary">Large</Button>
      <Button size="md" variant="secondary" disabled>Disabled</Button>
      <Button size="md" variant="secondary" loading>Loading</Button>
      <Button size="md" variant="secondary" leftIcon={LeftIcon}>With Left Icon</Button>
      <Button size="md" variant="secondary" rightIcon={RightIcon}>With Right Icon</Button>
    </div>
  );
}
`.trim();

  const outlineCode = `
import { Button } from "@/components/ui";

const LeftIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
  </svg>
);

const RightIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 4l1.41 1.41L8.83 10H20v2H8.83l4.58 4.59L12 18l-8-8 8-8z" />
  </svg>
);

export function Example() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" variant="outline">Small</Button>
      <Button size="md" variant="outline">Medium</Button>
      <Button size="lg" variant="outline">Large</Button>
      <Button size="md" variant="outline" disabled>Disabled</Button>
      <Button size="md" variant="outline" loading>Loading</Button>
      <Button size="md" variant="outline" leftIcon={LeftIcon}>With Left Icon</Button>
      <Button size="md" variant="outline" rightIcon={RightIcon}>With Right Icon</Button>
    </div>
  );
}
`.trim();

  const fullWidthCode = `
import { Button } from "@/components/ui";

export function Example() {
  return (
    <div className="space-y-3">
      <Button size="md" variant="primary" fullWidth>Primary full width</Button>
      <Button size="md" variant="secondary" fullWidth>Secondary full width</Button>
      <Button size="md" variant="outline" fullWidth>Outline full width</Button>
    </div>
  );
}
`.trim();

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

  // Memoize previews so icons aren't recreated unnecessarily in children
  const PrimaryPreview = useMemo(() => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" variant="primary">Small</Button>
      <Button size="md" variant="primary">Medium</Button>
      <Button size="lg" variant="primary">Large</Button>
      <Button size="md" variant="primary" disabled>Disabled</Button>
      <Button size="md" variant="primary" loading>Loading</Button>
      <Button size="md" variant="primary" leftIcon={LeftIcon}>With Left Icon</Button>
      <Button size="md" variant="primary" rightIcon={RightIcon}>With Right Icon</Button>
    </div>
  ), []); // icons are static

  const SecondaryPreview = useMemo(() => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" variant="secondary">Small</Button>
      <Button size="md" variant="secondary">Medium</Button>
      <Button size="lg" variant="secondary">Large</Button>
      <Button size="md" variant="secondary" disabled>Disabled</Button>
      <Button size="md" variant="secondary" loading>Loading</Button>
      <Button size="md" variant="secondary" leftIcon={LeftIcon}>With Left Icon</Button>
      <Button size="md" variant="secondary" rightIcon={RightIcon}>With Right Icon</Button>
    </div>
  ), []);

  const OutlinePreview = useMemo(() => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" variant="outline">Small</Button>
      <Button size="md" variant="outline">Medium</Button>
      <Button size="lg" variant="outline">Large</Button>
      <Button size="md" variant="outline" disabled>Disabled</Button>
      <Button size="md" variant="outline" loading>Loading</Button>
      <Button size="md" variant="outline" leftIcon={LeftIcon}>With Left Icon</Button>
      <Button size="md" variant="outline" rightIcon={RightIcon}>With Right Icon</Button>
    </div>
  ), []);

  const FullWidthPreview = useMemo(() => (
    <div className="space-y-3">
      <Button size="md" variant="primary" fullWidth>Primary full width</Button>
      <Button size="md" variant="secondary" fullWidth>Secondary full width</Button>
      <Button size="md" variant="outline" fullWidth>Outline full width</Button>
    </div>
  ), []);

  return (
    <div className="space-y-8">
      <SnippetSection heading="Primary"   preview={PrimaryPreview}   code={primaryCode} />
      <SnippetSection heading="Secondary" preview={SecondaryPreview} code={secondaryCode} />
      <SnippetSection heading="Outline"   preview={OutlinePreview}   code={outlineCode} />
      <SnippetSection heading="Full Width" preview={FullWidthPreview} code={fullWidthCode} />
    </div>
  );
}
