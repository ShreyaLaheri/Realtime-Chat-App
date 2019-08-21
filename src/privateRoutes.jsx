import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import client from './client'

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to / page
    <Route {...rest} render={props => (
      client.isLoggedIn ?
        <Component {...props} />
        : <Redirect to={{
          pathname: "/",
          state: {from: props.location}
        }} />
    )} />
  );
};

export default PrivateRoute;