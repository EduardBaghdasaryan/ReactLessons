import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, OrdersInitialState } from "../../types/orders.types";

const initialState: OrdersInitialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrderStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    createOrderSuccess(state, action: PayloadAction<Order>) {
      state.isLoading = false;
      state.orders.push(action.payload);
    },
    createOrderFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { createOrderStart, createOrderSuccess, createOrderFailure } =
  ordersSlice.actions;
export default ordersSlice.reducer;
