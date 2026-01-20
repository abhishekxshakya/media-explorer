import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // saved collection of media items
  selectedItem: null, // item currently opened in detail view
};

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    addToCollection(state, action) {
      const item = action.payload;
      const exists = state.items.some(
        (i) => i.id === item.id && i.type === item.type
      );
      if (!exists) {
        state.items.push(item);
      }
    },
    removeFromCollection(state, action) {
      const { id, type } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.id === id && item.type === type)
      );
    },
    setSelectedItem(state, action) {
      state.selectedItem = action.payload;
    },
    clearSelectedItem(state) {
      state.selectedItem = null;
    },
  },
});

export const {
  addToCollection,
  removeFromCollection,
  setSelectedItem,
  clearSelectedItem,
} = collectionSlice.actions;

export default collectionSlice.reducer;

