import React from "react";

const ShimmerCard = () => {
  return (
    <div className="card-surface rounded-xl overflow-hidden shadow-lg">
      <div className="relative aspect-video">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="p-4 bg-[var(--color-surface-elevated)] flex items-center justify-between gap-3">
        <div className="h-4 w-3/4 rounded shimmer" />
        <div className="h-4 w-10 rounded shimmer" />
      </div>
    </div>
  );
};

const ShimmerGrid = ({ count = 6 }) => {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: count }).map((_, idx) => (
          <ShimmerCard key={idx} />
        ))}
      </div>
    </div>
  );
};

export default ShimmerGrid;


