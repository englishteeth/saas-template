import React from "react";
import { Route } from "react-router-dom";
import { useAuthentication } from "../providers/authentication-context";

export const PrivateRoute = ({ component, ...rest }) => {
  
  const {signinRedirect, isAuthenticated} = useAuthentication();
  const renderFn = (Component) => (props) => {
    if (!!Component && isAuthenticated()) return <Component {...props} />;
    signinRedirect();
    return <span>loading</span>
  };

  return <Route {...rest} render={renderFn(component)} />;
};
