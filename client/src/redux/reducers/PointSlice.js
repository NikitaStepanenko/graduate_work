import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { $authHost, $host } from "../../api/baseApi";
import {
  acceptMeeting,
  declineMeeting,
  getPoints,
  getUserCurrentPoint,
} from "../../api/pointApi";

const initialState = {
  points: [],
  userPoint: null,
  loading: false,
};

export const getAllPoints = createAsyncThunk(
  "points",
  async (payload, thunkAPI) => {
    try {
      const response = await getPoints(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const getUserPoint = createAsyncThunk(
  "points/get",
  async (payload, thunkAPI) => {
    try {
      const response = await getUserCurrentPoint();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const acceptNewMeeting = createAsyncThunk(
  "points/accept",
  async (payload, thunkAPI) => {
    try {
      const response = await acceptMeeting(payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const declineNewMeeting = createAsyncThunk(
  "points/decline",
  async (payload, thunkAPI) => {
    try {
      const response = await declineMeeting(payload);
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const pointSlice = createSlice({
  name: "point",
  initialState,
  reducers: {
    removeUserPoint: (state) => {
      state.userPoint = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPoints.fulfilled, (state, action) => {
      state.points = action.payload;
      state.loading = false;
    });
    builder.addCase(getAllPoints.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPoints.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    builder.addCase(getUserPoint.fulfilled, (state, action) => {
      state.userPoint = action.payload;
      state.loading = false;
    });
    builder.addCase(getUserPoint.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    builder.addCase(acceptNewMeeting.fulfilled, (state, action) => {
      state.userPoint = action.payload;
      state.loading = false;
    });
    builder.addCase(acceptNewMeeting.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });

    builder.addCase(declineNewMeeting.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(declineNewMeeting.rejected, (state, action) => {
      state.error = action.payload.error;
      state.loading = false;
    });
  },
});

export const { removeUserPoint } = pointSlice.actions;

export default pointSlice.reducer;
