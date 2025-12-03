// src/features/toolkit/slice/authSlice.ts
import api from "@features/api/axiosClient";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: { phonenumber: string; password: string }, thunkAPI) => {
    try {
      const response = await api.post("/mainuser/login", payload);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer; // ✅ must export .reducer, not the slice itself
