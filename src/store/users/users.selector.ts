import { createSelector } from "reselect";
import { RootState } from "..";

export const selector = (state: RootState) => state.todos;

export const usersSelector = createSelector(selector, (users) => users.users);
