
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const isCollectionPage = location.pathname === "/collection";

  return (
    <header className="app-header w-full">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-[var(--color-bg)] font-bold">
            MX
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[var(--color-surface-elevated)]">
              Media Explorer
            </span>
            <span className="text-sm text-[var(--color-muted)]">
              Photos & Videos in one place
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/collection"
            className={`rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition active:scale-95 ${
              isCollectionPage
                ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-[var(--color-bg)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            }`}>
            Collection
          </Link>
          <button
            onClick={onToggleTheme}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2 text-sm font-medium text-[var(--color-text)] shadow-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-95">
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
