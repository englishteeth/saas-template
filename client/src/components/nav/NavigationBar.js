import React from "react";

import {
  NavbarBrand,
  Navbar,
  Button,
} from "reactstrap";

import { useAuthentication } from "../../providers/authentication-context";

const NavigationBar = (props) => {
  const {signinRedirect, logout} = useAuthentication();
  return (
    <>
      <Navbar color="default" dark expand="lg">
        <NavbarBrand href="/">{props.brand}</NavbarBrand>
      </Navbar>
      <Button onClick={signinRedirect}>Login</Button>
      <Button onClick={logout}>Logout</Button>
    </>
  );
}

NavigationBar.defaultProps = {
  brand: 'No Brand'
}

export default NavigationBar;