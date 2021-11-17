import axios from "axios";
import store from '../store';
import { onLoginRegister } from '../components/auth/authSlice';
import { v4 as uuidv4 } from 'uuid';
import { addAlert, removeAlert } from "../components/layout/alert/alertSlice";

export const setAlert = ({ msg, alertType }, timeout = 5000) => {
  const id = uuidv4();

  store.dispatch(addAlert({ msg, alertType, id }));

  setTimeout(() => store.dispatch(removeAlert({id: id})), timeout);
};

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
    store.dispatch(onLoginRegister(response));
  } catch (err) {
    console.log('getUser err :>> ', err);
  }
}

export default setAuthToken;