import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { loginUser } from './authApiActions';

export const Login = () => {

  const dispatch = useDispatch();
  const { auth } = useSelector(state=>state);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData; 

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(formData));
  }

  return (
    <>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign to Your Account {auth.isLogged && 'ALEG'}</p>
      <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address" 
            name="email" 
            value={email}
            onChange={e => onChange(e)}
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </>
  )
}

export default Login;
