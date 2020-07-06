import React from "react";

import {
  NavbarBrand,
  Navbar
} from "reactstrap";

import Login from "../auth/login";

const NavigationBar = (props) => {
  return (
    <>
      <Navbar color="default" expand="lg">
        <NavbarBrand href="/">{props.brand}</NavbarBrand>
        <Login />
      </Navbar>
    </>
  );
}

NavigationBar.defaultProps = {
  brand: 'No Brand'
}

export default NavigationBar;