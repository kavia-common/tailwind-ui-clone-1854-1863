import React, { useEffect, useMemo, useState } from "react";
import CodeViewer from "../../components/CodeViewer";

/**
 * PUBLIC_INTERFACE
 * TablesDemo provides four distinct table examples, each rendered inside its own <section>,
 * and each with a matching code snippet derived from the same JSX (single source of truth).
 * Demos:
 *  1) Basic Table: static data, simple styling.
 *  2) Sortable Table: click column headers to sort asc/desc with indicator.
 *  3) Search/Filter Table: text input filters by name/email with subtle highlight.
 *  4) Paginated + Selectable Table: client-side pagination, page size, row selection and selected count.
 *
 * Styling: Aligned with Ocean Professional theme using blue/amber accents.
 */

const baseData = [
  { id: 1, name: "Jane Cooper", email: "jane.cooper@example.com", role: "Engineer" },
  { id: 2, name: "Mark Edwards", email: "mark.edwards@example.com", role: "Designer" },
  { id: 3, name: "Emily Clark", email: "emily.clark@example.com", role: "Product" },
  { id: 4, name: "Luke Walker", email: "luke.walker@example.com", role: "Engineer" },
  { id: 5, name: "Ava Scott", email: "ava.scott@example.com", role: "Support" },
  { id: 6, name: "Noah Brooks", email: "noah.brooks@example.com", role: "Engineer" },
];

/**
 * Utility: escape HTML for code output
 */
function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Convert JSX section to an "App" snippet (keeps className attributes).
 * For simplicity, we manually string-build each section from the same state that renders the preview.
 */
function buildSectionHtml(strings) {
  return ["<section>", ...strings.map((l) => `  ${l}`), "</section>"].join("\n");
}

/**
 * Basic Table - static preview and code
 */
