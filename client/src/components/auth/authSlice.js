import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './authApiActions';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    jwtToken: null, 
    isLogged: false,
    loading: false,
    error: null,
  },
  reducers: {
    login: (state, param) => {
      const { payload } = param;
      console.log('Auth login:', payload);
    }, 
    register: (state, param) => {
      const { payload } = param;
      console.log('Auth register:', payload);
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, action) => {
      console.log('fulfilled ', action);
      state.jwtToken = action.payload.data.token;
      state.isLogged = true;
      state.loading = "done";
      state.error = null;
    },
    [loginUser.pending]: (state) => {
      state.loading = "pending";
    },
    [loginUser.rejected]: (state, action) => {
      console.log(`${action.meta.response.status} - ${action.meta.response.statusText}`);
      state.error = action.error;
    },
  },
});




const { actions, reducer } = authSlice
export const { login, register } = actions;

export default reducer;