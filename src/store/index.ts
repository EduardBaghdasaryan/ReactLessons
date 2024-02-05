import { configureStore } from "@reduxjs/toolkit";
import signInReducer from "./signin/signin-slice";
import todosReducer from "./todos/todos-slice";

export const store = configureStore({
  reducer: {
    signIn: signInReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