function BasicTableSection() {
  const rows = baseData.slice(0, 4);
  const preview = (
    <section>
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-gray-700">Name</th>
              <th className="px-4 py-2 text-gray-700">Email</th>
              <th className="px-4 py-2 text-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2">{r.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const rowsHtml = rows
    .map(
      (r) =>
        `<tr className="border-t border-gray-100">
          <td className="px-4 py-2">${escapeHtml(r.name)}</td>
          <td className="px-4 py-2">${escapeHtml(r.email)}</td>
          <td className="px-4 py-2">${escapeHtml(r.role)}</td>
        </tr>`
    )
    .join("\n        ");

  const code = buildSectionHtml([
    `<div className="rounded-xl border border-gray-200 overflow-hidden bg-white">`,
    `  <table className="w-full text-left text-sm">`,
    `    <thead className="bg-gray-50">`,
    `      <tr>`,
    `        <th className="px-4 py-2 text-gray-700">Name</th>`,
    `        <th className="px-4 py-2 text-gray-700">Email</th>`,
    `        <th className="px-4 py-2 text-gray-700">Role</th>`,
    `      </tr>`,
    `    </thead>`,
    `    <tbody>`,
    `        ${rowsHtml}`,
    `    </tbody>`,
    `  </table>`,
    `</div>`,
  ]);

  return { title: "Basic Table", preview, code, language: "jsx" };
}

/**
 * Sortable Table - click header to toggle sort; visual indicator arrow and active color.
 */
function SortableTableSection() {
  const [sortBy, setSortBy] = useState("name");
  const [direction, setDirection] = useState("asc");

  const sorted = useMemo(() => {
    const arr = [...baseData.slice(0, 6)];
    arr.sort((a, b) => {
      const va = String(a[sortBy]).toLowerCase();
      const vb = String(b[sortBy]).toLowerCase();
      if (va < vb) return direction === "asc" ? -1 : 1;
      if (va > vb) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [sortBy, direction]);

  const toggleSort = (key) => {
    if (key === sortBy) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setDirection("asc");
    }
  };

  const Arrow = ({ active, dir }) => (
    <span
      className={`ml-1 inline-block transition-transform ${active ? "text-[#2563EB]" : "text-gray-400"} ${
        active && dir === "desc" ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      ▲
    </span>
  );

  const preview = (
    <section>
      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-gray-700">
                <button
                  type="button"
                  className={`inline-flex items-center hover:text-ocean-primary ${sortBy === "name" ? "text-ocean-primary" : ""}`}
                  onClick={() => toggleSort("name")}
                >
                  Name <Arrow active={sortBy === "name"} dir={direction} />
                </button>
              </th>
              <th className="px-4 py-2 text-gray-700">
                <button
                  type="button"
                  className={`inline-flex items-center hover:text-ocean-primary ${sortBy === "email" ? "text-ocean-primary" : ""}`}
                  onClick={() => toggleSort("email")}
                >
                  Email <Arrow active={sortBy === "email"} dir={direction} />
                </button>
              </th>
              <th className="px-4 py-2 text-gray-700">
                <button
                  type="button"
                  className={`inline-flex items-center hover:text-ocean-primary ${sortBy === "role" ? "text-ocean-primary" : ""}`}
                  onClick={() => toggleSort("role")}
                >
                  Role <Arrow active={sortBy === "role"} dir={direction} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r) => (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2">{r.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  // The snippet represents the rendered table structure; interactive behavior is not encoded in HTML.
  const rowsHtml = sorted
    .map(
      (r) =>
        `<tr className="border-t border-gray-100">
          <td className="px-4 py-2">${escapeHtml(r.name)}</td>
          <td className="px-4 py-2">${escapeHtml(r.email)}</td>
          <td className="px-4 py-2">${escapeHtml(r.role)}</td>
        </tr>`
    )
    .join("\n        ");

  const headerBtn = (label, active) =>
    `<button type="button" className="inline-flex items-center hover:text-ocean-primary ${
      active ? "text-ocean-primary" : ""
    }">${label}<span className="ml-1 inline-block text-[#2563EB]">▲</span></button>`;

  const code = buildSectionHtml([
    `<div className="rounded-xl border border-gray-200 overflow-hidden bg-white">`,
    `  <table className="w-full text-left text-sm">`,
    `    <thead className="bg-gray-50">`,
    `      <tr>`,
    `        <th className="px-4 py-2 text-gray-700">${headerBtn("Name", sortBy === "name")}</th>`,
    `        <th className="px-4 py-2 text-gray-700">${headerBtn("Email", sortBy === "email")}</th>`,
    `        <th className="px-4 py-2 text-gray-700">${headerBtn("Role", sortBy === "role")}</th>`,
    `      </tr>`,
    `    </thead>`,
    `    <tbody>`,
    `        ${rowsHtml}`,
    `    </tbody>`,
    `  </table>`,
    `</div>`,
  ]);

  return { title: "Sortable Table", preview, code, language: "jsx" };
}

/**
 * Search/Filter Table - client-side text input filters by name or email; highlight matches.
 */
function highlight(text, query) {
  if (!query) return escapeHtml(text);
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")})`, "ig");
  return escapeHtml(text).replace(re, '<mark class="bg-yellow-100 text-gray-900 rounded px-0.5">$1</mark>');
}

function FilteringTableSection() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return baseData.slice(0, 6);
    return baseData.filter((r) => r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s));
  }, [q]);

  const preview = (
    <section>
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2 text-gray-500">🔎</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 bg-white w-64 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            placeholder="Search name or email..."
          />
        </div>

        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-gray-700">Name</th>
                <th className="px-4 py-2 text-gray-700">Email</th>
                <th className="px-4 py-2 text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="border-t border-gray-100">
                  <td className="px-4 py-2">
                    <span dangerouslySetInnerHTML={{ __html: highlight(r.name, q) }} />
                  </td>
                  <td className="px-4 py-2">
                    <span dangerouslySetInnerHTML={{ __html: highlight(r.email, q) }} />
                  </td>
                  <td className="px-4 py-2">{r.role}</td>
                </tr>
              ))}
              {!filtered.length && (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={3}>
                    No results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );

  const rowsHtml =
    filtered.length > 0
      ? filtered
          .map(
            (r) =>
              `<tr className="border-t border-gray-100">
          <td className="px-4 py-2"><span>${highlight(r.name, q)}</span></td>
          <td className="px-4 py-2"><span>${highlight(r.email, q)}</span></td>
          <td className="px-4 py-2">${escapeHtml(r.role)}</td>
        </tr>`
          )
          .join("\n        ")
      : `<tr>
          <td className="px-4 py-6 text-gray-500" colSpan={3}>No results</td>
        </tr>`;

  const code = buildSectionHtml([
    `<div className="space-y-3">`,
    `  <div className="flex items-center gap-2">`,
    `    <span className="px-2 text-gray-500">🔎</span>`,
    `    <input className="px-3 py-2 rounded-lg border border-gray-300 bg-white w-64" placeholder="Search name or email..." />`,
    `  </div>`,
    `  <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">`,
    `    <table className="w-full text-left text-sm">`,
    `      <thead className="bg-gray-50">`,
    `        <tr>`,
    `          <th className="px-4 py-2 text-gray-700">Name</th>`,
    `          <th className="px-4 py-2 text-gray-700">Email</th>`,
    `          <th className="px-4 py-2 text-gray-700">Role</th>`,
    `        </tr>`,
    `      </thead>`,
    `      <tbody>`,
    `        ${rowsHtml}`,
    `      </tbody>`,
    `    </table>`,
    `  </div>`,
    `</div>`,
  ]);

  return { title: "Search/Filter Table", preview, code, language: "jsx" };
}

/**
 * Paginated + Selectable Table - client-side pagination with page size, row selection, and selected count badge.
 */
function PaginatedSelectableTableSection() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(3);
  const [selected, setSelected] = useState(() => new Set()); // store ids

  const total = baseData.length;
  const totalPages = Math.max(1, Math.ceil(total / size));
  const start = (page - 1) * size;
  const pageRows = baseData.slice(start, start + size);

  useEffect(() => {
    // Keep page within range when size changes
    if (page > totalPages) setPage(totalPages);
  }, [size, totalPages, page]);

  const toggleRow = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const allOnPageSelected = pageRows.every((r) => selected.has(r.id));
  const toggleAllOnPage = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allOnPageSelected) {
        pageRows.forEach((r) => next.delete(r.id));
      } else {
        pageRows.forEach((r) => next.add(r.id));
      }
      return next;
    });
  };

  const selectedCount = selected.size;

  const preview = (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="inline-flex items-center gap-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            className="px-2 py-1 rounded-lg border border-gray-300 bg-white text-sm"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            {[3, 5, 10].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="inline-flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page <span className="font-medium">{page}</span> of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
          <div className="text-sm text-gray-700">
            Selected:
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2563EB] border border-blue-200">
              {selectedCount}
            </span>
          </div>
          <div className="text-xs text-gray-500">
            Showing {start + 1}-{Math.min(start + size, total)} of {total}
          </div>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-gray-700 w-10">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30"
                  checked={allOnPageSelected}
                  onChange={toggleAllOnPage}
                  aria-label="Select all rows on current page"
                />
              </th>
              <th className="px-4 py-2 text-gray-700">Name</th>
              <th className="px-4 py-2 text-gray-700">Email</th>
              <th className="px-4 py-2 text-gray-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r) => {
              const isChecked = selected.has(r.id);
              return (
                <tr
                  key={r.id}
                  className={`border-t border-gray-100 ${isChecked ? "bg-blue-50/40" : ""}`}
                >
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500/30"
                      checked={isChecked}
                      onChange={() => toggleRow(r.id)}
                      aria-label={`Select ${r.name}`}
                    />
                  </td>
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2">{r.email}</td>
                  <td className="px-4 py-2">{r.role}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );

  const rowsHtml = pageRows
    .map((r) => {
      const isChecked = selected.has(r.id);
      return `<tr className="border-t border-gray-100 ${isChecked ? "bg-blue-50/40" : ""}">
          <td className="px-4 py-2">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" ${
              isChecked ? "checked" : ""
            } />
          </td>
          <td className="px-4 py-2">${escapeHtml(r.name)}</td>
          <td className="px-4 py-2">${escapeHtml(r.email)}</td>
          <td className="px-4 py-2">${escapeHtml(r.role)}</td>
        </tr>`;
    })
    .join("\n        ");

  const code = buildSectionHtml([
    `<div className="flex items-center justify-between mb-3">`,
    `  <div className="inline-flex items-center gap-2">`,
    `    <span className="text-sm text-gray-700">Rows per page:</span>`,
    `    <select className="px-2 py-1 rounded-lg border border-gray-300 bg-white text-sm">`,
    `      <option>3</option><option>5</option><option>10</option>`,
    `    </select>`,
    `  </div>`,
    `  <div className="inline-flex items-center gap-2">`,
    `    <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm">Prev</button>`,
    `    <span className="text-sm text-gray-700">Page <span className="font-medium">${page}</span> of ${totalPages}</span>`,
    `    <button className="px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-sm">Next</button>`,
    `  </div>`,
    `</div>`,
    `<div className="rounded-xl border border-gray-200 overflow-hidden bg-white">`,
    `  <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">`,
    `    <div className="text-sm text-gray-700">Selected:`,
    `      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-[#2563EB] border border-blue-200">${selected.size}</span>`,
    `    </div>`,
    `    <div className="text-xs text-gray-500">Showing ${start + 1}-${Math.min(
      start + size,
      total
    )} of ${total}</div>`,
    `  </div>`,
    `  <table className="w-full text-left text-sm">`,
    `    <thead className="bg-gray-50">`,
    `      <tr>`,
    `        <th className="px-4 py-2 text-gray-700 w-10"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue-600" ${
      pageRows.every((r) => selected.has(r.id)) ? "checked" : ""
    } /></th>`,
    `        <th className="px-4 py-2 text-gray-700">Name</th>`,
    `        <th className="px-4 py-2 text-gray-700">Email</th>`,
    `        <th className="px-4 py-2 text-gray-700">Role</th>`,
    `      </tr>`,
    `    </thead>`,
    `    <tbody>`,
    `        ${rowsHtml}`,
    `    </tbody>`,
    `  </table>`,
    `</div>`,
  ]);

  return { title: "Paginated + Selectable Table", preview, code, language: "jsx" };
}

