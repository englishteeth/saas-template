import React from "react";
import { Route, Switch } from "react-router-dom";

import { AuthCallback } from "../components/auth-callback.js";
import { PrivateRoute } from "../components/PrivateRoute";
import Landing from "../pages/Landing";
import Profile from "../pages/Profile";

export const Routes = (
  <Switch>
    <Route path="/" exact render={props => <Landing {...props} />} />
    <Route path="/auth-callback" exact component={AuthCallback} />
    <PrivateRoute path="/profile" exact component={Profile} />
  </Switch>
);
