import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../types/products.types";

interface ShoppingCartState {
  cart: Item[];
}

const initialState: ShoppingCartState = {
  cart: [],
};

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Item>) => {
      state.cart.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ itemId: string; newQuantity: number }>
    ) => {
      state.cart = state.cart.map((item) =>
        item.id === action.payload.itemId
          ? { ...item, count: action.payload.newQuantity }
          : item
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  shoppingCartSlice.actions;

export default shoppingCartSlice.reducer;
