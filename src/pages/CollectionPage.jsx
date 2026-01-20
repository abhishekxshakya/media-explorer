import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCollection,
  setSelectedItem,
} from "../redux/features/collectionSlice";
import { useNavigate } from "react-router-dom";

const CollectionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.collection.items);

  if (!items.length) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center text-[var(--color-muted)] shadow-sm">
        Your collection is empty. Add photos or videos using the + button on any
        card.
      </div>
    );
  }

  const openDetail = (item) => {
    dispatch(setSelectedItem(item));
    navigate("/detail");
  };

  const handleRemove = (item) => {
    dispatch(removeFromCollection({ id: item.id, type: item.type }));
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          My Collection
        </h2>
        <span className="text-sm text-[var(--color-muted)]">
          {items.length} item{items.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={`${item.type}-${item.id}`}
            className="card-surface rounded-xl shadow-lg overflow-hidden group cursor-pointer"
            onClick={() => openDetail(item)}>
            <div className="relative aspect-video">
              <img
                className="h-full w-full object-cover"
                src={item.thumbnail}
                alt={item.title}
                loading="lazy"
              />
              <span className="absolute left-2 top-2 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-wide text-white">
                {item.type}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item);
                }}
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white text-lg leading-none hover:bg-[var(--color-accent)]">
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;

