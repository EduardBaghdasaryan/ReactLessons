import { createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";
import { SignIn, User } from "../../types";
import {
  signInApiCall,
  signUpApiCall,
  updateUserProfile,
} from "../../services";

interface ThunkApiConfig {
  rejectValue: string;
}

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

export const updateProfileThunk = createAsyncThunk<User, User, ThunkApiConfig>(
  "profile/updateProfile",
  async (userData, { rejectWithValue }) => {
    const updatedUser = await updateUserProfile(userData);
    if (updatedUser) {
      return updatedUser as User;
    }
    return rejectWithValue("Failed to update profile");
  }
);
