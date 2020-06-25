import React from "react";
import { Route } from "react-router-dom";

export const PrivateRoute = ({ component, ...rest }) => {
  const renderFn = Component => props => (
    <>
    {() => {
      if (!Component) {
        return <Component {...props} />;
      } else {
        return <span>loading</span>;
      }
    }}
    </>
  );

  return <Route {...rest} render={renderFn(component)} />;
};

export const withOidcSecure = WrappedComponent => props => (
  <>
    <WrappedComponent {...props} />
    <h3>Secured</h3>
  </>
);
