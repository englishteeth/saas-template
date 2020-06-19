import React from "react";
import { Link } from "react-router-dom";

import {
  NavbarBrand,
  Navbar,
} from "reactstrap";

const NavBar = (props) => {
  return (
    <>
      <Navbar color="default" dark expand="lg">
        <NavbarBrand href="/">Default Color</NavbarBrand>
      </Navbar>
    </>
  );
}

export default NavBar;