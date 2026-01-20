import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setQuery(text));

    setText("");
  };
  return (
    <div className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm">
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}
        className="flex flex-col gap-4 p-6 md:flex-row md:items-center">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          required
          type="text"
          placeholder="Search photos or videos..."
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-4 py-3 text-lg text-[var(--color-text)] outline-none focus:border-[var(--color-accent)]"
        />
        <button className="rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-5 py-3 text-lg font-semibold text-[var(--color-bg)] shadow-sm transition hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-accent-strong)] active:scale-95">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
