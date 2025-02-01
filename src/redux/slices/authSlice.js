import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

// Login User
export const loginUser = createAsyncThunk("auth/login", async ({ name, email }) => {
  await axiosInstance.post("/auth/login", { name, email });
  return { name, email };
});

// Logout User
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await axiosInstance.post("/auth/logout");
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
    });
  },
});

export default authSlice.reducer;
