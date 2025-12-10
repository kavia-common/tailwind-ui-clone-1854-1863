import React from "react";

/**
 * PUBLIC_INTERFACE
 * Button component with Ocean Professional theme variants and sizes.
 * Supports:
 * - variant: 'primary' | 'secondary' | 'outline'
 * - size: 'sm' | 'md' | 'lg'
 * - disabled, loading, fullWidth, className overrides
 * - leftIcon, rightIcon
 * - type: 'button' | 'submit' | 'reset' (default 'button')
 *
 * Accessibility:
 * - aria-disabled when disabled
 * - aria-busy when loading
 * - focus ring and keyboard operable
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
  leftIcon = null,
  rightIcon = null,
  type = "button",
  onClick,
  ...rest
}) {
  const isDisabled = disabled || loading;

  // Base styles with smooth transitions and rounded corners
  const base =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";

  // Sizes
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
  };

  // Variants aligned with theme
  // Colors map to: primary #2563EB (blue-600), secondary #F59E0B (amber-500)
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500",
    outline:
      "border border-blue-600 text-blue-700 bg-transparent hover:bg-blue-50 focus:ring-blue-500",
  };

  // Width
  const widthClass = fullWidth ? "w-full" : "";

  const composed =
    [
      base,
      sizes[size] || sizes.md,
      variants[variant] || variants.primary,
      widthClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <button
      type={type}
      onClick={onClick}
      className={composed}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {/* Left icon */}
      {leftIcon ? (
        <span className="mr-2 -ml-1 inline-flex items-center" aria-hidden="true">
          {leftIcon}
        </span>
      ) : null}

      {/* Content with loading spinner */}
      <span className="inline-flex items-center gap-2">
        {loading && (
          <span
            className="inline-block h-4 w-4 rounded-full border-2 border-white/50 border-t-white animate-spin"
            aria-hidden="true"
          />
        )}
        <span>{children}</span>
      </span>

      {/* Right icon */}
      {rightIcon ? (
        <span className="ml-2 -mr-1 inline-flex items-center" aria-hidden="true">
          {rightIcon}
        </span>
      ) : null}
    </button>
  );
}