/**
 * Render a group of sections with shared tabs and copy feature,
 * ensuring the Code tab shows the exact section JSX string from the same source.
 */
function SectionCard({ title, data }) {
  const [tab, setTab] = useState("preview");
  const { preview, code, language } = data;
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <div className="inline-flex rounded-md border border-gray-200 bg-gray-50 p-0.5">
          <button
            type="button"
            onClick={() => setTab("preview")}
            className={`px-3 py-1.5 text-sm rounded-md transition ${
              tab === "preview" ? "bg-white text-ocean-primary shadow-sm" : "text-gray-700 hover:text-ocean-primary"
            }`}
            aria-pressed={tab === "preview"}
          >
            Preview
          </button>
          <button
            type="button"
            onClick={() => setTab("code")}
            className={`px-3 py-1.5 text-sm rounded-md transition ${
              tab === "code" ? "bg-white text-ocean-primary shadow-sm" : "text-gray-700 hover:text-ocean-primary"
            }`}
            aria-pressed={tab === "code"}
          >
            Code
          </button>
        </div>
      </div>

      {tab === "preview" && (
        <div className="rounded-xl border border-gray-100 p-6 bg-gradient-to-br from-blue-500/10 to-gray-50">{preview}</div>
      )}

      {tab === "code" && (
        <CodeViewer code={code} language={language} initiallyOpen showCopy />
      )}
    </section>
  );
}

