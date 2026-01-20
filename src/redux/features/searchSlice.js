import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    activeTab: "photos",
    results: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },

  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
      state.page = 1;
      state.hasMore = true;
      state.results = [];
    },
    SetActiveTab(state, action) {
      state.activeTab = action.payload;
      state.page = 1;
      state.hasMore = true;
      state.results = [];
    },
    setResults(state, action) {
      state.results = action.payload;
      state.loading = false;
    },
    appendResults(state, action) {
      state.results = [...state.results, ...action.payload];
      state.loading = false;
    },
    setLoading(state, action) {
      state.loading = action.payload ?? true;
      if (state.loading) {
        state.error = null;
      }
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearResults(state) {
      state.results = [];
      state.page = 1;
      state.hasMore = true;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setHasMore(state, action) {
      state.hasMore = action.payload;
    },
  },
});

export const {
  setQuery,
  SetActiveTab,
  setResults,
  appendResults,
  setLoading,
  setError,
  clearResults,
  setPage,
  setHasMore,
} = searchSlice.actions;

export default searchSlice.reducer;
