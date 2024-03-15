import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder } from "../../services";
import { Order } from "../../types/orders.types";

export const createOrderThunk = createAsyncThunk<Order, Order>(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    const createdOrder = await createOrder(orderData);

    console.log("createdOrder", createdOrder);

    if (createdOrder.length) {
      return createdOrder as Order;
    }
    return rejectWithValue("Failed to create order");
  }
);
