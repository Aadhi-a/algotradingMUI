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

// -------------------------------------------------------------
//  LOGIN
// -------------------------------------------------------------
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

// -------------------------------------------------------------
//  SIGNUP (NEW)
// -------------------------------------------------------------
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    payload: {
      name: string;
      email_id: string;
      phonenumber: string;
      password: string;
      confirm_password: string;
    },
    thunkAPI
  ) => {
    try {
      const response = await api.post("/mainuser/signup", payload);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Signup failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// -------------------------------------------------------------

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
      // -------------------
      // LOGIN
      // -------------------
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // save user
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // -------------------
      // SIGNUP
      // -------------------
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // save user from signup API
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
