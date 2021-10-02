import { createSlice } from '@reduxjs/toolkit';
import { authenticateUser, registerUser } from './authApiThunks';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwtToken: localStorage.getItem('token'), 
    isAuthenticated: null,
    loading: "idle",
    error: null,
    currentUser: null,
  },
  reducers: {
    onLogin: (state, { payload }) => {
      state.currentUser = payload.data;
      state.isAuthenticated = true;
      state.loading = "done";
      state.error = null;
    }, 
    onLogout: (state, { payload }) => {
      localStorage.removeItem('token');
      state.jwtToken = null;
      state.currentUser = null;
      state.isAuthenticated = null;
    }, 
    onRegister: (state, param) => {
      console.log('onRegister:');
    },
  },
  extraReducers: {
    // authenticateUser
    [authenticateUser.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.data.token);
      state.jwtToken = localStorage.getItem('token');
      state.loading = "done";
      state.error = null;
    },
    [authenticateUser.pending]: (state) => {
      state.loading = "pending";
    },
    [authenticateUser.rejected]: (state, action) => {
      state.error = action.error;
    },
    // registerUser
    [registerUser.fulfilled]: (state, action) => {
      localStorage.setItem('token', action.payload.data.token);
      state.loading = "done";
      state.error = null;
    },
    [registerUser.pending]: (state) => {
      state.loading = "pending";
    },
    [registerUser.rejected]: (state, action) => {
      state.error = action.error;
    },
  },
});




const { actions, reducer } = authSlice;
export const { onLogin, onLogout, onRegister } = actions;

export default reducer;