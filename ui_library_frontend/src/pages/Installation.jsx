import React from "react";

/**
 * PUBLIC_INTERFACE
 * Installation page
 * Tailwind CSS (CLI quick start) with minimal prerequisites.
 * Ocean Professional styling preserved; concise content only.
 */
export default function Installation() {
  const prereq = `- Node.js 18 or 20 (recommended). npm comes bundled with Node.
- Optional: Tailwind CSS CLI has a standalone executable if you don't want to install Node.`;

  const step01 = `# Terminal
npm install tailwindcss @tailwindcss/cli`;

  const step02 = `/* src/input.css */
@import "tailwindcss";`;

  const step03 = `# Terminal
npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch`;

  const step04 = `<!-- index.html -->
<link href="./output.css" rel="stylesheet" />

<div class="p-6">
  <h1 class="text-3xl font-bold text-gray-900">Hello Tailwind!</h1>
  <p class="mt-2 text-gray-600">Start building with utility classes.</p>
</div>`;

  return (
    <main className="relative">
      <div className="bg-gradient-to-b from-blue-500/10 to-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl p-8 sm:p-10 bg-white/70 backdrop-blur shadow-soft border border-gray-100">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Tailwind CSS (CLI quick start)
              </h1>
              <p className="mt-2 text-gray-700">
                Minimal prerequisites and the four quick-start steps. Keep it simple.
              </p>
            </header>

            {/* Prerequisites */}
            <section className="rounded-2xl bg-white border border-gray-100 p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Prerequisites</h2>
              <p className="mt-2 text-gray-700">
                Ensure you have the following before starting:
              </p>
              <pre className="mt-4 overflow-x-auto">
                <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{prereq}
                </code>
              </pre>
            </section>

            {/* Steps */}
            <section className="space-y-6">
              {/* 01 */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  01 Install Tailwind CSS
                </h3>
                <pre className="mt-3 overflow-x-auto">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{step01}
                  </code>
                </pre>
              </div>

              {/* 02 */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  02 Import Tailwind in your CSS
                </h3>
                <p className="mt-2 text-gray-700">
                  Add the following to <span className="font-mono">src/input.css</span>:
                </p>
                <pre className="mt-3 overflow-x-auto">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{step02}
                  </code>
                </pre>
              </div>

              {/* 03 */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  03 Start the Tailwind CLI build process
                </h3>
                <pre className="mt-3 overflow-x-auto">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{step03}
                  </code>
                </pre>
              </div>

              {/* 04 */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  04 Start using Tailwind in your HTML
                </h3>
                <pre className="mt-3 overflow-x-auto">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{step04}
                  </code>
                </pre>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
