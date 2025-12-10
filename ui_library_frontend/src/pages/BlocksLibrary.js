import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import CodeViewer from "../components/CodeViewer";

/**
 * PUBLIC_INTERFACE
 * BlocksLibrary
 * UI Blocks page with a populated sidebar and per-block preview + code snippet.
 * Each block renders a single <section> preview and a programmatically derived
 * section-only HTML snippet (no imports/wrappers) with copy-to-clipboard.
 *
 * Pattern mirrors a Hero-like section layout and keeps Components pages unchanged.
 */

// Small helper to ensure a single <section> wrapper exists around inner markup.
function wrapInSection(innerHtml, sectionClass = "min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50") {
  return `<section class="${sectionClass}">
${innerHtml}
</section>`;
}

// Build previews and derived snippets from a single source of truth per block.
const makeHero = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-900">Build faster with Ocean UI</h1>
        <p className="mt-3 text-gray-600">Beautiful, responsive sections built with Tailwind CSS.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a href="#get" className="inline-flex items-center px-4 py-2 rounded-lg bg-ocean-primary text-white shadow hover:shadow-md transition">Get started</a>
          <a href="#docs" className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow transition">Documentation</a>
        </div>
      </div>
    </section>
  );

  const html = wrapInSection(`
  <div class="mx-auto max-w-3xl text-center">
    <h1 class="text-3xl font-bold text-gray-900">Build faster with Ocean UI</h1>
    <p class="mt-3 text-gray-600">Beautiful, responsive sections built with Tailwind CSS.</p>
    <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
      <a href="#" class="inline-flex items-center px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow hover:shadow-md transition">Get started</a>
      <a href="#" class="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow transition">Documentation</a>
    </div>
  </div>
  `);

  return { preview, html };
};

// Utility for simple two-button CTA
const makeCTA = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Ready to dive in?</h2>
        <p className="mt-2 text-gray-600">Start building modern UIs with Ocean today.</p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <a href="#start" className="px-4 py-2 rounded-lg bg-ocean-primary text-white shadow hover:shadow-md transition">Start free</a>
          <a href="#learn" className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow transition">Learn more</a>
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-4xl text-center">
    <h2 class="text-2xl font-semibold text-gray-900">Ready to dive in?</h2>
    <p class="mt-2 text-gray-600">Start building modern UIs with Ocean today.</p>
    <div class="mt-5 flex items-center justify-center gap-3">
      <a href="#" class="px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow hover:shadow-md transition">Start free</a>
      <a href="#" class="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow transition">Learn more</a>
    </div>
  </div>
  `);
  return { preview, html };
};

const makePricing = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Simple pricing</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Starter", "Pro", "Enterprise"].map((tier, i) => (
            <div key={tier} className="rounded-2xl bg-white border border-gray-200 p-6">
              <div className="text-gray-900 font-semibold">{tier}</div>
              <div className="mt-2 text-3xl font-bold text-gray-900">${i === 0 ? "0" : i === 1 ? "19" : "99"}</div>
              <ul className="mt-3 text-sm text-gray-600 space-y-1">
                <li>All core features</li>
                <li>Premium support</li>
                <li>Access to updates</li>
              </ul>
              <a href="#buy" className="mt-5 inline-flex items-center px-4 py-2 rounded-lg bg-ocean-primary text-white">Choose</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-5xl">
    <h2 class="text-2xl font-bold text-gray-900 text-center">Simple pricing</h2>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="rounded-2xl bg-white border border-gray-200 p-6">
        <div class="text-gray-900 font-semibold">Starter</div>
        <div class="mt-2 text-3xl font-bold text-gray-900">$0</div>
        <ul class="mt-3 text-sm text-gray-600 space-y-1">
          <li>All core features</li>
          <li>Premium support</li>
          <li>Access to updates</li>
        </ul>
        <a href="#" class="mt-5 inline-flex items-center px-4 py-2 rounded-lg bg-[#2563EB] text-white">Choose</a>
      </div>
      <div class="rounded-2xl bg-white border border-gray-200 p-6">
        <div class="text-gray-900 font-semibold">Pro</div>
        <div class="mt-2 text-3xl font-bold text-gray-900">$19</div>
        <ul class="mt-3 text-sm text-gray-600 space-y-1">
          <li>All core features</li>
          <li>Premium support</li>
          <li>Access to updates</li>
        </ul>
        <a href="#" class="mt-5 inline-flex items-center px-4 py-2 rounded-lg bg-[#2563EB] text-white">Choose</a>
      </div>
      <div class="rounded-2xl bg-white border border-gray-200 p-6">
        <div class="text-gray-900 font-semibold">Enterprise</div>
        <div class="mt-2 text-3xl font-bold text-gray-900">$99</div>
        <ul class="mt-3 text-sm text-gray-600 space-y-1">
          <li>All core features</li>
          <li>Premium support</li>
          <li>Access to updates</li>
        </ul>
        <a href="#" class="mt-5 inline-flex items-center px-4 py-2 rounded-lg bg-[#2563EB] text-white">Choose</a>
      </div>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeStats = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[
          { label: "Customers", value: "8k+" },
          { label: "Downloads", value: "120k" },
          { label: "Uptime", value: "99.9%" },
          { label: "Countries", value: "42" },
        ].map((s) => (
          <div key={s.label} className="rounded-xl bg-white border border-gray-200 p-6">
            <div className="text-2xl font-bold text-gray-900">{s.value}</div>
            <div className="text-sm text-gray-600">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
    <div class="rounded-xl bg-white border border-gray-200 p-6">
      <div class="text-2xl font-bold text-gray-900">8k+</div>
      <div class="text-sm text-gray-600">Customers</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-6">
      <div class="text-2xl font-bold text-gray-900">120k</div>
      <div class="text-sm text-gray-600">Downloads</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-6">
      <div class="text-2xl font-bold text-gray-900">99.9%</div>
      <div class="text-sm text-gray-600">Uptime</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-6">
      <div class="text-2xl font-bold text-gray-900">42</div>
      <div class="text-sm text-gray-600">Countries</div>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeTestimonial = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-3xl text-center">
        <blockquote className="text-xl text-gray-800">
          “Ocean UI helped our team ship beautiful pages in days, not weeks.”
        </blockquote>
        <div className="mt-3 text-gray-600">— Alex Johnson, Product Lead</div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-3xl text-center">
    <blockquote class="text-xl text-gray-800">“Ocean UI helped our team ship beautiful pages in days, not weeks.”</blockquote>
    <div class="mt-3 text-gray-600">— Alex Johnson, Product Lead</div>
  </div>
  `);
  return { preview, html };
};

