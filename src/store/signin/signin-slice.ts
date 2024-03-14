import { createSlice } from "@reduxjs/toolkit";
import { signInThunk, signUpThunk } from "./signin-thunks";
import { SigninInitialState } from "../../types/signin.types";

const initialState: SigninInitialState = {
  isAuth: false,
  isLoading: false,
  error: null,
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
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error as string;
      })
      .addCase(signUpThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default signInSlice.reducer;
