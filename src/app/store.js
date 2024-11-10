import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/productSlice";
import filterReducer from "../features/filterSlice";
import searchReducer from "../features/searchSlice";
import appReducer from "../features/appSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
    search: searchReducer,
    app: appReducer,
  },
});
