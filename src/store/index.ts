import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./signin/signin-slice";
import moviesReducer from "./movies/movies-slice";

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    movies: moviesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
