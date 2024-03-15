import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

const selectProductsSlice = (state: RootState) => state.products;

export const selectProducts = createSelector(
  selectProductsSlice,
  (productsSlice) => productsSlice.products
);

export const selectProductById = createSelector(
  [selectProducts, (_, productId) => productId],
  (products, productId) => {
    return products.find((product) => product.id === productId) || null;
  }
);

export const selectProductsError = createSelector(
  selectProductsSlice,
  (productsSlice) => productsSlice.error
);

export const selectProductsLoading = createSelector(
  selectProductsSlice,
  (productsSlice) => productsSlice.isLoading
);
