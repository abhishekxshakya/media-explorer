import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPhotos, fetchVideos } from "../api/mediaApi";
import {
  setLoading,
  setError,
  setResults,
  clearResults,
  appendResults,
  setPage,
  setHasMore,
} from "../redux/features/searchSlice";
import ResultCard from "./ResultCard";
import ShimmerGrid from "./ShimmerGrid";

const ResultGrid = () => {
  const dispatch = useDispatch();
  const { query, activeTab, results, loading, error, page, hasMore } =
    useSelector((store) => store.search);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    // Prevent API calls if the query is empty
    if (!trimmedQuery) {
      dispatch(clearResults());
      return;
    }

    let isMounted = true;

    const getData = async () => {
      try {
        dispatch(setLoading());
        dispatch(setError(null));

        let data = [];
        let totalResults = 0;
        let perPage = 0;

        if (activeTab === "photos") {
          const response = await fetchPhotos(trimmedQuery, page);
          totalResults = response.total_results ?? 0;
          perPage = response.per_page ?? response.photos?.length ?? 0;
          data = response.photos.map((photo) => ({
            id: photo.id,
            type: "photo",
            title: photo.alt || photo.photographer,
            thumbnail: photo.src.medium,
            src: photo.src.original,
          }));
        } else if (activeTab === "videos") {
          const response = await fetchVideos(trimmedQuery, page);
          totalResults = response.total_results ?? 0;
          perPage = response.per_page ?? response.videos?.length ?? 0;
          data = response.videos.map((video) => ({
            id: video.id,
            type: "video",
            title: `Video by ${video.user.name}`,
            thumbnail: video.image,
            src: video.video_files[0]?.link,
          }));
        }

        if (isMounted) {
          const isFirstPage = page === 1;
          if (isFirstPage) {
            dispatch(setResults(data));
          } else {
            dispatch(appendResults(data));
          }

          // Determine if more pages are likely available.
          // Rely on "did the last page return any items" so it works even if total_results is unreliable.
          const moreAvailable = data.length > 0;
          dispatch(setHasMore(moreAvailable));
        }
      } catch (err) {
        if (isMounted) {
          dispatch(setError(err.message || "Something went wrong"));
        }
      } finally {
        if (isMounted) {
          dispatch(setLoading(false));
        }
      }
    };

    getData();

    return () => {
      isMounted = false;
    };
  }, [query, activeTab, page, dispatch]);

  // Infinite scroll observer for loading more results
  useEffect(() => {
    if (!hasMore || loading) return;
    if (!loadMoreRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Avoid spamming page increments while a load is already in flight
            if (!loading) {
              observer.unobserve(entry.target);
              dispatch(setPage(page + 1));
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
    };
  }, [dispatch, hasMore, loading, page]);

  if (!query.trim()) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center text-[var(--color-muted)] shadow-sm">
        Start searching for photos or videos to see results here.
      </div>
    );
  }

  const isInitialLoading = loading && !results.length;

  if (isInitialLoading) {
    // shimmer UI: 3 cards per row on md+, responsive down
    return <ShimmerGrid count={6} />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center font-semibold text-[var(--color-accent-strong)] shadow-sm">
        Error: {error}
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center text-[var(--color-muted)] shadow-sm">
        No results found for "{query.trim()}"
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {results.map((item) => (
          <ResultCard key={`${item.type}-${item.id}`} item={item} />
        ))}
      </div>

      {/* Lazy-load more results with shimmer while loading */}
      {hasMore && (
        <div ref={loadMoreRef} className="mt-6">
          {loading ? (
            <ShimmerGrid count={4} />
          ) : (
            <div className="flex justify-center text-sm text-[var(--color-muted)] py-4">
              Scroll to load more...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultGrid;
