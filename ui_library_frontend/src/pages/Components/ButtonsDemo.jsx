import React from "react";
import { Button } from "../../components/ui";

/**
 * PUBLIC_INTERFACE
 * ButtonsDemo displays the reusable Button component variants and sizes.
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

  return (
    <div className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-gray-900">Primary</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
          <Button size="md" variant="primary" disabled>
            Disabled
          </Button>
          <Button size="md" variant="primary" loading>
            Loading
          </Button>
          <Button size="md" variant="primary" leftIcon={LeftIcon}>
            With Left Icon
          </Button>
          <Button size="md" variant="primary" rightIcon={RightIcon}>
            With Right Icon
          </Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900">Secondary</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="secondary">Small</Button>
          <Button size="md" variant="secondary">Medium</Button>
          <Button size="lg" variant="secondary">Large</Button>
          <Button size="md" variant="secondary" disabled>
            Disabled
          </Button>
          <Button size="md" variant="secondary" loading>
            Loading
          </Button>
          <Button size="md" variant="secondary" leftIcon={LeftIcon}>
            With Left Icon
          </Button>
          <Button size="md" variant="secondary" rightIcon={RightIcon}>
            With Right Icon
          </Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900">Outline</h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="outline">Small</Button>
          <Button size="md" variant="outline">Medium</Button>
          <Button size="lg" variant="outline">Large</Button>
          <Button size="md" variant="outline" disabled>
            Disabled
          </Button>
          <Button size="md" variant="outline" loading>
            Loading
          </Button>
          <Button size="md" variant="outline" leftIcon={LeftIcon}>
            With Left Icon
          </Button>
          <Button size="md" variant="outline" rightIcon={RightIcon}>
            With Right Icon
          </Button>
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold text-gray-900">Full Width</h3>
        <div className="mt-3 space-y-3">
          <Button size="md" variant="primary" fullWidth>
            Primary full width
          </Button>
          <Button size="md" variant="secondary" fullWidth>
            Secondary full width
          </Button>
          <Button size="md" variant="outline" fullWidth>
            Outline full width
          </Button>
        </div>
      </section>
    </div>
  );
}
