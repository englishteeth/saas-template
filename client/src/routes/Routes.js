import React from "react";
import { Route, Switch } from "react-router-dom";

import { PrivateRoute } from "../components/PrivateRoute";
import Landing from "../pages/Landing";
import Profile from "../pages/Profile";

export const Routes = (
  <Switch>
    <PrivateRoute path="/profile" exact component={Profile} />
    <Route path="/" exact render={props => <Landing {...props} />} />
  </Switch>
);
