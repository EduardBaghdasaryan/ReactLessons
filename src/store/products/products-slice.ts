import { createSlice } from "@reduxjs/toolkit";
import { ProductsInitialState } from "../../types/products.types";
import { createProductThunk, fetchProducts } from "./products-thunks";

const initialState: ProductsInitialState = {
  products: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(createProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to create product";
      });
  },
});

export default productsSlice.reducer;
