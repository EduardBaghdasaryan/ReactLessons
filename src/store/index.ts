import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./signin/signin-slice";
import { userReducer } from "./user/user-slice";
import productsReducer from "./products/products-slice";
import cardReducer from "./card/card-slice";
import ordersReducer from "./orders/orders-slice";

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    user: userReducer,
    products: productsReducer,
    cart: cardReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
