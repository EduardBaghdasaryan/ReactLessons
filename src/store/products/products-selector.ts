import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

const selectProductsSlice = (state: RootState) => state.products;

export const selectProducts = createSelector(
  selectProductsSlice,
  (productsSlice) => productsSlice.products
);
