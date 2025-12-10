import React, { useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PreviewCard from "../components/PreviewCard";

/**
 * BlocksLibrary
 * PUBLIC_INTERFACE
 * UI Blocks explorer with:
 * - Grouped sidebar entries for all requested blocks
 * - For each item: a live preview and a Tailwind-only <section>-wrapped code snippet
 * - Ocean Professional theme styling consistent with existing Hero pattern and ComponentsLibrary
 */
export default function BlocksLibrary() {
  // Helpers
  const shell = (inner) =>
    [
      `<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">`,
      inner,
      `</section>`,
    ].join("\n");

  // Catalog definition following "Hero section" naming/casing and structure
  const catalog = useMemo(
    () => [
      {
        key: "hero",
        label: "Hero section",
        items: [
          {
            slug: "hero-section",
            title: "Hero section",
            description:
              "Large marketing header with title, copy, and calls to action.",
            preview: (
              <section>
                <div className="mx-auto max-w-3xl text-center">
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                    Build faster with Ocean UI
                  </h1>
                  <p className="mt-3 text-gray-700">
                    Polished React + Tailwind blocks and components with a blue
                    & amber theme, ready to copy and paste.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href="#get-started"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-ocean-primary text-white shadow hover:shadow-md transition"
                    >
                      Get started
                    </a>
                    <a
                      href="#components"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow transition"
                    >
                      Browse components
                    </a>
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="mx-auto max-w-3xl text-center">
    <h1 class="text-3xl sm:text-4xl font-bold text-gray-900">Build faster with Ocean UI</h1>
    <p class="mt-3 text-gray-700">Polished React + Tailwind blocks and components with a blue & amber theme, ready to copy and paste.</p>
    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <a href="#" class="inline-flex items-center px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow hover:shadow-md transition">Get started</a>
      <a href="#" class="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow transition">Browse components</a>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "cta",
        label: "CTA section",
        items: [
          {
            slug: "cta-section",
            title: "CTA section",
            description: "Simple marketing call to action with primary button.",
            preview: (
              <section>
                <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Ready to ship faster?
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Start using Ocean UI blocks in your project today.
                  </p>
                  <div className="mt-4">
                    <a
                      href="#"
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-ocean-primary text-white shadow hover:shadow-md transition"
                    >
                      Start free
                    </a>
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl p-6 text-center">
    <h3 class="text-xl font-semibold text-gray-900">Ready to ship faster?</h3>
    <p class="text-gray-600 mt-1">Start using Ocean UI blocks in your project today.</p>
    <div class="mt-4">
      <a href="#" class="inline-flex items-center px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow hover:shadow-md transition">Start free</a>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "pricing",
        label: "Pricing Section",
        items: [
          {
            slug: "pricing-section",
            title: "Pricing Section",
            description: "Three-tier pricing with highlighted plan.",
            preview: (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Starter", "Pro", "Business"].map((name, i) => (
                    <div
                      key={name}
                      className={`rounded-2xl border p-5 bg-white ${
                        i === 1
                          ? "border-blue-400 shadow-soft"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="text-sm font-semibold text-gray-900">
                        {name}
                      </div>
                      <div className="mt-2 text-3xl font-bold text-gray-900">
                        {i === 0 ? "$0" : i === 1 ? "$19" : "$49"}
                        <span className="text-base font-medium text-gray-500">
                          /mo
                        </span>
                      </div>
                      <ul className="mt-3 text-sm text-gray-600 space-y-1">
                        <li>Basic components</li>
                        <li>UI Blocks</li>
                        <li>Updates</li>
                      </ul>
                      <a
                        href="#"
                        className={`mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-sm ${
                          i === 1
                            ? "bg-ocean-primary text-white shadow hover:shadow-md"
                            : "border border-gray-200 text-gray-800 bg-white"
                        } transition`}
                      >
                        Choose plan
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="rounded-2xl border border-gray-200 p-5 bg-white">
      <div class="text-sm font-semibold text-gray-900">Starter</div>
      <div class="mt-2 text-3xl font-bold text-gray-900">$0<span class="text-base font-medium text-gray-500">/mo</span></div>
      <ul class="mt-3 text-sm text-gray-600 space-y-1">
        <li>Basic components</li><li>UI Blocks</li><li>Updates</li>
      </ul>
      <a href="#" class="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-800 bg-white transition">Choose plan</a>
    </div>
    <div class="rounded-2xl border border-blue-400 p-5 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
      <div class="text-sm font-semibold text-gray-900">Pro</div>
      <div class="mt-2 text-3xl font-bold text-gray-900">$19<span class="text-base font-medium text-gray-500">/mo</span></div>
      <ul class="mt-3 text-sm text-gray-600 space-y-1">
        <li>Basic components</li><li>UI Blocks</li><li>Updates</li>
      </ul>
      <a href="#" class="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-sm bg-[#2563EB] text-white shadow hover:shadow-md transition">Choose plan</a>
    </div>
    <div class="rounded-2xl border border-gray-200 p-5 bg-white">
      <div class="text-sm font-semibold text-gray-900">Business</div>
      <div class="mt-2 text-3xl font-bold text-gray-900">$49<span class="text-base font-medium text-gray-500">/mo</span></div>
      <ul class="mt-3 text-sm text-gray-600 space-y-1">
        <li>Basic components</li><li>UI Blocks</li><li>Updates</li>
      </ul>
      <a href="#" class="mt-4 inline-flex items-center justify-center w-full px-4 py-2 rounded-lg text-sm border border-gray-200 text-gray-800 bg-white transition">Choose plan</a>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "stats",
        label: "Stats",
        items: [
          {
            slug: "stats",
            title: "Stats",
            description: "Simple KPI stat grid.",
            preview: (
              <section>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    ["Users", "12k"],
                    ["Downloads", "85k"],
                    ["Stars", "4.8k"],
                    ["Uptime", "99.9%"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="bg-white border border-gray-200 rounded-2xl p-4 text-center"
                    >
                      <div className="text-2xl font-bold text-gray-900">
                        {value}
                      </div>
                      <div className="text-xs text-gray-600 mt-1">{label}</div>
                    </div>
                  ))}
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div class="text-2xl font-bold text-gray-900">12k</div>
      <div class="text-xs text-gray-600 mt-1">Users</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div class="text-2xl font-bold text-gray-900">85k</div>
      <div class="text-xs text-gray-600 mt-1">Downloads</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div class="text-2xl font-bold text-gray-900">4.8k</div>
      <div class="text-xs text-gray-600 mt-1">Stars</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div class="text-2xl font-bold text-gray-900">99.9%</div>
      <div class="text-xs text-gray-600 mt-1">Uptime</div>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "testimonial",
        label: "Testimonial",
        items: [
          {
            slug: "testimonial",
            title: "Testimonial",
            description: "Quote with avatar and author.",
            preview: (
              <section>
                <div className="mx-auto max-w-2xl bg-white border border-gray-200 rounded-2xl p-6">
                  <blockquote className="text-gray-800 italic">
                    “Ocean UI helped us ship our MVP twice as fast.”
                  </blockquote>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100" />
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        Jane Cooper
                      </div>
                      <div className="text-xs text-gray-600">
                        Head of Product, Acme
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="mx-auto max-w-2xl bg-white border border-gray-200 rounded-2xl p-6">
    <blockquote class="text-gray-800 italic">“Ocean UI helped us ship our MVP twice as fast.”</blockquote>
    <div class="mt-4 flex items-center gap-3">
      <div class="h-10 w-10 rounded-full bg-blue-100"></div>
      <div>
        <div class="text-sm font-semibold text-gray-900">Jane Cooper</div>
        <div class="text-xs text-gray-600">Head of Product, Acme</div>
      </div>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "team",
        label: "Team sections",
        items: [
          {
            slug: "team-section",
            title: "Team section",
            description: "Team grid with avatars and roles.",
            preview: (
              <section>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded-2xl p-4 text-center"
                    >
                      <div className="h-16 w-16 rounded-full bg-blue-100 mx-auto" />
                      <div className="mt-2 font-semibold text-gray-900">
                        Member {i + 1}
                      </div>
                      <div className="text-xs text-gray-600">Role</div>
                    </div>
                  ))}
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div class="h-16 w-16 rounded-full bg-blue-100 mx-auto"></div>
      <div class="mt-2 font-semibold text-gray-900">Member 1</div>
      <div class="text-xs text-gray-600">Role</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div class="h-16 w-16 rounded-full bg-blue-100 mx-auto"></div>
      <div class="mt-2 font-semibold text-gray-900">Member 2</div>
      <div class="text-xs text-gray-600">Role</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div class="h-16 w-16 rounded-full bg-blue-100 mx-auto"></div>
      <div class="mt-2 font-semibold text-gray-900">Member 3</div>
      <div class="text-xs text-gray-600">Role</div>
    </div>
    <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
      <div class="h-16 w-16 rounded-full bg-blue-100 mx-auto"></div>
      <div class="mt-2 font-semibold text-gray-900">Member 4</div>
      <div class="text-xs text-gray-600">Role</div>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "faqs",
        label: "FAQs",
        items: [
          {
            slug: "faqs",
            title: "FAQs",
            description: "Common questions with expandable answers.",
            preview: (
              <section>
                <div className="space-y-2">
                  <div className="rounded-lg border border-gray-200 bg-white">
                    <button className="w-full flex items-center justify-between p-3">
                      <span className="font-medium text-gray-900">
                        What is Ocean UI?
                      </span>
                      <span className="text-gray-500">+</span>
                    </button>
                    <div className="border-t border-gray-200 p-3 text-sm text-gray-600">
                      A Tailwind-inspired block library.
                    </div>
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="space-y-2">
    <div class="rounded-lg border border-gray-200 bg-white">
      <button class="w-full flex items-center justify-between p-3">
        <span class="font-medium text-gray-900">What is Ocean UI?</span>
        <span class="text-gray-500">+</span>
      </button>
      <div class="border-top border-gray-200 p-3 text-sm text-gray-600">A Tailwind-inspired block library.</div>
    </div>
  </div>
            `.replace("border-top","border-t")),
          },
        ],
      },
      {
        key: "footers",
        label: "Footers",
        items: [
          {
            slug: "footer",
            title: "Footer",
            description: "Simple footer with links and copyright.",
            preview: (
              <section>
                <footer className="bg-white border border-gray-200 rounded-2xl p-4">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="text-sm text-gray-700">
                      © 2025 Ocean UI. All rights reserved.
                    </div>
                    <div className="inline-flex items-center gap-3 text-sm">
                      <a href="#docs" className="text-gray-700 hover:text-ocean-primary">
                        Docs
                      </a>
                      <a href="#blog" className="text-gray-700 hover:text-ocean-primary">
                        Blog
                      </a>
                      <a href="#privacy" className="text-gray-700 hover:text-ocean-primary">
                        Privacy
                      </a>
                    </div>
                  </div>
                </footer>
              </section>
            ),
            htmlSnippet: shell(`
  <footer class="bg-white border border-gray-200 rounded-2xl p-4">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
      <div class="text-sm text-gray-700">© 2025 Ocean UI. All rights reserved.</div>
      <div class="inline-flex items-center gap-3 text-sm">
        <a href="#" class="text-gray-700 hover:text-[#2563EB]">Docs</a>
        <a href="#" class="text-gray-700 hover:text-[#2563EB]">Blog</a>
        <a href="#" class="text-gray-700 hover:text-[#2563EB]">Privacy</a>
      </div>
    </div>
  </footer>
            `),
          },
        ],
      },
      {
        key: "flyout",
        label: "Flayout Menues",
        items: [
          {
            slug: "flyout-menus",
            title: "Flayout Menues",
            description: "Hoverable flyout panel (static preview).",
            preview: (
              <section>
                <div className="relative inline-block">
                  <button className="px-3 py-2 rounded-lg border border-gray-200 bg-white">
                    Menu
                  </button>
                  <div className="mt-2 w-48 rounded-lg border border-gray-200 bg-white p-3 text-sm">
                    <a href="#a" className="block px-2 py-1 rounded hover:bg-gray-50">
                      Item A
                    </a>
                    <a href="#b" className="block px-2 py-1 rounded hover:bg-gray-50">
                      Item B
                    </a>
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="relative inline-block">
    <button class="px-3 py-2 rounded-lg border border-gray-200 bg-white">Menu</button>
    <div class="mt-2 w-48 rounded-lg border border-gray-200 bg-white p-3 text-sm">
      <a href="#" class="block px-2 py-1 rounded hover:bg-gray-50">Item A</a>
      <a href="#" class="block px-2 py-1 rounded hover:bg-gray-50">Item B</a>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "features",
        label: "Features section",
        items: [
          {
            slug: "features-section",
            title: "Features section",
            description: "3-column features grid.",
            preview: (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Fast", "Accessible", "Beautiful"].map((k) => (
                    <div
                      key={k}
                      className="rounded-2xl bg-white p-4 border border-gray-200"
                    >
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-amber-400 mb-2" />
                      <div className="font-semibold text-gray-900">{k}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        Ocean styled block preview.
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="rounded-2xl bg-white p-4 border border-gray-200">
      <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B] mb-2"></div>
      <div class="font-semibold text-gray-900">Fast</div>
      <div class="text-sm text-gray-600 mt-1">Ocean styled block preview.</div>
    </div>
    <div class="rounded-2xl bg-white p-4 border border-gray-200">
      <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B] mb-2"></div>
      <div class="font-semibold text-gray-900">Accessible</div>
      <div class="text-sm text-gray-600 mt-1">Ocean styled block preview.</div>
    </div>
    <div class="rounded-2xl bg-white p-4 border border-gray-200">
      <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B] mb-2"></div>
      <div class="font-semibold text-gray-900">Beautiful</div>
      <div class="text-sm text-gray-600 mt-1">Ocean styled block preview.</div>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "bento",
        label: "Bento grids",
        items: [
          {
            slug: "bento-grids",
            title: "Bento grids",
            description: "Asymmetric marketing grid layout.",
            preview: (
              <section>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 h-28 rounded-2xl bg-white border border-gray-200 p-4">
                    Wide card
                  </div>
                  <div className="h-28 rounded-2xl bg-white border border-gray-200 p-4">
                    Card
                  </div>
                  <div className="h-28 rounded-2xl bg-white border border-gray-200 p-4">
                    Card
                  </div>
                  <div className="md:col-span-2 h-28 rounded-2xl bg-white border border-gray-200 p-4">
                    Wide card
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="md:col-span-2 h-28 rounded-2xl bg-white border border-gray-200 p-4">Wide card</div>
    <div class="h-28 rounded-2xl bg-white border border-gray-200 p-4">Card</div>
    <div class="h-28 rounded-2xl bg-white border border-gray-200 p-4">Card</div>
    <div class="md:col-span-2 h-28 rounded-2xl bg-white border border-gray-200 p-4">Wide card</div>
  </div>
            `),
          },
        ],
      },
      {
        key: "header",
        label: "Header section",
        items: [
          {
            slug: "header-section",
            title: "Header section",
            description: "Top header with logo and simple nav.",
            preview: (
              <section>
                <div className="rounded-2xl bg-white border border-gray-200 p-4 flex items-center justify-between">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]" />
                  <div className="flex items-center gap-4 text-sm">
                    <a href="#docs" className="text-gray-700 hover:text-ocean-primary">
                      Docs
                    </a>
                    <a href="#blog" className="text-gray-700 hover:text-ocean-primary">
                      Blog
                    </a>
                    <a
                      href="#signin"
                      className="px-3 py-1.5 rounded-lg bg-ocean-primary text-white"
                    >
                      Sign in
                    </a>
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="rounded-2xl bg-white border border-gray-200 p-4 flex items-center justify-between">
    <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]"></div>
    <div class="flex items-center gap-4 text-sm">
      <a href="#" class="text-gray-700 hover:text-[#2563EB]">Docs</a>
      <a href="#" class="text-gray-700 hover:text-[#2563EB]">Blog</a>
      <a href="#" class="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white">Sign in</a>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "newsletter",
        label: "Newsletter Section",
        items: [
          {
            slug: "newsletter-section",
            title: "Newsletter Section",
            description: "Email capture block.",
            preview: (
              <section>
                <div className="mx-auto max-w-xl bg-white border border-gray-200 rounded-2xl p-5 text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Subscribe to updates
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Monthly news, no spam.
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <input
                      className="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      placeholder="you@example.com"
                    />
                    <button className="px-4 py-2 rounded-lg bg-ocean-primary text-white">
                      Subscribe
                    </button>
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="mx-auto max-w-xl bg-white border border-gray-200 rounded-2xl p-5 text-center">
    <h3 class="text-lg font-semibold text-gray-900">Subscribe to updates</h3>
    <p class="text-sm text-gray-600 mt-1">Monthly news, no spam.</p>
    <div class="mt-4 flex items-center gap-2">
      <input class="flex-1 px-3 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30" placeholder="you@example.com" />
      <button class="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Subscribe</button>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "blog",
        label: "Blog section",
        items: [
          {
            slug: "blog-section",
            title: "Blog section",
            description: "Blog cards grid.",
            preview: (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div
                      key={i}
                      className="rounded-2xl bg-white border border-gray-200 overflow-hidden"
                    >
                      <div className="h-24 bg-gray-200" />
                      <div className="p-4">
                        <div className="text-sm font-semibold text-gray-900">
                          Article title
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Short preview description.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="rounded-2xl bg-white border border-gray-200 overflow-hidden">
      <div class="h-24 bg-gray-200"></div>
      <div class="p-4">
        <div class="text-sm font-semibold text-gray-900">Article title</div>
        <p class="text-sm text-gray-600 mt-1">Short preview description.</p>
      </div>
    </div>
    <div class="rounded-2xl bg-white border border-gray-200 overflow-hidden">
      <div class="h-24 bg-gray-200"></div>
      <div class="p-4">
        <div class="text-sm font-semibold text-gray-900">Article title</div>
        <p class="text-sm text-gray-600 mt-1">Short preview description.</p>
      </div>
    </div>
    <div class="rounded-2xl bg-white border border-gray-200 overflow-hidden">
      <div class="h-24 bg-gray-200"></div>
      <div class="p-4">
        <div class="text-sm font-semibold text-gray-900">Article title</div>
        <p class="text-sm text-gray-600 mt-1">Short preview description.</p>
      </div>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "contact",
        label: "Contact section",
        items: [
          {
            slug: "contact-section",
            title: "Contact section",
            description: "Contact form block.",
            preview: (
              <section>
                <div className="mx-auto max-w-xl bg-white border border-gray-200 rounded-2xl p-5">
                  <div className="grid grid-cols-1 gap-3">
                    <input
                      className="px-3 py-2 rounded-lg border border-gray-300 bg-white"
                      placeholder="Name"
                    />
                    <input
                      className="px-3 py-2 rounded-lg border border-gray-300 bg-white"
                      placeholder="Email"
                    />
                    <textarea
                      className="px-3 py-2 rounded-lg border border-gray-300 bg-white"
                      rows="3"
                      placeholder="Message"
                    />
                    <button className="px-4 py-2 rounded-lg bg-ocean-primary text-white">
                      Send
                    </button>
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="mx-auto max-w-xl bg-white border border-gray-200 rounded-2xl p-5">
    <div class="grid grid-cols-1 gap-3">
      <input class="px-3 py-2 rounded-lg border border-gray-300 bg-white" placeholder="Name" />
      <input class="px-3 py-2 rounded-lg border border-gray-300 bg-white" placeholder="Email" />
      <textarea class="px-3 py-2 rounded-lg border border-gray-300 bg-white" rows="3" placeholder="Message"></textarea>
      <button class="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Send</button>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "content",
        label: "Content section",
        items: [
          {
            slug: "content-section",
            title: "Content section",
            description: "Text content with heading and paragraph.",
            preview: (
              <section>
                <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="text-xl font-semibold text-gray-900">
                    Build with clarity
                  </h3>
                  <p className="mt-2 text-gray-700">
                    Ocean UI provides a clean, modern baseline to compose
                    sections quickly with Tailwind.
                  </p>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl p-6">
    <h3 class="text-xl font-semibold text-gray-900">Build with clarity</h3>
    <p class="mt-2 text-gray-700">Ocean UI provides a clean, modern baseline to compose sections quickly with Tailwind.</p>
  </div>
            `),
          },
        ],
      },
      {
        key: "logos",
        label: "logo cloud",
        items: [
          {
            slug: "logo-cloud",
            title: "Logo cloud",
            description: "Client logos grid.",
            preview: (
              <section>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-16 rounded-2xl bg-white border border-gray-200 grid place-items-center text-gray-500"
                    >
                      Logo
                    </div>
                  ))}
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
    <div class="h-16 rounded-2xl bg-white border border-gray-200 grid place-items-center text-gray-500">Logo</div>
    <div class="h-16 rounded-2xl bg-white border border-gray-200 grid place-items-center text-gray-500">Logo</div>
    <div class="h-16 rounded-2xl bg-white border border-gray-200 grid place-items-center text-gray-500">Logo</div>
    <div class="h-16 rounded-2xl bg-white border border-gray-200 grid place-items-center text-gray-500">Logo</div>
  </div>
            `),
          },
        ],
      },
      {
        key: "banners",
        label: "Banners",
        items: [
          {
            slug: "banners",
            title: "Banners",
            description: "Informational banner with action.",
            preview: (
              <section>
                <div className="rounded-2xl border border-blue-200 bg-blue-50 text-blue-800 px-4 py-3 flex items-center justify-between">
                  <span>We have launched new components!</span>
                  <a
                    href="#"
                    className="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-sm"
                  >
                    See what’s new
                  </a>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="rounded-2xl border border-blue-200 bg-blue-50 text-blue-800 px-4 py-3 flex items-center justify-between">
    <span>We have launched new components!</span>
    <a href="#" class="px-3 py-1.5 rounded-lg bg-white border border-blue-200 text-sm">See what’s new</a>
  </div>
            `),
          },
        ],
      },
      {
        key: "errors",
        label: "404 pages",
        items: [
          {
            slug: "404-page",
            title: "404 page",
            description: "Simple not found page.",
            preview: (
              <section>
                <div className="mx-auto max-w-xl bg-white border border-gray-200 rounded-2xl p-10 text-center">
                  <div className="text-6xl font-bold text-gray-900">404</div>
                  <p className="text-gray-600 mt-2">
                    The page you’re looking for doesn’t exist.
                  </p>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-ocean-primary text-white"
                  >
                    Go home
                  </a>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="mx-auto max-w-xl bg-white border border-gray-200 rounded-2xl p-10 text-center">
    <div class="text-6xl font-bold text-gray-900">404</div>
    <p class="text-gray-600 mt-2">The page you’re looking for doesn’t exist.</p>
    <a href="#" class="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-[#2563EB] text-white">Go home</a>
  </div>
            `),
          },
        ],
      },
      {
        key: "landing",
        label: "Landing pages",
        items: [
          {
            slug: "landing-page",
            title: "Landing page",
            description: "Composed landing with hero + features.",
            preview: (
              <section>
                <div className="space-y-6">
                  <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Ocean UI
                    </h2>
                    <p className="text-gray-700 mt-1">
                      Build pages faster with polished blocks.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {["Fast", "Accessible", "Beautiful"].map((k) => (
                      <div
                        key={k}
                        className="rounded-2xl bg-white p-4 border border-gray-200"
                      >
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-600 to-amber-400 mb-2" />
                        <div className="font-semibold text-gray-900">{k}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Ocean styled block preview.
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="space-y-6">
    <div class="mx-auto max-w-3xl text-center">
      <h2 class="text-3xl font-bold text-gray-900">Ocean UI</h2>
      <p class="text-gray-700 mt-1">Build pages faster with polished blocks.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="rounded-2xl bg-white p-4 border border-gray-200">
        <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B] mb-2"></div>
        <div class="font-semibold text-gray-900">Fast</div>
        <div class="text-sm text-gray-600 mt-1">Ocean styled block preview.</div>
      </div>
      <div class="rounded-2xl bg-white p-4 border border-gray-200">
        <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B] mb-2"></div>
        <div class="font-semibold text-gray-900">Accessible</div>
        <div class="text-sm text-gray-600 mt-1">Ocean styled block preview.</div>
      </div>
      <div class="rounded-2xl bg-white p-4 border border-gray-200">
        <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B] mb-2"></div>
        <div class="font-semibold text-gray-900">Beautiful</div>
        <div class="text-sm text-gray-600 mt-1">Ocean styled block preview.</div>
      </div>
    </div>
  </div>
            `),
          },
        ],
      },
      {
        key: "about",
        label: "About pages",
        items: [
          {
            slug: "about-page",
            title: "About page",
            description: "About us section with mission and team highlight.",
            preview: (
              <section>
                <div className="space-y-4">
                  <div className="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Our mission
                    </h3>
                    <p className="mt-1 text-gray-700">
                      Empower builders with a pragmatic UI block system.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-white border border-gray-200 rounded-2xl p-4 text-center"
                      >
                        <div className="h-16 w-16 rounded-full bg-blue-100 mx-auto" />
                        <div className="mt-2 font-semibold text-gray-900">
                          Member {i + 1}
                        </div>
                        <div className="text-xs text-gray-600">Role</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            ),
            htmlSnippet: shell(`
  <div class="space-y-4">
    <div class="mx-auto max-w-3xl bg-white border border-gray-200 rounded-2xl p-6">
      <h3 class="text-xl font-semibold text-gray-900">Our mission</h3>
      <p class="mt-1 text-gray-700">Empower builders with a pragmatic UI block system.</p>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
        <div class="h-16 w-16 rounded-full bg-blue-100 mx-auto"></div>
        <div class="mt-2 font-semibold text-gray-900">Member 1</div>
        <div class="text-xs text-gray-600">Role</div>
      </div>
      <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
        <div class="h-16 w-16 rounded-full bg-blue-100 mx-auto"></div>
        <div class="mt-2 font-semibold text-gray-900">Member 2</div>
        <div class="text-xs text-gray-600">Role</div>
      </div>
      <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
        <div class="h-16 w-16 rounded-full bg-blue-100 mx-auto"></div>
        <div class="mt-2 font-semibold text-gray-900">Member 3</div>
        <div class="text-xs text-gray-600">Role</div>
      </div>
      <div class="bg-white border border-gray-200 rounded-2xl p-4 text-center">
        <div class="h-16 w-16 rounded-full bg-blue-100 mx-auto"></div>
        <div class="mt-2 font-semibold text-gray-900">Member 4</div>
        <div class="text-xs text-gray-600">Role</div>
      </div>
    </div>
  </div>
            `),
          },
        ],
      },
    ],
    []
  );

  // Grouped sidebar data from catalog
  const sidebarGroups = useMemo(
    () =>
      catalog.map((g) => ({
        key: g.key,
        label: g.label,
        items: (g.items || []).map((it) => ({ label: it.title, slug: it.slug })),
      })),
    [catalog]
  );

  // Default selection first slug
  const defaultSlug = useMemo(() => {
    const g = catalog[0];
    return g?.items?.[0]?.slug || "";
  }, [catalog]);

  const [selectedSlug, setSelectedSlug] = useState(() => {
    try {
      const url = new URL(window.location.href);
      return url.searchParams.get("item") || defaultSlug;
    } catch {
      return defaultSlug;
    }
  });

  const onSelect = (slugOrGroup) => {
    if (typeof slugOrGroup === "string") {
      setSelectedSlug(slugOrGroup);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("item", slugOrGroup);
        window.history.replaceState(null, "", url.toString());
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Resolve current item
  const current = useMemo(() => {
    for (const g of catalog) {
      for (const it of g.items || []) {
        if (it.slug === selectedSlug) return it;
      }
    }
    return null;
  }, [catalog, selectedSlug]);

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="UI Blocks" categories={sidebarGroups} onSelect={onSelect} />
          </div>
          <div className="md:hidden">
            <Sidebar title="UI Blocks" categories={sidebarGroups} onSelect={onSelect} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">UI Blocks</h2>
              <p className="text-gray-600 mt-1">
                {current?.title ? `Selected: ${current.title}` : "Select a block from the sidebar"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {current && (
                <PreviewCard
                  title={current.title}
                  description={current.description || "Preview and Tailwind Play–ready HTML snippet."}
                  preview={current.preview}
                  code={current.htmlSnippet}
                />
              )}

              {!current && (
                <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-white">
                  <h3 className="font-semibold text-gray-900">No block selected</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Choose an item from the left sidebar to see its preview and code snippet.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
