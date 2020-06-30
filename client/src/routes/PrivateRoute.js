import React from "react";
import { Route } from "react-router-dom";
import { AuthenticationConsumer } from "../providers/authentication";

export const PrivateRoute = ({ component, ...rest }) => {
  const renderFn = (Component) => (props) => (
      <AuthenticationConsumer>
          {({ isAuthenticated, login }) => {
              if (!!Component && isAuthenticated()) {
                return <Component {...props} />;
              } else {
                  login();
                  return <span>loading</span>;
              }
          }}
      </AuthenticationConsumer>
  );

  return <Route {...rest} render={renderFn(component)} />;
};
