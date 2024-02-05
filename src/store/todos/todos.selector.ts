import { createSelector } from "reselect";
import { RootState } from "..";

export const selector = (state: RootState) => state.todos;

export const todosSelector = createSelector(selector, (todos) => todos.todos);
