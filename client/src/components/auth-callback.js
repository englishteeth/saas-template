import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../providers/authentication-context";

export const AuthCallback = () => {
  const { authenticationCallback } = useAuthentication();
  const history = useHistory();
  authenticationCallback((route) => history.push(route));
  return <span>loading</span>
};
