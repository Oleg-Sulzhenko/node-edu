import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  alerts: []
}

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    addAlert: (state, action) => {
      const { msg, alertType, id } = action.payload;
      state.alerts.push({ msg, alertType, id });
    },
    removeAlert: (state, action) => {
      const { id } = action.payload;
      state.alerts = state.alerts.filter((alert) => alert.id !== id);
    }
  }
});

export const { addAlert, removeAlert } = alertSlice.actions
export default alertSlice.reducer