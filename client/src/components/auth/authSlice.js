import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

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
      console.log('rejectWithValue :>> ', rejectWithValue);
      return rejectWithValue([], err);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwtToken: localStorage.getItem('token'), 
    isAuthenticated: null,
    loading: false,
    error: null,
    currentUser: null,
  },
  reducers: {
    onLoginRegister: (state, { payload }) => {
      state.currentUser = payload.data;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    }, 
    onLogout: (state, { payload }) => {
      localStorage.removeItem('token');
      state.jwtToken = null;
      state.currentUser = null;
      state.isAuthenticated = null;
    }, 
  },
  extraReducers: {
    // authenticateUser
    [authenticateUser.fulfilled]: (state, action) => {
      loginRegisterSucces(state, action);
    },
    [authenticateUser.pending]: (state) => {
      state.loading = true;
    },
    [authenticateUser.rejected]: (state, action) => {
      state.error = action.error;
    },
    // registerUser
    [registerUser.fulfilled]: (state, action) => {
      loginRegisterSucces(state, action);
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});

const loginRegisterSucces = (state, action) => {
  localStorage.setItem('token', action.payload.data.token);
  state.jwtToken = localStorage.getItem('token');
  state.loading = false;
  state.error = null;
}

const { actions, reducer } = authSlice;
export const { onLoginRegister, onLogout, onRegister } = actions;

export default reducer;