const makeTeam = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Our team</h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {["Jamie", "Taylor", "Chris", "Morgan"].map((n) => (
            <div key={n} className="rounded-xl bg-white border border-gray-200 p-4 text-center">
              <div className="mx-auto h-16 w-16 rounded-full bg-blue-100" />
              <div className="mt-2 font-semibold text-gray-900">{n}</div>
              <div className="text-sm text-gray-600">Designer</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-5xl">
    <h2 class="text-2xl font-bold text-gray-900 text-center">Our team</h2>
    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="rounded-xl bg-white border border-gray-200 p-4 text-center">
        <div class="mx-auto h-16 w-16 rounded-full bg-blue-100"></div>
        <div class="mt-2 font-semibold text-gray-900">Jamie</div>
        <div class="text-sm text-gray-600">Designer</div>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-4 text-center">
        <div class="mx-auto h-16 w-16 rounded-full bg-blue-100"></div>
        <div class="mt-2 font-semibold text-gray-900">Taylor</div>
        <div class="text-sm text-gray-600">Designer</div>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-4 text-center">
        <div class="mx-auto h-16 w-16 rounded-full bg-blue-100"></div>
        <div class="mt-2 font-semibold text-gray-900">Chris</div>
        <div class="text-sm text-gray-600">Designer</div>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-4 text-center">
        <div class="mx-auto h-16 w-16 rounded-full bg-blue-100"></div>
        <div class="mt-2 font-semibold text-gray-900">Morgan</div>
        <div class="text-sm text-gray-600">Designer</div>
      </div>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeFAQs = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center">FAQs</h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-gray-200 bg-white">
            <button className="w-full text-left px-4 py-3 font-medium">What is Ocean UI?</button>
            <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600">
              A Tailwind-inspired UI library for building modern interfaces quickly.
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white">
            <button className="w-full text-left px-4 py-3 font-medium">Can I use it commercially?</button>
            <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-600">Yes.</div>
          </div>
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-3xl">
    <h2 class="text-2xl font-bold text-gray-900 text-center">FAQs</h2>
    <div class="mt-4 space-y-3">
      <div class="rounded-lg border border-gray-200 bg-white">
        <button class="w-full text-left px-4 py-3 font-medium">What is Ocean UI?</button>
        <div class="border-t border-gray-200 px-4 py-3 text-sm text-gray-600">A Tailwind-inspired UI library for building modern interfaces quickly.</div>
      </div>
      <div class="rounded-lg border border-gray-200 bg-white">
        <button class="w-full text-left px-4 py-3 font-medium">Can I use it commercially?</button>
        <div class="border-t border-gray-200 px-4 py-3 text-sm text-gray-600">Yes.</div>
      </div>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeFooters = () => {
  const preview = (
    <section>
      <footer className="mx-auto max-w-6xl">
        <div className="rounded-2xl bg-white border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-gray-600">© 2025 Ocean UI. All rights reserved.</div>
          <div className="mt-3 md:mt-0 flex items-center gap-4 text-sm">
            <a href="#privacy" className="text-gray-700 hover:text-ocean-primary">Privacy</a>
            <a href="#terms" className="text-gray-700 hover:text-ocean-primary">Terms</a>
            <a href="#contact" className="text-gray-700 hover:text-ocean-primary">Contact</a>
          </div>
        </div>
      </footer>
    </section>
  );
  const html = wrapInSection(`
  <footer class="mx-auto max-w-6xl">
    <div class="rounded-2xl bg-white border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between">
      <div class="text-sm text-gray-600">© 2025 Ocean UI. All rights reserved.</div>
      <div class="mt-3 md:mt-0 flex items-center gap-4 text-sm">
        <a href="#" class="text-gray-700 hover:text-[#2563EB]">Privacy</a>
        <a href="#" class="text-gray-700 hover:text-[#2563EB]">Terms</a>
        <a href="#" class="text-gray-700 hover:text-[#2563EB]">Contact</a>
      </div>
    </div>
  </footer>
  `);
  return { preview, html };
};

const makeFlyoutMenus = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-4xl">
        <div className="relative inline-block">
          <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white">Open menu</button>
          <div className="mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow p-2 text-sm">
            <a href="#a" className="block px-3 py-2 rounded hover:bg-gray-50">Analytics</a>
            <a href="#b" className="block px-3 py-2 rounded hover:bg-gray-50">Reports</a>
            <a href="#c" className="block px-3 py-2 rounded hover:bg-gray-50">Integrations</a>
          </div>
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-4xl">
    <div class="relative inline-block">
      <button class="px-4 py-2 rounded-lg border border-gray-200 bg-white">Open menu</button>
      <div class="mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow p-2 text-sm">
        <a href="#" class="block px-3 py-2 rounded hover:bg-gray-50">Analytics</a>
        <a href="#" class="block px-3 py-2 rounded hover:bg-gray-50">Reports</a>
        <a href="#" class="block px-3 py-2 rounded hover:bg-gray-50">Integrations</a>
      </div>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeFeatures = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Features</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {["Fast", "Responsive", "Customizable"].map((f) => (
            <div key={f} className="rounded-xl bg-white border border-gray-200 p-5">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/60 to-amber-400/60" />
              <div className="mt-3 font-semibold text-gray-900">{f}</div>
              <p className="text-sm text-gray-600 mt-1">
                Build with modern utilities and patterns.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-6xl">
    <h2 class="text-2xl font-bold text-gray-900 text-center">Features</h2>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="rounded-xl bg-white border border-gray-200 p-5">
        <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/60 to-amber-400/60"></div>
        <div class="mt-3 font-semibold text-gray-900">Fast</div>
        <p class="text-sm text-gray-600 mt-1">Build with modern utilities and patterns.</p>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-5">
        <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/60 to-amber-400/60"></div>
        <div class="mt-3 font-semibold text-gray-900">Responsive</div>
        <p class="text-sm text-gray-600 mt-1">Build with modern utilities and patterns.</p>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-5">
        <div class="h-10 w-10 rounded-lg bg-gradient-to-br from-blue-500/60 to-amber-400/60"></div>
        <div class="mt-3 font-semibold text-gray-900">Customizable</div>
        <p class="text-sm text-gray-600 mt-1">Build with modern utilities and patterns.</p>
      </div>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeBento = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-2xl bg-white border border-gray-200 p-6">Large Card</div>
        <div className="rounded-2xl bg-white border border-gray-200 p-6">Small</div>
        <div className="rounded-2xl bg-white border border-gray-200 p-6">Small</div>
        <div className="md:col-span-2 rounded-2xl bg-white border border-gray-200 p-6">Wide</div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="md:col-span-2 rounded-2xl bg-white border border-gray-200 p-6">Large Card</div>
    <div class="rounded-2xl bg-white border border-gray-200 p-6">Small</div>
    <div class="rounded-2xl bg-white border border-gray-200 p-6">Small</div>
    <div class="md:col-span-2 rounded-2xl bg-white border border-gray-200 p-6">Wide</div>
  </div>
  `);
  return { preview, html };
};

const makeHeader = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-6xl rounded-2xl bg-white border border-gray-200 p-4 flex items-center justify-between">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-amber-400" />
        <nav className="hidden md:flex items-center gap-4 text-sm">
          <a href="#docs" className="text-gray-700 hover:text-ocean-primary">Docs</a>
          <a href="#blog" className="text-gray-700 hover:text-ocean-primary">Blog</a>
          <a href="#pricing" className="text-gray-700 hover:text-ocean-primary">Pricing</a>
        </nav>
        <a href="#signin" className="px-3 py-1.5 rounded-lg bg-ocean-primary text-white text-sm">Sign in</a>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-6xl rounded-2xl bg-white border border-gray-200 p-4 flex items-center justify-between">
    <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]"></div>
    <nav class="hidden md:flex items-center gap-4 text-sm">
      <a href="#" class="text-gray-700 hover:text-[#2563EB]">Docs</a>
      <a href="#" class="text-gray-700 hover:text-[#2563EB]">Blog</a>
      <a href="#" class="text-gray-700 hover:text-[#2563EB]">Pricing</a>
    </nav>
    <a href="#" class="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white text-sm">Sign in</a>
  </div>
  `);
  return { preview, html };
};

const makeNewsletter = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-3xl text-center">
        <h3 className="text-xl font-semibold text-gray-900">Subscribe to our newsletter</h3>
        <p className="mt-1 text-gray-600">The latest news, articles, and resources.</p>
        <form className="mt-4 flex items-center justify-center gap-2">
          <input className="px-3 py-2 rounded-lg border border-gray-300 bg-white w-64" placeholder="you@example.com" />
          <button className="px-4 py-2 rounded-lg bg-ocean-primary text-white">Subscribe</button>
        </form>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-3xl text-center">
    <h3 class="text-xl font-semibold text-gray-900">Subscribe to our newsletter</h3>
    <p class="mt-1 text-gray-600">The latest news, articles, and resources.</p>
    <form class="mt-4 flex items-center justify-center gap-2">
      <input class="px-3 py-2 rounded-lg border border-gray-300 bg-white w-64" placeholder="you@example.com" />
      <button class="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Subscribe</button>
    </form>
  </div>
  `);
  return { preview, html };
};

const makeBlog = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Latest articles</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <article key={i} className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
              <div className="h-32 bg-gray-200" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">Article title {i}</h3>
                <p className="text-sm text-gray-600 mt-1">Short description goes here.</p>
                <a href="#read" className="inline-block mt-3 text-sm text-ocean-primary">Read more →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-6xl">
    <h2 class="text-2xl font-bold text-gray-900 text-center">Latest articles</h2>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <article class="rounded-2xl bg-white border border-gray-200 overflow-hidden">
        <div class="h-32 bg-gray-200"></div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-900">Article title 1</h3>
          <p class="text-sm text-gray-600 mt-1">Short description goes here.</p>
          <a href="#" class="inline-block mt-3 text-sm text-[#2563EB]">Read more →</a>
        </div>
      </article>
      <article class="rounded-2xl bg-white border border-gray-200 overflow-hidden">
        <div class="h-32 bg-gray-200"></div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-900">Article title 2</h3>
          <p class="text-sm text-gray-600 mt-1">Short description goes here.</p>
          <a href="#" class="inline-block mt-3 text-sm text-[#2563EB]">Read more →</a>
        </div>
      </article>
      <article class="rounded-2xl bg-white border border-gray-200 overflow-hidden">
        <div class="h-32 bg-gray-200"></div>
        <div class="p-4">
          <h3 class="font-semibold text-gray-900">Article title 3</h3>
          <p class="text-sm text-gray-600 mt-1">Short description goes here.</p>
          <a href="#" class="inline-block mt-3 text-sm text-[#2563EB]">Read more →</a>
        </div>
      </article>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeContact = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center">Contact us</h2>
        <form className="mt-4 grid grid-cols-1 gap-3">
          <input className="px-3 py-2 rounded-lg border border-gray-300 bg-white" placeholder="Your name" />
          <input className="px-3 py-2 rounded-lg border border-gray-300 bg-white" placeholder="Email" />
          <textarea className="px-3 py-2 rounded-lg border border-gray-300 bg-white" rows="4" placeholder="Message" />
          <button className="px-4 py-2 rounded-lg bg-ocean-primary text-white">Send message</button>
        </form>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-3xl">
    <h2 class="text-2xl font-bold text-gray-900 text-center">Contact us</h2>
    <form class="mt-4 grid grid-cols-1 gap-3">
      <input class="px-3 py-2 rounded-lg border border-gray-300 bg-white" placeholder="Your name" />
      <input class="px-3 py-2 rounded-lg border border-gray-300 bg-white" placeholder="Email" />
      <textarea class="px-3 py-2 rounded-lg border border-gray-300 bg-white" rows="4" placeholder="Message"></textarea>
      <button class="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Send message</button>
    </form>
  </div>
  `);
  return { preview, html };
};

const makeContent = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-3xl prose prose-slate">
        <h2>Content section</h2>
        <p>
          Use this area for rich text, lists, and media. It’s great for documentation
          or detailed product descriptions.
        </p>
        <ul>
          <li>Clear typography</li>
          <li>Responsive spacing</li>
          <li>Accessible colors</li>
        </ul>
      </div>
    </section>
  );
  // Use basic typography without relying on prose in snippet to keep Play-friendly
  const html = wrapInSection(`
  <div class="mx-auto max-w-3xl">
    <h2 class="text-2xl font-bold text-gray-900">Content section</h2>
    <p class="mt-2 text-gray-700">Use this area for rich text, lists, and media. It’s great for documentation or detailed product descriptions.</p>
    <ul class="mt-3 list-disc pl-6 text-gray-700 space-y-1">
      <li>Clear typography</li>
      <li>Responsive spacing</li>
      <li>Accessible colors</li>
    </ul>
  </div>
  `);
  return { preview, html };
};

