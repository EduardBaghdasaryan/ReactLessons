import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import {
  signInApiCall,
  signUpApiCall,
  updateUserProfile,
} from "../../services";
import { User } from "../../types/user.types";
import { SignIn } from "../../types/signin.types";
import { ThunkApiConfig } from "../../types";

export const signInThunk = createAsyncThunk<User, SignIn, ThunkApiConfig>(
  "users/signin",
  async (signIn, { rejectWithValue }) => {
    const user = await signInApiCall(signIn);
    if (user) {
      return user;
    }
    return rejectWithValue("Invalid email or password");
  }
);

export const signUpThunk = createAsyncThunk<User, User, ThunkApiConfig>(
  "users/createUser",
  async (user, { rejectWithValue }) => {
    const newUser = await signUpApiCall(user);
    if (newUser) {
      return newUser;
    }
    return rejectWithValue("Failed to create user");
  }
);
