import React from "react";

import {
  NavbarBrand,
  Navbar,
  Button,
} from "reactstrap";

import Authentication from "../../services/authentication";

const auth = new Authentication();

const NavigationBar = (props) => {
  return (
    <>
      <Navbar color="default" dark expand="lg">
        <NavbarBrand href="/">{props.brand}</NavbarBrand>
      </Navbar>
      <Button onClick={auth.login}>Login</Button>
      <Button onClick={auth.logout}>Logout</Button>
    </>
  );
}

NavigationBar.defaultProps = {
  brand: 'No Brand'
}

export default NavigationBar;