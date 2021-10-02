import axios from "axios";
import store from '../store';
import { onLogin } from '../components/auth/authSlice';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
}

export const getUser = async () => {
  try {
    setAuthToken(localStorage.getItem('token'));

    const response = await axios.get("/api/auth");
    store.dispatch(onLogin(response));
  } catch (err) {
    console.log('getUser err :>> ', err);
  }
}

export default setAuthToken;