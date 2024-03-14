import { createSlice } from "@reduxjs/toolkit";
import { User, UserInitialState } from "../../types/user.types";
import { updateProfileThunk } from "./user-thunks";

const initialState: UserInitialState = {
  userData: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProfileThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reducer: userReducer, actions } = userSlice;
export const { setUser } = actions;
