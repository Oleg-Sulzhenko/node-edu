import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {

  const { auth: { isAuthenticated, loading } } = useSelector(state=>state);

  return (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <Spinner />
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  )
};

export default PrivateRoute;