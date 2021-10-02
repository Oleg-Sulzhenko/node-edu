import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { onLogout } from '../auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';

export const Navbar = () => {
  const dispatch = useDispatch();
  const { auth: { isAuthenticated } } = useSelector(state=>state);

  const logout =() => {
    dispatch(onLogout());
  }

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
      </h1>
      <ul>
        <li><Link to="profiles">Developers</Link></li>
        {!isAuthenticated ? <>
          <li><Link to="register">Register</Link></li>
          <li><Link to="login">Login</Link></li>
        </> : 
        <li>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          <a href="#!" onClick={logout}>Logout</a>
          </li>}
      </ul>
    </nav>
  )
}

export default Navbar;