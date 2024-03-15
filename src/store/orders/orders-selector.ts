import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const selectOrders = createSelector(
  (state: RootState) => state.orders.orders,
  (orders) => orders
);

export const selectOrdersLoading = createSelector(
  (state: RootState) => state.orders.isLoading,
  (loading) => loading
);

export const selectOrdersError = createSelector(
  (state: RootState) => state.orders.error,
  (error) => error
);
