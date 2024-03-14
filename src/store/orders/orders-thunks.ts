// ordersSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    createOrderStart(state) {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess(state, action: PayloadAction<Order>) {
      state.loading = false;
      state.orders.push(action.payload);
    },
    createOrderFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { createOrderStart, createOrderSuccess, createOrderFailure } =
  ordersSlice.actions;
export default ordersSlice.reducer;
