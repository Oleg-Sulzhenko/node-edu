import { combineReducers } from 'redux';
import auth from './components/auth/authSlice';
import profile from './components/dashboard/profile/profileSlice';
import alert from './components/layout/alert/alertSlice';

export default combineReducers({
  auth,
  profile,
  alert
});