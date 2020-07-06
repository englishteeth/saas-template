import React from "react";
import { Route } from "react-router-dom";
import { useAuthentication } from "../providers/authentication-context";

export const PrivateRoute = ({ component, ...rest }) => {
  
  const {isAuthenticated, signIn} = useAuthentication();
  const renderFn = (Component) => (props) => {
    if (!!Component && isAuthenticated()) return <Component {...props} />;
    signIn();
    return <span>loading</span>
  };

  return <Route {...rest} render={renderFn(component)} />;
};
