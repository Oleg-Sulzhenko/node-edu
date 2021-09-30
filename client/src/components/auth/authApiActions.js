import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    const { email, password } = userData;
    try {
      const response = await axios.post("/api/auth", { email, password });
      return response;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);
