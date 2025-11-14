import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// 🧹 Clear GitHub Pages redirect leftovers
const redirect = sessionStorage.getItem("redirect");
if (redirect) {
  sessionStorage.removeItem("redirect");
  window.history.replaceState(null, "", redirect);
}

// 🌐 Determine base path
const isLocal = window.location.hostname === "localhost";
const base = isLocal ? "/" : "/ek-mutthi-anaj";

// 🚀 Force start at /what-we-do (local + production)
const currentPath = window.location.pathname;
const expectedPath = isLocal ? "/what-we-do" : "/ek-mutthi-anaj/what-we-do";

if (currentPath === "/" || currentPath === "/ek-mutthi-anaj" || currentPath === "/ek-mutthi-anaj/") {
  window.history.replaceState(null, "", expectedPath);
}

// 🧩 Render app (only ONE BrowserRouter allowed)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={base}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
