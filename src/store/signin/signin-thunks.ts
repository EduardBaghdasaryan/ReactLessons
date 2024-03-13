import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";
import { signInApiCall } from "../../services";

export const signInThunk = createAsyncThunk<
  User,
  { data: User },
  { rejectValue: string }
>("users/signin", async ({ data }, { rejectWithValue }) => {
  try {
    return signInApiCall(data);
  } catch (error) {
    return rejectWithValue("Failed delete user");
  }
});

export const signUpThunk = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("users/createUser", async (user, { rejectWithValue }) => {
  try {
    return signInApiCall(user);
  } catch (error) {
    return rejectWithValue("Failed delete user");
  }
});
