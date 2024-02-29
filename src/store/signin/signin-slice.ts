import { createSlice } from "@reduxjs/toolkit";
import { SigninInitialState } from "../../types";
import { signInThunk } from "./signin-thunks";

const initialState: SigninInitialState = {
  isAuth: false,
  id: null,
  isLoading: false,
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
        state.id = action.payload.id!;
        state.isLoading = false;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default signInSlice.reducer;
