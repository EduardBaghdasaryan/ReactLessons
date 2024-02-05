import { createSlice } from "@reduxjs/toolkit";
import { SigninInitialState } from "../../interfaces/signin.types";

const initialState: SigninInitialState = {
  isAuth: false,
  userId: null,
};

const signInSlice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    setSignedIn: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.userId = action.payload.id;
    },
  },
});

export const { setSignedIn } = signInSlice.actions;

export default signInSlice.reducer;
