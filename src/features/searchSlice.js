import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchText: "",
  },
  reducers: {
    inputChange: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const { inputChange } = searchSlice.actions;
export const selectSearchText = (state) => state.search.searchText;

export default searchSlice.reducer;
