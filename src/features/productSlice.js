import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applyDataFilters, fetchProducts } from "./ProductApi";
import { PRODUCT_LIMIT } from "../utils/constants";

export const fetchProductsPerScroll = createAsyncThunk(
  "products/fetchProducts",
  async ({ page }) => {
    const json = await fetchProducts(page, PRODUCT_LIMIT);
    return json;
  }
);

export const fetchProductsForFilter = createAsyncThunk(
  "products/fetchProductsForFilter",
  async ({ filters, searchText }) => {
    const filteredData = await applyDataFilters(filters, searchText);
    return filteredData;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    page: 1,
    loading: true,
    error: false,
    hasMore: true,
    productsFound: true,
  },
  reducers: {
    updatePage: (state, action) => {
      state.page = action.payload;
    },

    changeFilteredData: (state) => {
      state.filteredProducts.length = 0;
      state.filteredProducts.push(...state.products);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsPerScroll.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsPerScroll.fulfilled, (state, action) => {
        state.loading = false;
        if (state.page === 1) {
          state.products.length = 0;
        }
        state.products.push(...action.payload.data);
        state.hasMore = !!action.payload.next;
      })
      .addCase(fetchProductsPerScroll.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(fetchProductsForFilter.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsForFilter.fulfilled, (state, action) => {
        state.productsFound = !!action.payload.length;
        state.loading = false;
        state.page = 1;
        state.filteredProducts.length = 0;
        state.filteredProducts.push(...action.payload);
      })
      .addCase(fetchProductsForFilter.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { updatePage, resetPage, changeFilteredData } =
  productSlice.actions;

export const selectProductsSlice = (state) => state.products;

export default productSlice.reducer;
