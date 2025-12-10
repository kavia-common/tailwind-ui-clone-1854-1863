import React from "react";

/**
 * PUBLIC_INTERFACE
 * Installation page
 * Provides prerequisites, environment variables, and step-by-step local setup instructions
 * for the Ocean UI Library (CRA + Tailwind) app. Styled with the Ocean Professional theme.
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

  const codeBlockBase = `# Clone the repository
git clone <your-repo-url> ocean-ui
cd ocean-ui/ui_library_frontend

# Install dependencies
npm install

# Start the development server
npm start`;

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

  const codeBlockOps = `# Optional: run tests
CI=true npm test

# Optional: production build
npm run build
`;

  return (
    <main className="relative">
      <div className="bg-ocean-gradient">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="rounded-3xl p-8 sm:p-10 bg-white/60 backdrop-blur shadow-soft border border-gray-100">
            <header className="mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Installation</h1>
              <p className="mt-2 text-gray-700">
                Set up Ocean UI Library locally with Node, npm, and Git. Follow the steps below to get
                the app running in minutes.
              </p>
            </header>

            <section className="space-y-6">
              {/* Tailwind CLI quick start - placed near the top as requested */}
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Tailwind CSS (CLI quick start)</h2>
                <p className="mt-2 text-gray-700">
                  You can use Tailwind via its standalone CLI without installing Node if you prefer.
                  The steps below show the CLI setup. In this project we already ship Tailwind via PostCSS,
                  so this is provided for reference and for standalone usage.
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
{`# From the project root where the tailwindcss binary exists
./tailwindcss -i ./src/input.css -o ./src/index.css --watch`}
                      </code>
                    </pre>
                    <p className="mt-2 text-sm text-gray-600">
                      This will compile Tailwind classes it finds in your template files (React components, HTML, etc.)
                      into the specified output file and rebuild on file changes.
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
                  Note: In this repository we already use Tailwind via PostCSS with Create React App, so you
                  can simply run <span className="font-mono">npm install</span> and <span className="font-mono">npm start</span>.
                  Use the standalone CLI path above if you want a Node-less Tailwind workflow.
                </p>
              </div>
              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Prerequisites</h2>
                <ul className="mt-3 list-disc pl-6 text-gray-700 space-y-1">
                  <li>Node.js 18 or 20</li>
                  <li>npm (comes with Node)</li>
                  <li>Git</li>
                </ul>
                <p className="mt-3 text-sm text-gray-600">
                  Verify your versions: <code className="px-1 py-0.5 bg-gray-100 rounded">node -v</code>{" "}
                  and <code className="px-1 py-0.5 bg-gray-100 rounded">npm -v</code>.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Environment variables</h2>
                <p className="mt-2 text-gray-700">
                  This app uses Create React App. Only variables prefixed with{" "}
                  <span className="font-mono font-semibold">REACT_APP_</span> are available to the
                  frontend. Common keys you can set:
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
                <p className="mt-3 text-sm text-gray-600">
                  Create a <span className="font-mono">.env</span> file in{" "}
                  <span className="font-mono">ui_library_frontend/</span> (same folder as{" "}
                  <span className="font-mono">package.json</span>).
                </p>
                <pre className="mt-4 overflow-x-auto code-scrollbar">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
                    {codeBlockEnv}
                  </code>
                </pre>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Quick start</h2>
                <p className="mt-2 text-gray-700">
                  Clone the repository, install dependencies, and start the development server:
                </p>
                <pre className="mt-4 overflow-x-auto code-scrollbar">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
                    {codeBlockBase}
                  </code>
                </pre>
                <p className="mt-3 text-sm text-gray-600">
                  The app runs on <span className="font-mono">http://localhost:3000</span> by default.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Optional tasks</h2>
                <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-1">
                  <li>Run tests in CI mode</li>
                  <li>Create a production build</li>
                </ul>
                <pre className="mt-4 overflow-x-auto code-scrollbar">
                  <code className="block whitespace-pre rounded-xl border border-gray-200 bg-gray-900 p-4 text-gray-100 text-sm">
                    {codeBlockOps}
                  </code>
                </pre>
              </div>

              <div className="rounded-2xl bg-white border border-gray-100 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Notes</h2>
                <ul className="mt-2 list-disc pl-6 text-gray-700 space-y-1">
                  <li>
                    Tailwind is already configured via PostCSS; no manual CLI step is required during
                    development.
                  </li>
                  <li>
                    To point to APIs, set <span className="font-mono">REACT_APP_API_BASE</span> and/or{" "}
                    <span className="font-mono">REACT_APP_BACKEND_URL</span>.
                  </li>
                  <li>
                    Do not commit your local <span className="font-mono">.env</span> if it contains
                    secrets.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