const makeLogoCloud = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-gray-600">Trusted by leading teams</h2>
        <div className="mt-4 grid grid-cols-3 md:grid-cols-6 gap-4 items-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded-md bg-gray-200" />
          ))}
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-5xl">
    <h2 class="text-center text-gray-600">Trusted by leading teams</h2>
    <div class="mt-4 grid grid-cols-3 md:grid-cols-6 gap-4 items-center">
      <div class="h-10 rounded-md bg-gray-200"></div>
      <div class="h-10 rounded-md bg-gray-200"></div>
      <div class="h-10 rounded-md bg-gray-200"></div>
      <div class="h-10 rounded-md bg-gray-200"></div>
      <div class="h-10 rounded-md bg-gray-200"></div>
      <div class="h-10 rounded-md bg-gray-200"></div>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeBanners = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-5xl rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800 flex flex-col md:flex-row items-center justify-between">
        <div className="text-sm">We’ve launched Ocean UI 2.0 — faster and sleeker.</div>
        <a href="#learn" className="mt-2 md:mt-0 text-sm font-medium text-ocean-primary">Learn more →</a>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-5xl rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800 flex flex-col md:flex-row items-center justify-between">
    <div class="text-sm">We’ve launched Ocean UI 2.0 — faster and sleeker.</div>
    <a href="#" class="mt-2 md:mt-0 text-sm font-medium text-[#2563EB]">Learn more →</a>
  </div>
  `);
  return { preview, html };
};

const make404 = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-3xl text-center">
        <div className="text-6xl font-bold text-gray-900">404</div>
        <p className="mt-2 text-gray-600">Sorry, we couldn’t find that page.</p>
        <a href="#home" className="mt-4 inline-flex px-4 py-2 rounded-lg bg-ocean-primary text-white">Go home</a>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-3xl text-center">
    <div class="text-6xl font-bold text-gray-900">404</div>
    <p class="mt-2 text-gray-600">Sorry, we couldn’t find that page.</p>
    <a href="#" class="mt-4 inline-flex px-4 py-2 rounded-lg bg-[#2563EB] text-white">Go home</a>
  </div>
  `);
  return { preview, html };
};

