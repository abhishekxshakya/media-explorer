import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetActiveTab } from "../redux/features/searchSlice";

const Tabs = () => {
  const tabs = [
    { label: "Photos", value: "photos" },
    { label: "Videos", value: "videos" },
  ];

  const dispatch = useDispatch();

  const activeTab = useSelector((state) => state.search.activeTab);
  return (
    <div className="flex flex-wrap gap-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-sm">
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={index}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-95 ${
              isActive
                ? "bg-[var(--color-accent)] text-[var(--color-bg)] shadow"
                : "bg-[var(--color-surface-elevated)] text-[var(--color-text)] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            }`}
            onClick={() => {
              dispatch(SetActiveTab(tab.value));
            }}>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
