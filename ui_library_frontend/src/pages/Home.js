import React from "react";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page showcasing the library overview */
  return (
    <main className="relative">
      <div className="bg-ocean-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl p-10 bg-white/60 backdrop-blur shadow-soft border border-gray-100">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Ocean UI Library
              </h1>
              <p className="mt-3 text-gray-700">
                A modern, lightweight Tailwind UI-like experience built with React and Tailwind CSS. Explore components and blocks with live previews and code examples.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  to="/components"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-ocean-primary text-white shadow hover:shadow-md transition"
                >
                  Explore Components
                </Link>
                <Link
                  to="/blocks"
                  className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-800 hover:shadow transition"
                >
                  Browse UI Blocks
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-soft">
              <div className="text-sm font-semibold text-gray-800">Ocean Professional</div>
              <p className="text-gray-600 mt-2">Blue primary with amber accents, subtle gradients, round corners, and soft shadows.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-soft">
              <div className="text-sm font-semibold text-gray-800">Responsive & Smooth</div>
              <p className="text-gray-600 mt-2">Sidebars collapse on small screens, content stacks, and transitions feel smooth.</p>
            </div>
            <div className="rounded-2xl bg-white p-6 border border-gray-100 shadow-soft">
              <div className="text-sm font-semibold text-gray-800">Code Previews</div>
              <p className="text-gray-600 mt-2">See the implementation for each preview with syntax highlighting.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
