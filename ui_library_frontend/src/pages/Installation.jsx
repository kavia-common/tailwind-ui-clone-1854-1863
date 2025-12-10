import React from "react";

/**
 * PUBLIC_INTERFACE
 * Installation page
 * Focused on Tailwind CSS CLI quick start and minimal local run guidance for the
 * Ocean UI Library (CRA + Tailwind) app. Ocean Professional styling is preserved.
 */
export default function Installation() {
  const envKeys = [
    "REACT_APP_API_BASE",
    "REACT_APP_BACKEND_URL",
    "REACT_APP_FRONTEND_URL",
    "REACT_APP_WS_URL",
    "REACT_APP_NODE_ENV",
    "REACT_APP_NEXT_TELEMETRY_DISABLED",
    "REACT_APP_ENABLE_SOURCE_MAPS",
    "REACT_APP_PORT",
    "REACT_APP_TRUST_PROXY",
    "REACT_APP_LOG_LEVEL",
    "REACT_APP_HEALTHCHECK_PATH",
    "REACT_APP_FEATURE_FLAGS",
    "REACT_APP_EXPERIMENTS_ENABLED",
  ];

  const codeBlockRun = `# From ui_library_frontend/
npm install
npm start
# App runs at http://localhost:3000`;

  const codeBlockEnv = `# .env (create at ui_library_frontend/.env)
# Only variables prefixed with REACT_APP_ are exposed to the client in CRA
REACT_APP_API_BASE=https://api.example.com
REACT_APP_BACKEND_URL=https://api.example.com
REACT_APP_FRONTEND_URL=http://localhost:3000
REACT_APP_WS_URL=ws://localhost:3000
REACT_APP_NODE_ENV=development
# Optional flags
REACT_APP_ENABLE_SOURCE_MAPS=true
REACT_APP_LOG_LEVEL=debug`;

  return (
    <main className="relative">
      <div className="bg-ocean-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl p-8 sm:p-10 bg-white/60 backdrop-blur shadow-soft border border-gray-100">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Installation</h1>
              <p className="mt-2 text-gray-700">
                Tailwind CSS setup and minimal local run instructions for Ocean UI Library.
              </p>
            </header>

            <section className="space-y-6">
              {/* 1) Tailwind CLI quick start */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Tailwind CSS (CLI quick start)</h2>
                <p className="mt-2 text-gray-700">
                  Use the standalone Tailwind CLI to compile styles. This project already includes Tailwind via
                  PostCSS for CRA; the CLI steps are provided for a quick, Node-less workflow or standalone usage.
                </p>
                <ol className="mt-4 list-decimal pl-6 space-y-3 text-gray-800">
                  <li>
                    Download the Tailwind CSS standalone CLI for your platform.
                    <pre className="mt-3 overflow-x-auto code-scrollbar">
                      <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{`# macOS (arm64)
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64
chmod +x tailwindcss-macos-arm64
mv tailwindcss-macos-arm64 tailwindcss

# macOS (x64)
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-x64
chmod +x tailwindcss-macos-x64
mv tailwindcss-macos-x64 tailwindcss

# Linux (x64)
curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64
chmod +x tailwindcss-linux-x64
mv tailwindcss-linux-x64 tailwindcss

# Windows (PowerShell)
Invoke-WebRequest -Uri "https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-windows-x64.exe" -OutFile "tailwindcss.exe"`}
                      </code>
                    </pre>
                  </li>
                  <li>
                    Create a minimal Tailwind input CSS file (for example at <span className="font-mono">./src/input.css</span>).
                    <pre className="mt-3 overflow-x-auto code-scrollbar">
                      <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{`/* src/input.css */
@tailwind base;
@tailwind components;
@tailwind utilities;`}
                      </code>
                    </pre>
                  </li>
                  <li>
                    Generate your output CSS by running the CLI and watching for changes.
                    <pre className="mt-3 overflow-x-auto code-scrollbar">
                      <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{`# From the folder where the tailwindcss binary exists
./tailwindcss -i ./src/input.css -o ./src/index.css --watch`}
                      </code>
                    </pre>
                    <p className="mt-2 text-sm text-gray-600">
                      This compiles Tailwind classes found in your templates (React components, HTML, etc.) and
                      rebuilds on file changes.
                    </p>
                  </li>
                  <li>
                    Ensure your templates are included in your Tailwind config content paths.
                    <pre className="mt-3 overflow-x-auto code-scrollbar">
                      <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{`// tailwind.config.js
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: { extend: {} },
  plugins: [],
};`}
                      </code>
                    </pre>
                  </li>
                </ol>
                <p className="mt-4 text-sm text-gray-600">
                  Note: In this repository Tailwind is already wired through PostCSS with Create React App.
                  You can just run <span className="font-mono">npm install</span> and{" "}
                  <span className="font-mono">npm start</span> to develop locally.
                </p>
              </div>

              {/* 2) Minimal project run steps (optional) */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Run locally (minimal)</h2>
                <p className="mt-2 text-gray-700">
                  Install dependencies and start the development server from the frontend folder:
                </p>
                <pre className="mt-4 overflow-x-auto code-scrollbar">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{codeBlockRun}
                  </code>
                </pre>
              </div>

              {/* 3) Optional configuration (condensed env note) */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Optional configuration</h2>
                <p className="mt-2 text-gray-700">
                  If you need to point to external services or change behavior, set environment variables in a
                  <span className="font-mono"> .env</span> file (Create React App exposes only variables prefixed with{" "}
                  <span className="font-mono">REACT_APP_</span>):
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {envKeys.map((k) => (
                    <div
                      key={k}
                      className="px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-gray-800 font-mono"
                    >
                      {k}
                    </div>
                  ))}
                </div>
                <pre className="mt-4 overflow-x-auto code-scrollbar">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
{codeBlockEnv}
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
