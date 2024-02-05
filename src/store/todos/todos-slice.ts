import { createSlice } from "@reduxjs/toolkit";
import { TodosProps } from "../../interfaces/todos.types";

const initialState: TodosProps = {
  todos: [],
};

const todosReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todosReducer.actions;

export default todosReducer.reducer;
