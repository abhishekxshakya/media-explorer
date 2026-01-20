import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import ResultGrid from "./components/ResultGrid";
import Header from "./components/Header";
import CollectionPage from "./pages/CollectionPage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("theme-dark");
    } else {
      root.classList.remove("theme-dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen w-full bg-[var(--color-bg)] text-[var(--color-text)] relative overflow-hidden">
      <div className="circuit-bg" />
      <div className="relative z-10">
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 pb-10 pt-8">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar />
                  <Tabs />
                  <ResultGrid />
                </>
              }
            />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/detail" element={<DetailPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
