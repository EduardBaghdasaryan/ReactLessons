import { createSlice } from "@reduxjs/toolkit";
import { SigninInitialState, User } from "../../types";
import { signInThunk, signUpThunk } from "./signin-thunks";

const initialState: SigninInitialState = {
  isAuth: false,
  isLoading: false,
  userData: {} as User,
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(signUpThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default signInSlice.reducer;
