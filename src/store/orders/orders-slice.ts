import { createSlice } from "@reduxjs/toolkit";
import { OrdersInitialState } from "../../types/orders.types";
import { createOrderThunk } from "./orders-thunks";

const initialState: OrdersInitialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrderThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrderThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrderThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message as string;
      });
  },
});
export default ordersSlice.reducer;
