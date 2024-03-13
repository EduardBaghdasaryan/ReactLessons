import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignIn, User } from "../../types";
import { signInApiCall, singUpApiCall } from "../../services";

export const signInThunk = createAsyncThunk<
  User,
  SignIn,
  { rejectValue: string }
>("users/signin", async (signIn, { rejectWithValue }) => {
  try {
    return await signInApiCall(signIn);
  } catch (error) {
    return rejectWithValue("Failed to sign in");
  }
});

export const signUpThunk = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("users/createUser", async (user, { rejectWithValue }) => {
  try {
    return singUpApiCall(user);
  } catch (error) {
    return rejectWithValue("Failed delete user");
  }
});
