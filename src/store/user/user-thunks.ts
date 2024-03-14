import { createAsyncThunk } from "@reduxjs/toolkit";
import { updateUserProfile } from "../../services";
import { User } from "../../types/user.types";
import { ThunkApiConfig } from "../../types";

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
