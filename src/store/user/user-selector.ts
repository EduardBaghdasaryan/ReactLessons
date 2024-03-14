import { createSelector } from "reselect";
import { RootState } from "..";

const getUserData = (state: RootState) => state.user;

export const userDataSelector = createSelector(
  getUserData,
  (user) => user.userData
);
