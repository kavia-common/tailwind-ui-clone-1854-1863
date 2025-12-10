import React from "react";
import { Button } from "../../components/ui";
import PreviewCard from "../../components/PreviewCard";

/**
 * PUBLIC_INTERFACE
 * ButtonsDemo renders reusable Button variants with Preview/Code tabs via PreviewCard.
 * Code tab shows a programmatically derived, section-only snippet with a single copy button.
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

  return (
    <div className="space-y-8">
      {exampleGroups.map((g) => (
        <PreviewCard
          key={g.heading}
          title={g.heading}
          description="Live preview and code"
          preview={
            <section>
              <div className={g.wrapperClass}>
                {g.buttons.map((b, i) => renderBtn(b, i))}
              </div>
            </section>
          }
          // Let PreviewCard derive a section-only snippet
          language="markup"
        />
      ))}
    </div>
  );
}
