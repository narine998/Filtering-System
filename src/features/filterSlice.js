import { createSlice } from "@reduxjs/toolkit";

export const initialFilters = {
  category: [],
  brand: [],
  minPrice: 0,
  maxPrice: 1000,
  rating: 0,
  sortby: "",
};

const filterSlice = createSlice({
  name: "filters",
  initialState: {
    filters: initialFilters,
    hasFilters: false,
  },
  reducers: {
    applyFilters: (state, action) => {
      state.filters = Object.assign(state.filters, action.payload);
    },
    updateHasFilters: (state, action) => {
      state.hasFilters = action.payload;
    },
  },
});

export const { applyFilters, updateHasFilters } = filterSlice.actions;
export const selectFilters = (state) => state.filters;
export default filterSlice.reducer;
