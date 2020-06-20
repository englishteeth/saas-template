import React from "react";

import {
  NavbarBrand,
  Navbar,
} from "reactstrap";

const NavigationBar = (props) => {
  return (
    <>
      <Navbar color="default" dark expand="lg">
        <NavbarBrand href="/">{props.brand}</NavbarBrand>
      </Navbar>
    </>
  );
}

NavigationBar.defaultProps = {
  brand: 'No Brand'
}

export default NavigationBar;