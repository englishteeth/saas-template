import React from "react";
import { Route, Switch } from "react-router-dom";

import Landing from "../pages/Landing";
import Profile from "../pages/Profile";
import { withOidcSecure } from "./PrivateRoute";


const ProtectedProfile = withOidcSecure(Profile);

export const Routes = (
  <Switch>
    <Route path="/profile" exact component={ProtectedProfile} />
    <Route path="/" exact render={props => <Landing {...props} />} />
  </Switch>
);
