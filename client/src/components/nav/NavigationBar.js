import React from "react";

import {
  NavbarBrand,
  Navbar,
  Button,
} from "reactstrap";

const NavigationBar = (props) => {
  return (
    <>
      <Navbar color="default" dark expand="lg">
        <NavbarBrand href="/">{props.brand}</NavbarBrand>
      </Navbar>
      <Button href="http://localhost:9000/login" tag="a">login</Button>

    </>
  );
}

NavigationBar.defaultProps = {
  brand: 'No Brand'
}

export default NavigationBar;