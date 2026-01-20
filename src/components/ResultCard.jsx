import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  addToCollection,
  setSelectedItem,
} from "../redux/features/collectionSlice";
import { useNavigate } from "react-router-dom";

const ResultCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isVideo = item.type === "video";

  const [isInView, setIsInView] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current || typeof IntersectionObserver === "undefined") {
      // Fallback so media still loads if IntersectionObserver isn't available
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const openDetail = () => {
    dispatch(setSelectedItem(item));
    navigate("/detail");
  };

  const handleAddToCollection = (e) => {
    e.stopPropagation();
    dispatch(addToCollection(item));
  };

  return (
    <div
      ref={cardRef}
      className="card-surface rounded-xl shadow-lg overflow-hidden cursor-pointer"
      onClick={openDetail}>
      <div className="relative aspect-video">
        {isVideo ? (
          isInView ? (
            <video
              className="h-full w-full object-cover"
              controls
              poster={item.thumbnail}
              preload="metadata">
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img
              className="h-full w-full object-cover"
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
            />
          )
        ) : (
          <img
            className="h-full w-full object-cover"
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
          />
        )}
        <span className="absolute left-2 top-2 rounded-full bg-black/70 px-3 py-1 text-xs uppercase tracking-wide text-white select-none">
          {item.type}
        </span>
        <button
          onClick={handleAddToCollection}
          type="button"
          aria-label="Add to collection"
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white text-base leading-none cursor-pointer shadow-md transition-transform transition-colors duration-150 hover:bg-[var(--color-accent)] hover:scale-105 active:scale-95">
          <span className="relative block h-4 w-4">
            <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white" />
            <span className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 rounded-full bg-white" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
