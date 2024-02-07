import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {
  createUserDataApiCall,
  deleteUserDataApiCall,
  getUsersApiCall,
  updateUserDataApiCall,
} from "../../services";
import { User, initialUserState } from "../../types/user.types";

const initialState: initialUserState = {
  isLoading: false,
  error: null,
  users: [],
};

export const getUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "home/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      return getUsersApiCall();
    } catch (error) {
      rejectWithValue("Something");
    }
  }
);

export const updateUser = createAsyncThunk<
  User,
  { id: number; data: User },
  { rejectValue: string }
>("users/updateUser", async ({ id, data }, { rejectWithValue }) => {
  try {
    return updateUserDataApiCall(id, data);
  } catch (error) {
    return rejectWithValue("Failed to update user");
  }
});

export const deleteUser = createAsyncThunk<
  void,
  { id: number },
  { rejectValue: string }
>("users/deleteUser", async ({ id }, { rejectWithValue }) => {
  try {
    return deleteUserDataApiCall(id);
  } catch (error) {
    return rejectWithValue("Failed delete user");
  }
});

export const createUser = createAsyncThunk<
  User,
  { data: User },
  { rejectValue: string }
>("users/createUser", async ({ data }, { rejectWithValue }) => {
  try {
    return createUserDataApiCall(data);
  } catch (error) {
    return rejectWithValue("Failed delete user");
  }
});

const usersReducer = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = new AxiosError(action.error.message);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedUserIndex = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (updatedUserIndex !== -1) {
          state.users[updatedUserIndex] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = new AxiosError(action.error.message);
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = new AxiosError(action.error.message);
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = new AxiosError(action.error.message);
      });
  },
});

export default usersReducer.reducer;
