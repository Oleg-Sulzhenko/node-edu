import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
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

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    const { name, email, password } = userData;
    try {
      const response = await axios.post("/api/users", { name, email, password });
      return response;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);
