import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCollection,
  clearSelectedItem,
} from "../redux/features/collectionSlice";
import { useNavigate } from "react-router-dom";

const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const item = useSelector((state) => state.collection.selectedItem);

  if (!item) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center text-[var(--color-muted)] shadow-sm">
        No item selected. Go back to the results and open a card.
      </div>
    );
  }

  const isVideo = item.type === "video";

  const handleBack = () => {
    dispatch(clearSelectedItem());
    navigate(-1);
  };

  const handleAddToCollection = () => {
    dispatch(addToCollection(item));
  };

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="text-sm text-[var(--color-accent)] underline hover:text-[var(--color-accent-strong)]">
          ← Back
        </button>
        <button
          onClick={handleAddToCollection}
          className="rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)] shadow-sm hover:bg-[var(--color-accent-strong)] active:scale-95">
          + Add to collection
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start">
        <div className="rounded-2xl overflow-hidden bg-black/40">
          {isVideo ? (
            <video
              className="w-full h-full max-h-[70vh] object-contain bg-black"
              controls
              poster={item.thumbnail}>
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              className="w-full h-full max-h-[70vh] object-contain bg-black"
              src={item.src}
              alt={item.title}
              loading="lazy"
            />
          )}
        </div>

        <div className="space-y-4">
          <div>
            <span className="mb-2 inline-flex rounded-full bg-[var(--color-surface-elevated)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
              {item.type}
            </span>
            <h1 className="mt-2 text-xl font-semibold text-[var(--color-text)]">
              {item.title}
            </h1>
          </div>

          <div className="space-y-2 text-sm text-[var(--color-muted)]">
            <p>
              <span className="font-semibold text-[var(--color-text)]">
                ID:
              </span>{" "}
              {item.id}
            </p>
            <p>
              <span className="font-semibold text-[var(--color-text)]">
                Source URL:
              </span>{" "}
              <a
                href={item.src}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--color-accent)] underline hover:text-[var(--color-accent-strong)]">
                Open original
              </a>
            </p>
          </div>

          <div className="pt-2">
            <a
              href={item.src}
              download
              className="inline-flex items-center justify-center rounded-xl border border-[var(--color-accent)] bg-[var(--color-accent)] px-4 py-2 text-sm font-semibold text-[var(--color-bg)] shadow-sm hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-accent-strong)] active:scale-95">
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;