const makeLanding = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white border border-gray-200 p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Ocean UI: Build landing pages rapidly</h1>
          <p className="mt-3 text-gray-600">Launch your product with beautiful, responsive sections.</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <a href="#signup" className="px-4 py-2 rounded-lg bg-ocean-primary text-white">Sign up</a>
            <a href="#live" className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">Live demo</a>
          </div>
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-6xl">
    <div class="rounded-3xl bg-white border border-gray-200 p-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900">Ocean UI: Build landing pages rapidly</h1>
      <p class="mt-3 text-gray-600">Launch your product with beautiful, responsive sections.</p>
      <div class="mt-5 flex items-center justify-center gap-3">
        <a href="#" class="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Sign up</a>
        <a href="#" class="px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-800">Live demo</a>
      </div>
    </div>
  </div>
  `);
  return { preview, html };
};

const makeAbout = () => {
  const preview = (
    <section>
      <div className="mx-auto max-w-5xl">
        <h2 className="text-2xl font-bold text-gray-900 text-center">About us</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <p className="text-gray-700">
              We’re a small team focused on building tools that help developers move faster.
            </p>
            <p className="mt-2 text-gray-700">
              Our values center on simplicity, accessibility, and performance.
            </p>
          </div>
          <div className="h-48 rounded-2xl bg-gray-200" />
        </div>
      </div>
    </section>
  );
  const html = wrapInSection(`
  <div class="mx-auto max-w-5xl">
    <h2 class="text-2xl font-bold text-gray-900 text-center">About us</h2>
    <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
      <div class="rounded-2xl bg-white border border-gray-200 p-6">
        <p class="text-gray-700">We’re a small team focused on building tools that help developers move faster.</p>
        <p class="mt-2 text-gray-700">Our values center on simplicity, accessibility, and performance.</p>
      </div>
      <div class="h-48 rounded-2xl bg-gray-200"></div>
    </div>
  </div>
  `);
  return { preview, html };
};

// Blocks list: label & slug order exactly as requested
const blocksList = [
  { label: "Hero section", slug: "hero", factory: makeHero },
  { label: "CTA section", slug: "cta", factory: makeCTA },
  { label: "Pricing Section", slug: "pricing", factory: makePricing },
  { label: "Stats", slug: "stats", factory: makeStats },
  { label: "Testimonial", slug: "testimonial", factory: makeTestimonial },
  { label: "Team sections", slug: "team", factory: makeTeam },
  { label: "FAQs", slug: "faqs", factory: makeFAQs },
  { label: "Footers", slug: "footers", factory: makeFooters },
  { label: "Flayout Menues", slug: "flyout-menus", factory: makeFlyoutMenus },
  { label: "Features section", slug: "features", factory: makeFeatures },
  { label: "Bento grids", slug: "bento-grids", factory: makeBento },
  { label: "Header section", slug: "header", factory: makeHeader },
  { label: "Newsletter Section", slug: "newsletter", factory: makeNewsletter },
  { label: "Blog section", slug: "blog", factory: makeBlog },
  { label: "Contact section", slug: "contact", factory: makeContact },
  { label: "content section", slug: "content", factory: makeContent },
  { label: "logo cloud", slug: "logo-cloud", factory: makeLogoCloud },
  { label: "Banners", slug: "banners", factory: makeBanners },
  { label: "404 pages", slug: "404", factory: make404 },
  { label: "Landing pages", slug: "landing", factory: makeLanding },
  { label: "About pages", slug: "about", factory: makeAbout },
];

// Build sidebar groups (single group for UI Blocks)
function useBlocksSidebarGroups() {
  return useMemo(() => {
    return [
      {
        key: "ui-blocks",
        label: "UI Blocks",
        items: blocksList.map((b) => ({ label: b.label, slug: b.slug })),
      },
    ];
  }, []);
}

// Demos map (slug -> { preview, html })
function useDemosMap() {
  return useMemo(() => {
    const map = {};
    blocksList.forEach((b) => {
      const demo = b.factory();
      map[b.slug] = demo;
    });
    return map;
  }, []);
}

// Helper to read slug from URL (?item=slug)
function readSlugFromUrl(defaultSlug) {
  try {
    const url = new URL(window.location.href);
    const q = url.searchParams.get("item");
    return q || defaultSlug;
  } catch {
    return defaultSlug;
  }
}

// Preview + code card following the same tabs/format as the Hero pattern
function BlockCard({ title, preview, code }) {
  const [tab, setTab] = useState("preview");
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const t = document.createElement("textarea");
        t.value = code;
        t.setAttribute("readonly", "");
        t.style.position = "absolute";
        t.style.left = "-9999px";
        document.body.appendChild(t);
        t.select();
        document.execCommand("copy");
        document.body.removeChild(t);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // eslint-disable-next-line no-alert
      alert("Failed to copy");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden transition hover:shadow-lg">
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/60 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">Live preview and Tailwind Play–ready HTML snippet.</p>
        </div>
        <div className="inline-flex rounded-lg border border-gray-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`px-3 py-1.5 text-sm rounded-md transition ${
              tab === "preview" ? "bg-blue-50 text-ocean-primary" : "text-gray-700 hover:text-ocean-primary"
            }`}
            aria-pressed={tab === "preview"}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setTab("code")}
            className={`px-3 py-1.5 text-sm rounded-md transition ${
              tab === "code" ? "bg-blue-50 text-ocean-primary" : "text-gray-700 hover:text-ocean-primary"
            }`}
            aria-pressed={tab === "code"}
          >
            Code
          </button>
        </div>
      </div>

      <div className="p-5">
        {tab === "preview" && (
          <div className="rounded-xl border border-gray-100 p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
            {preview}
          </div>
        )}

        {tab === "code" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div className="text-xs text-gray-600">Tailwind Play–ready snippet (single &lt;section&gt; root)</div>
              <button
                type="button"
                onClick={copy}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-gray-200 bg-white/90 text-gray-700 hover:bg-white hover:shadow-sm transition ${
                  copied ? "ring-2 ring-blue-500/30" : ""
                }`}
                aria-label="Copy Tailwind Play HTML snippet to clipboard"
                title="Copy Tailwind Play snippet"
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
            </div>

            <CodeViewer code={code} language="html" initiallyOpen />
          </div>
        )}
      </div>
    </div>
  );
}

