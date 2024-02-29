import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types";
import { signInApiCall } from "../../services";

export const signInThunk = createAsyncThunk<
  User,
  { data: User },
  { rejectValue: string }
>("users/createUser", async ({ data }, { rejectWithValue }) => {
  try {
    return signInApiCall(data);
  } catch (error) {
    return rejectWithValue("Failed delete user");
  }
});
