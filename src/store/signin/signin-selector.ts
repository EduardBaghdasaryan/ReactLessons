import { createSelector } from "reselect";
import { RootState } from "..";

export const signInSelector = (state: RootState) => state.signIn;

export const isAuthSelector = createSelector(
  signInSelector,
  (singin) => singin.isAuth
);

export const userIdSelector = createSelector(
  signInSelector,
  (singin) => singin.id
);

export const isLoadingSelector = createSelector(
  signInSelector,
  (signin) => signin.isLoading
);
