import React from "react";

import {
  Button,
} from "reactstrap";

import { useAuthentication } from "../../providers/authentication-context";

const Login = (props) => {
  const {isAuthenticated, signIn, signOut} = useAuthentication();
  return (
    <>
      {isAuthenticated()
        ? <Button onClick={signOut}>Logout</Button>
        : <Button onClick={signIn}>Login</Button>
      }
    </>
  );
}

export default Login;