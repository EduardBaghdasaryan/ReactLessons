import { createAsyncThunk } from "@reduxjs/toolkit";
import { createOrder, fetchOrders } from "../../services";
import { ThunkApiConfig } from "../../types";
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

export const fetchOrdersThunk = createAsyncThunk<Order[], void, ThunkApiConfig>(
  "orders/fetchProducts",
  async (_, { rejectWithValue }) => {
    const orders = await fetchOrders();
    if (orders.length) {
      return orders;
    }
    return rejectWithValue("Cant fetch orders");
  }
);
