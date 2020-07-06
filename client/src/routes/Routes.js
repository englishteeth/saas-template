import React from "react";
import { Route, Switch } from "react-router-dom";

import { AuthCallback } from "../components/auth/auth-callback.js";
import { PrivateRoute } from "../components/auth/private-route";
import Landing from "../pages/landing";
import Profile from "../pages/profile";

export const Routes = (
  <Switch>
    <Route path="/" exact render={props => <Landing {...props} />} />
    <Route path="/auth-callback" exact component={AuthCallback} />
    <PrivateRoute path="/profile" exact component={Profile} />
  </Switch>
);
