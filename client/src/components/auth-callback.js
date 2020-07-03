import React from "react";
import { useHistory } from "react-router-dom";
import { useAuthentication } from "../providers/authentication-context";

export const AuthCallback = () => {
  const { signinRedirectCallback } = useAuthentication();
  const history = useHistory();
  console.log("callback route ");
  signinRedirectCallback((route) => history.push(route));
  return <span>loading</span>
};
