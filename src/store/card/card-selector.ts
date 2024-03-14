import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

const selectCardSlice = (state: RootState) => state.cart;

export const selectCard = createSelector(
  selectCardSlice,
  (cardSlice) => cardSlice.cart
);
