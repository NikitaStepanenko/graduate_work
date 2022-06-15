import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { $authHost, $host } from "../../api/baseApi";

const initialState = {
  user: null,
  token: null,
  error: "",
};

export const auth = createAsyncThunk(
  "users/auth",
  async (payload, thunkAPI) => {
    try {
      const response = await $authHost.get("auth", payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = initialState.user;
      state.token = initialState.token;
      localStorage.removeItem('token')
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    registration: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(auth.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(auth.rejected, (state, action) => {
      state.error = action.payload.error;
    });
  },
});

export const { registration, login, logoutUser } = userSlice.actions;

export default userSlice.reducer;
