import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ComponentsLibrary from "./pages/ComponentsLibrary";
import BlocksLibrary from "./pages/BlocksLibrary";

// PUBLIC_INTERFACE
function Navbar() {
  /** Top navigation bar with active route highlighting */
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-gradient-app text-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-white/20 shadow-soft"></div>
          <div className="font-semibold text-white">Ocean UI Library</div>
        </div>
        <div className="flex items-center gap-6">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm font-medium transition px-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                isActive ? "text-white bg-white/10" : "text-white/90 hover:text-white"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/components"
            className={({ isActive }) =>
              `text-sm font-medium transition px-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                isActive ? "text-white bg-white/10" : "text-white/90 hover:text-white"
              }`
            }
          >
            Components
          </NavLink>
          <NavLink
            to="/blocks"
            className={({ isActive }) =>
              `text-sm font-medium transition px-2 py-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                isActive ? "text-white bg-white/10" : "text-white/90 hover:text-white"
              }`
            }
          >
            UI Blocks
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** App root with routes and persistent navbar */
  return (
    <Router>
      <div className="min-h-screen bg-ocean-gradient bg-ocean-bg">
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<ComponentsLibrary />} />
            <Route path="/blocks" element={<BlocksLibrary />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
