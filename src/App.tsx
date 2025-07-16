import { Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Home from "./components/Home";
import ArticlePage from "./components/ArticlePage";

function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "sans-serif" }}>
      <h2 style={{ fontSize: "2rem", color: "#e74c3c" }}>404 - Page Not Found</h2>
      <p style={{ marginTop: "1rem" }}>
        The page you're looking for doesn’t exist.
      </p>
      <a
        href="/"
        style={{
          display: "inline-block",
          marginTop: "1.5rem",
          padding: "0.6rem 1.2rem",
          backgroundColor: "#0366d6",
          color: "#fff",
          borderRadius: "6px",
          textDecoration: "none",
        }}
      >
        ← Back to Home
      </a>
    </div>
  );
}

function App(){
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };
  return (
    <div
      style={{
        backgroundColor: darkMode ? "#121212" : "#f9f9f9",
        color: darkMode ? "#f5f5f5" : "#000",
        minHeight: "100vh",
        transition: "all 0.3s ease",
        padding: "2rem",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "right", marginBottom: "1rem" }}>
        <button
          onClick={toggleDarkMode}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "5px",
            backgroundColor: darkMode ? "#f1c40f" : "#2c3e50",
            color: darkMode ? "#000" : "#fff",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} />} />
        <Route path="/article/:id" element={<ArticlePage darkMode={darkMode} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;