/**
 * The default export renders all sections (used for the full demo page).
 */
// PUBLIC_INTERFACE
export default function TablesDemo() {
  const basic = BasicTableSection();
  const sortable = SortableTableSection();
  const filtering = FilteringTableSection();
  const paginatedSelectable = PaginatedSelectableTableSection();

  return (
    <div className="space-y-10">
      <SectionCard title={basic.title} data={basic} />
      <SectionCard title={sortable.title} data={sortable} />
      <SectionCard title={filtering.title} data={filtering} />
      <SectionCard title={paginatedSelectable.title} data={paginatedSelectable} />
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Wrapper components for single-section rendering per catalog slug.
 * Each wrapper mounts only its corresponding section and ensures the Code tab/snippet
 * shows exactly that section (via SectionCard using the section's code field).
 */

// PUBLIC_INTERFACE
export function TablesBasicOnly() {
  const basic = BasicTableSection();
  return (
    <div className="space-y-10">
      <SectionCard title={basic.title} data={basic} />
    </div>
  );
}

// PUBLIC_INTERFACE
export function TablesSortableOnly() {
  const sortable = SortableTableSection();
  return (
    <div className="space-y-10">
      <SectionCard title={sortable.title} data={sortable} />
    </div>
  );
}

// PUBLIC_INTERFACE
export function TablesFilterOnly() {
  const filtering = FilteringTableSection();
  return (
    <div className="space-y-10">
      <SectionCard title={filtering.title} data={filtering} />
    </div>
  );
}

// PUBLIC_INTERFACE
export function TablesPaginatedSelectableOnly() {
  const paginatedSelectable = PaginatedSelectableTableSection();
  return (
    <div className="space-y-10">
      <SectionCard title={paginatedSelectable.title} data={paginatedSelectable} />
    </div>
  );
}
