import React from "react";

import {
  NavbarBrand,
  Navbar,
} from "reactstrap";

const NavigationBar = (props) => {
  return (
    <>
      <Navbar color="default" dark expand="lg">
        <NavbarBrand href="/">Default Color</NavbarBrand>
      </Navbar>
    </>
  );
}

export default NavigationBar;