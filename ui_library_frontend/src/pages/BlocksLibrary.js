import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import PreviewCard, { ensureSectionWrappedHtml } from "../components/PreviewCard";

/**
 * PUBLIC_INTERFACE
 * BlocksLibrary
 * Renders all UI Blocks with a unique <section> preview and an exact matching section-only HTML snippet.
 * Ensures: code tab is derived from the same source, copy-to-clipboard works, and sidebar labels map to demo keys.
 */
export default function BlocksLibrary() {
  // Sidebar entries in fixed order (must not change)
  const blocksCategories = useMemo(
    () => [
      { key: "hero-section", label: "Hero section" },
      { key: "cta-section", label: "CTA section" },
      { key: "pricing-section", label: "Pricing Section" },
      { key: "stats", label: "Stats" },
      { key: "testimonial", label: "Testimonial" },
      { key: "team-sections", label: "Team sections" },
      { key: "faqs", label: "FAQs" },
      { key: "footers", label: "Footers" },
      { key: "flayout-menues", label: "Flayout Menues" },
      { key: "features-section", label: "Features section" },
      { key: "bento-grids", label: "Bento grids" },
      { key: "header-section", label: "Header section" },
      { key: "newsletter-section", label: "Newsletter Section" },
      { key: "blog-section", label: "Blog section" },
      { key: "contact-section", label: "Contact section" },
      { key: "content-section", label: "content section" },
      { key: "logo-cloud", label: "logo cloud" },
      { key: "banners", label: "Banners" },
      { key: "404-pages", label: "404 pages" },
      { key: "landing-pages", label: "Landing pages" },
      { key: "about-pages", label: "About pages" },
    ],
    []
  );

  // Map every key to a demo generator: returns { preview: ReactNode, code: string }
  // Each code is EXACTLY the HTML for the <section> preview, using class= (no JSX).
  const demos = useMemo(() => {
    const shell = (inner) =>
      `<section class="min-h-[100px] p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">
${inner}
</section>`.trim();

    const make = (innerHTML, preview) => ({
      preview,
      code: shell(innerHTML),
    });

    return {
      "hero-section": make(
        `
  <div class="mx-auto max-w-3xl text-center">
    <h1 class="text-3xl sm:text-4xl font-bold text-gray-900">Build faster with Ocean UI</h1>
    <p class="mt-3 text-gray-700">Beautiful, accessible components for React + Tailwind.</p>
    <div class="mt-6 flex items-center justify-center gap-3">
      <a href="#start" class="px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow hover:shadow-md">Get started</a>
      <a href="#demo" class="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow">Live demo</a>
    </div>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Build faster with Ocean UI</h1>
              <p className="mt-3 text-gray-700">Beautiful, accessible components for React + Tailwind.</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <a href="#start" className="px-4 py-2 rounded-lg bg-ocean-primary text-white shadow hover:shadow-md">
                  Get started
                </a>
                <a href="#demo" className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow">
                  Live demo
                </a>
              </div>
            </div>
          </section>
        )
      ),

      "cta-section": make(
        `
  <div class="mx-auto max-w-3xl text-center">
    <div class="rounded-2xl bg-white border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-900">Ready to dive in?</h2>
      <p class="mt-2 text-gray-700">Start building with Ocean UI today.</p>
      <div class="mt-4">
        <a href="#create" class="px-4 py-2 rounded-lg bg-[#2563EB] text-white shadow hover:shadow-md">Create account</a>
      </div>
    </div>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-3xl text-center">
              <div className="rounded-2xl bg-white border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Ready to dive in?</h2>
                <p className="mt-2 text-gray-700">Start building with Ocean UI today.</p>
                <div className="mt-4">
                  <a href="#create" className="px-4 py-2 rounded-lg bg-ocean-primary text-white shadow hover:shadow-md">
                    Create account
                  </a>
                </div>
              </div>
            </div>
          </section>
        )
      ),

      "pricing-section": make(
        `
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="rounded-xl bg-white border border-gray-200 p-5">
      <div class="font-semibold text-gray-900">Starter</div>
      <div class="mt-2 text-3xl font-bold text-gray-900">$0</div>
      <ul class="mt-3 text-sm text-gray-700 space-y-1">
        <li>Basic components</li>
        <li>Email support</li>
      </ul>
      <a href="#choose" class="mt-4 inline-block px-4 py-2 rounded-lg bg-[#2563EB] text-white">Choose</a>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-5">
      <div class="font-semibold text-gray-900">Pro</div>
      <div class="mt-2 text-3xl font-bold text-gray-900">$12</div>
      <ul class="mt-3 text-sm text-gray-700 space-y-1">
        <li>All components</li>
        <li>Priority support</li>
      </ul>
      <a href="#choose" class="mt-4 inline-block px-4 py-2 rounded-lg bg-[#2563EB] text-white">Choose</a>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-5">
      <div class="font-semibold text-gray-900">Teams</div>
      <div class="mt-2 text-3xl font-bold text-gray-900">$29</div>
      <ul class="mt-3 text-sm text-gray-700 space-y-1">
        <li>Unlimited seats</li>
        <li>SLA support</li>
      </ul>
      <a href="#choose" class="mt-4 inline-block px-4 py-2 rounded-lg bg-[#2563EB] text-white">Choose</a>
    </div>
  </div>
        `,
        (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[{t:"Starter",p:"$0"},{t:"Pro",p:"$12"},{t:"Teams",p:"$29"}].map((x)=>(
                <div key={x.t} className="rounded-xl bg-white border border-gray-200 p-5">
                  <div className="font-semibold text-gray-900">{x.t}</div>
                  <div className="mt-2 text-3xl font-bold text-gray-900">{x.p}</div>
                  <ul className="mt-3 text-sm text-gray-700 space-y-1">
                    <li>Feature A</li><li>Feature B</li>
                  </ul>
                  <a href="#choose" className="mt-4 inline-block px-4 py-2 rounded-lg bg-ocean-primary text-white">Choose</a>
                </div>
              ))}
            </div>
          </section>
        )
      ),

      stats: make(
        `
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
    <div class="rounded-xl bg-white border border-gray-200 p-4">
      <div class="text-2xl font-bold text-gray-900">12k+</div>
      <div class="text-sm text-gray-600">Customers</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-4">
      <div class="text-2xl font-bold text-gray-900">98%</div>
      <div class="text-sm text-gray-600">Satisfaction</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-4">
      <div class="text-2xl font-bold text-gray-900">24/7</div>
      <div class="text-sm text-gray-600">Support</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-4">
      <div class="text-2xl font-bold text-gray-900">5m</div>
      <div class="text-sm text-gray-600">Downloads</div>
    </div>
  </div>
        `,
        (
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                ["12k+","Customers"],
                ["98%","Satisfaction"],
                ["24/7","Support"],
                ["5m","Downloads"],
              ].map(([a,b])=>(
                <div key={a} className="rounded-xl bg-white border border-gray-200 p-4">
                  <div className="text-2xl font-bold text-gray-900">{a}</div>
                  <div className="text-sm text-gray-600">{b}</div>
                </div>
              ))}
            </div>
          </section>
        )
      ),

      testimonial: make(
        `
  <div class="mx-auto max-w-2xl text-center">
    <figure class="rounded-2xl bg-white border border-gray-200 p-6">
      <blockquote class="text-gray-800">“Ocean UI helped us ship 3x faster.”</blockquote>
      <figcaption class="mt-3 text-sm text-gray-600">— Alex, Product Lead</figcaption>
    </figure>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-2xl text-center">
              <figure className="rounded-2xl bg-white border border-gray-200 p-6">
                <blockquote className="text-gray-800">“Ocean UI helped us ship 3x faster.”</blockquote>
                <figcaption className="mt-3 text-sm text-gray-600">— Alex, Product Lead</figcaption>
              </figure>
            </div>
          </section>
        )
      ),

      "team-sections": make(
        `
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="rounded-xl bg-white border border-gray-200 p-4 text-center">
      <div class="mx-auto h-16 w-16 rounded-full bg-blue-100"></div>
      <div class="mt-2 font-semibold text-gray-900">Jane Doe</div>
      <div class="text-sm text-gray-600">Designer</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-4 text-center">
      <div class="mx-auto h-16 w-16 rounded-full bg-amber-100"></div>
      <div class="mt-2 font-semibold text-gray-900">Mark Lee</div>
      <div class="text-sm text-gray-600">Engineer</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-4 text-center">
      <div class="mx-auto h-16 w-16 rounded-full bg-gray-100"></div>
      <div class="mt-2 font-semibold text-gray-900">Ava Ray</div>
      <div class="text-sm text-gray-600">PM</div>
    </div>
    <div class="rounded-xl bg-white border border-gray-200 p-4 text-center">
      <div class="mx-auto h-16 w-16 rounded-full bg-blue-100"></div>
      <div class="mt-2 font-semibold text-gray-900">Sam Wu</div>
      <div class="text-sm text-gray-600">QA</div>
    </div>
  </div>
        `,
        (
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["blue","amber","gray","blue"].map((c,i)=>(
                <div key={i} className="rounded-xl bg-white border border-gray-200 p-4 text-center">
                  <div className={`mx-auto h-16 w-16 rounded-full bg-${c}-100`}></div>
                  <div className="mt-2 font-semibold text-gray-900">Member {i+1}</div>
                  <div className="text-sm text-gray-600">Role</div>
                </div>
              ))}
            </div>
          </section>
        )
      ),

      faqs: make(
        `
  <div class="mx-auto max-w-2xl">
    <div class="rounded-lg border border-gray-200 bg-white">
      <button class="w-full text-left px-4 py-3 font-medium">What is Ocean UI?</button>
      <div class="border-t border-gray-200 px-4 py-3 text-sm text-gray-700">A Tailwind-inspired component library.</div>
    </div>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-2xl">
              <div className="rounded-lg border border-gray-200 bg-white">
                <button className="w-full text-left px-4 py-3 font-medium">What is Ocean UI?</button>
                <div className="border-t border-gray-200 px-4 py-3 text-sm text-gray-700">
                  A Tailwind-inspired component library.
                </div>
              </div>
            </div>
          </section>
        )
      ),

      footers: make(
        `
  <footer class="mx-auto max-w-6xl text-sm text-gray-600">
    <div class="flex flex-col md:flex-row items-center justify-between gap-3">
      <div>&copy; 2025 Ocean UI. All rights reserved.</div>
      <div class="space-x-4">
        <a href="#d">Docs</a>
        <a href="#p">Privacy</a>
        <a href="#c">Contact</a>
      </div>
    </div>
  </footer>
        `,
        (
          <section>
            <footer className="mx-auto max-w-6xl text-sm text-gray-600">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div>© 2025 Ocean UI. All rights reserved.</div>
                <div className="space-x-4">
                  <a href="#d">Docs</a>
                  <a href="#p">Privacy</a>
                  <a href="#c">Contact</a>
                </div>
              </div>
            </footer>
          </section>
        )
      ),

      "flayout-menues": make(
        `
  <div class="relative">
    <button class="px-4 py-2 rounded-lg border border-gray-200 bg-white">Open flyout</button>
    <div class="mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow p-2">
      <a href="#s" class="block px-3 py-2 rounded hover:bg-gray-50">Settings</a>
      <a href="#p" class="block px-3 py-2 rounded hover:bg-gray-50">Profile</a>
    </div>
  </div>
        `,
        (
          <section>
            <div className="relative">
              <button className="px-4 py-2 rounded-lg border border-gray-200 bg-white">Open flyout</button>
              <div className="mt-2 w-56 rounded-xl border border-gray-200 bg-white shadow p-2">
                <a href="#s" className="block px-3 py-2 rounded hover:bg-gray-50">Settings</a>
                <a href="#p" className="block px-3 py-2 rounded hover:bg-gray-50">Profile</a>
              </div>
            </div>
          </section>
        )
      ),

      "features-section": make(
        `
  <div class="mx-auto max-w-5xl">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="rounded-xl bg-white border border-gray-200 p-4">
        <div class="h-8 w-8 rounded-lg bg-blue-200"></div>
        <div class="mt-2 font-semibold text-gray-900">Fast</div>
        <p class="text-sm text-gray-600">Ship quickly with prebuilt blocks.</p>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-4">
        <div class="h-8 w-8 rounded-lg bg-amber-200"></div>
        <div class="mt-2 font-semibold text-gray-900">Accessible</div>
        <p class="text-sm text-gray-600">Components with a11y in mind.</p>
      </div>
      <div class="rounded-xl bg-white border border-gray-200 p-4">
        <div class="h-8 w-8 rounded-lg bg-gray-200"></div>
        <div class="mt-2 font-semibold text-gray-900">Modern</div>
        <p class="text-sm text-gray-600">Clean, modern design system.</p>
      </div>
    </div>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["blue","amber","gray"].map((c,i)=>(
                  <div key={i} className="rounded-xl bg-white border border-gray-200 p-4">
                    <div className={`h-8 w-8 rounded-lg bg-${c}-200`}></div>
                    <div className="mt-2 font-semibold text-gray-900">Feature {i+1}</div>
                    <p className="text-sm text-gray-600">Short description.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
      ),

      "bento-grids": make(
        `
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="col-span-2 h-24 rounded-2xl bg-white border border-gray-200"></div>
    <div class="h-24 rounded-2xl bg-white border border-gray-200"></div>
    <div class="h-24 rounded-2xl bg-white border border-gray-200"></div>
  </div>
        `,
        (
          <section>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="col-span-2 h-24 rounded-2xl bg-white border border-gray-200"></div>
              <div className="h-24 rounded-2xl bg-white border border-gray-200"></div>
              <div className="h-24 rounded-2xl bg-white border border-gray-200"></div>
            </div>
          </section>
        )
      ),

      "header-section": make(
        `
  <header class="rounded-xl bg-white border border-gray-200 p-4 flex items-center justify-between">
    <div class="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]"></div>
    <nav class="flex items-center gap-4 text-sm">
      <a href="#d" class="text-gray-700 hover:text-[#2563EB]">Docs</a>
      <a href="#b" class="text-gray-700 hover:text-[#2563EB]">Blog</a>
      <a href="#s" class="px-3 py-1.5 rounded-lg bg-[#2563EB] text-white">Sign in</a>
    </nav>
  </header>
        `,
        (
          <section>
            <header className="rounded-xl bg-white border border-gray-200 p-4 flex items-center justify-between">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#F59E0B]"></div>
              <nav className="flex items-center gap-4 text-sm">
                <a href="#d" className="text-gray-700 hover:text-ocean-primary">Docs</a>
                <a href="#b" className="text-gray-700 hover:text-ocean-primary">Blog</a>
                <a href="#s" className="px-3 py-1.5 rounded-lg bg-ocean-primary text-white">Sign in</a>
              </nav>
            </header>
          </section>
        )
      ),

      "newsletter-section": make(
        `
  <div class="mx-auto max-w-xl rounded-2xl bg-white border border-gray-200 p-6">
    <h3 class="text-lg font-semibold text-gray-900">Subscribe to updates</h3>
    <form class="mt-3 flex gap-2">
      <input type="email" placeholder="you@example.com" class="flex-1 px-3 py-2 rounded-lg border border-gray-300" />
      <button class="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Subscribe</button>
    </form>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-xl rounded-2xl bg-white border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900">Subscribe to updates</h3>
              <form className="mt-3 flex gap-2">
                <input type="email" placeholder="you@example.com" className="flex-1 px-3 py-2 rounded-lg border border-gray-300" />
                <button className="px-4 py-2 rounded-lg bg-ocean-primary text-white">Subscribe</button>
              </form>
            </div>
          </section>
        )
      ),

      "blog-section": make(
        `
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <article class="rounded-xl bg-white border border-gray-200 p-4">
      <div class="h-32 rounded-lg bg-gray-200"></div>
      <h4 class="mt-3 font-semibold text-gray-900">Post title</h4>
      <p class="text-sm text-gray-600">Short summary goes here.</p>
    </article>
    <article class="rounded-xl bg-white border border-gray-200 p-4">
      <div class="h-32 rounded-lg bg-gray-200"></div>
      <h4 class="mt-3 font-semibold text-gray-900">Another post</h4>
      <p class="text-sm text-gray-600">Short summary goes here.</p>
    </article>
    <article class="rounded-xl bg-white border border-gray-200 p-4">
      <div class="h-32 rounded-lg bg-gray-200"></div>
      <h4 class="mt-3 font-semibold text-gray-900">Last post</h4>
      <p class="text-sm text-gray-600">Short summary goes here.</p>
    </article>
  </div>
        `,
        (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1,2,3].map(i=>(
                <article key={i} className="rounded-xl bg-white border border-gray-200 p-4">
                  <div className="h-32 rounded-lg bg-gray-200"></div>
                  <h4 className="mt-3 font-semibold text-gray-900">Post {i}</h4>
                  <p className="text-sm text-gray-600">Short summary goes here.</p>
                </article>
              ))}
            </div>
          </section>
        )
      ),

      "contact-section": make(
        `
  <div class="mx-auto max-w-xl rounded-2xl bg-white border border-gray-200 p-6">
    <form class="grid gap-3">
      <input class="px-3 py-2 rounded-lg border border-gray-300" placeholder="Name" />
      <input type="email" class="px-3 py-2 rounded-lg border border-gray-300" placeholder="Email" />
      <textarea rows="4" class="px-3 py-2 rounded-lg border border-gray-300" placeholder="Message"></textarea>
      <button class="px-4 py-2 rounded-lg bg-[#2563EB] text-white">Send message</button>
    </form>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-xl rounded-2xl bg-white border border-gray-200 p-6">
              <form className="grid gap-3">
                <input className="px-3 py-2 rounded-lg border border-gray-300" placeholder="Name" />
                <input type="email" className="px-3 py-2 rounded-lg border border-gray-300" placeholder="Email" />
                <textarea rows="4" className="px-3 py-2 rounded-lg border border-gray-300" placeholder="Message"></textarea>
                <button className="px-4 py-2 rounded-lg bg-ocean-primary text-white">Send message</button>
              </form>
            </div>
          </section>
        )
      ),

      "content-section": make(
        `
  <div class="prose prose-sm max-w-none">
    <h2>Heading</h2>
    <p>Ocean UI provides building blocks for modern apps.</p>
    <ul>
      <li>Clean</li>
      <li>Accessible</li>
      <li>Responsive</li>
    </ul>
  </div>
        `,
        (
          <section>
            <div className="prose prose-sm max-w-none">
              <h2>Heading</h2>
              <p>Ocean UI provides building blocks for modern apps.</p>
              <ul>
                <li>Clean</li><li>Accessible</li><li>Responsive</li>
              </ul>
            </div>
          </section>
        )
      ),

      "logo-cloud": make(
        `
  <div class="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
    <div class="h-8 bg-gray-200 rounded"></div>
    <div class="h-8 bg-gray-200 rounded"></div>
    <div class="h-8 bg-gray-200 rounded"></div>
    <div class="h-8 bg-gray-200 rounded"></div>
    <div class="h-8 bg-gray-200 rounded"></div>
    <div class="h-8 bg-gray-200 rounded"></div>
  </div>
        `,
        (
          <section>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
              {Array.from({length:6}).map((_,i)=>(
                <div key={i} className="h-8 bg-gray-200 rounded"></div>
              ))}
            </div>
          </section>
        )
      ),

      banners: make(
        `
  <div class="rounded-xl border border-blue-200 bg-blue-50 text-blue-800 px-4 py-3">
    New: Ocean UI v2 launches next week!
  </div>
        `,
        (
          <section>
            <div className="rounded-xl border border-blue-200 bg-blue-50 text-blue-800 px-4 py-3">
              New: Ocean UI v2 launches next week!
            </div>
          </section>
        )
      ),

      "404-pages": make(
        `
  <div class="mx-auto max-w-2xl text-center">
    <div class="text-6xl font-bold text-gray-900">404</div>
    <p class="mt-2 text-gray-700">Sorry, we couldn't find that page.</p>
    <a href="#home" class="mt-4 inline-block px-4 py-2 rounded-lg bg-[#2563EB] text-white">Go home</a>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-6xl font-bold text-gray-900">404</div>
              <p className="mt-2 text-gray-700">Sorry, we couldn't find that page.</p>
              <a href="#home" className="mt-4 inline-block px-4 py-2 rounded-lg bg-ocean-primary text-white">Go home</a>
            </div>
          </section>
        )
      ),

      "landing-pages": make(
        `
  <div class="mx-auto max-w-6xl">
    <div class="rounded-2xl bg-white border border-gray-200 p-8 text-center">
      <h1 class="text-3xl font-bold text-gray-900">Ocean UI for teams</h1>
      <p class="mt-2 text-gray-700">Build polished products faster.</p>
      <a href="#trial" class="mt-4 inline-block px-4 py-2 rounded-lg bg-[#2563EB] text-white">Start free trial</a>
    </div>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-6xl">
              <div className="rounded-2xl bg-white border border-gray-200 p-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900">Ocean UI for teams</h1>
                <p className="mt-2 text-gray-700">Build polished products faster.</p>
                <a href="#trial" className="mt-4 inline-block px-4 py-2 rounded-lg bg-ocean-primary text-white">Start free trial</a>
              </div>
            </div>
          </section>
        )
      ),

      "about-pages": make(
        `
  <div class="mx-auto max-w-3xl">
    <div class="rounded-2xl bg-white border border-gray-200 p-6">
      <h2 class="text-xl font-semibold text-gray-900">About Ocean</h2>
      <p class="mt-2 text-gray-700">We craft modern React + Tailwind blocks.</p>
    </div>
  </div>
        `,
        (
          <section>
            <div className="mx-auto max-w-3xl">
              <div className="rounded-2xl bg-white border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900">About Ocean</h2>
                <p className="mt-2 text-gray-700">We craft modern React + Tailwind blocks.</p>
              </div>
            </div>
          </section>
        )
      ),
    };
  }, []);

  // Sensible default selection: 'Hero section'
  const orderedSlugs = useMemo(() => blocksCategories.map((c) => c.key), [blocksCategories]);

  const readSlugFromUrl = () => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("item");
      return q || orderedSlugs[0];
    } catch {
      return orderedSlugs[0];
    }
  };

  const [selectedSlug, setSelectedSlug] = useState(readSlugFromUrl());

  useEffect(() => {
    const onPop = () => setSelectedSlug(readSlugFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Resolve current demo
  const currentDemo = demos[selectedSlug];

  // Fallback placeholder (should not occur)
  const fallback = {
    preview: (
      <section>
        <div className="rounded-xl border border-dashed border-gray-300 p-6 bg-white">
          <h3 className="font-semibold text-gray-900">Coming soon</h3>
          <p className="text-sm text-gray-600 mt-1">Demo not available yet.</p>
        </div>
      </section>
    ),
    code: ensureSectionWrappedHtml(`
      <div class="rounded-xl border border-dashed border-gray-300 p-6 bg-white">
        <h3 class="font-semibold text-gray-900">Coming soon</h3>
        <p class="text-sm text-gray-600 mt-1">Demo not available yet.</p>
      </div>
    `),
  };

  const currentTitle =
    blocksCategories.find((c) => c.key === selectedSlug)?.label || "UI Block";

  return (
    <main className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="flex">
          <div className="hidden md:block">
            <Sidebar title="UI Blocks" categories={blocksCategories} onSelect={handleSelect} />
          </div>
          <div className="md:hidden">
            <Sidebar title="UI Blocks" categories={blocksCategories} onSelect={handleSelect} />
          </div>

          <section className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">UI Blocks</h2>
              <p className="text-gray-600 mt-1">
                {currentTitle ? `Selected: ${currentTitle}` : "Select a block from the sidebar"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <PreviewCard
                title={currentTitle}
                description="Live preview and Tailwind Play–ready HTML snippet (exactly matches the preview)."
                preview={(currentDemo || fallback).preview}
                code={(currentDemo || fallback).code}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