export default function BlocksLibrary() {
  const sidebarGroups = useBlocksSidebarGroups();
  const demosMap = useDemosMap();

  // default slug = first item in our list
  const defaultSlug = blocksList[0]?.slug || "";
  const [selectedSlug, setSelectedSlug] = useState(readSlugFromUrl(defaultSlug));

  // sync with back/forward
  useEffect(() => {
    const onPop = () => setSelectedSlug(readSlugFromUrl(defaultSlug));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [defaultSlug]);

  const handleSelect = (value) => {
    if (typeof value === "string") {
      setSelectedSlug(value);
      try {
        const url = new URL(window.location.href);
        url.searchParams.set("item", value);
        window.history.replaceState(null, "", url.toString());
      } catch {
        // ignore
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentDemo = demosMap[selectedSlug];

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="UI Blocks" categories={sidebarGroups} onSelect={handleSelect} />
          </div>
          <div className="md:hidden">
            <Sidebar title="UI Blocks" categories={sidebarGroups} onSelect={handleSelect} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">UI Blocks</h2>
              <p className="text-gray-600 mt-1">
                {blocksList.find((b) => b.slug === selectedSlug)?.label
                  ? `Selected: ${blocksList.find((b) => b.slug === selectedSlug).label}`
                  : "Select a block from the sidebar"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {currentDemo ? (
                <BlockCard title={blocksList.find((b) => b.slug === selectedSlug)?.label || "Block"} preview={currentDemo.preview} code={currentDemo.html} />
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-300 p-6 bg-white">
                  <h3 className="font-semibold text-gray-900">No block selected</h3>
                  <p className="text-sm text-gray-600 mt-1">Choose an item from the left sidebar to see its preview and code snippet.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
