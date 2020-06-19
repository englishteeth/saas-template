import React from "react";
import { shallow } from "enzyme";
import NavBar from "../../../components/nav/NavBar";
import {
  NavbarBrand,
  Navbar,
} from "reactstrap";


describe("Navigation Bar Component Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavBar />);
  });

  test("Bootstrap Navbar should be rendered", () => {
    const nav = wrapper.find('Navbar');
    expect(nav).toExist();
    expect(nav).toHaveProp('color', 'default');
    expect(nav).toHaveProp('dark', true);
    expect(nav).toHaveProp('expand', 'lg');
    expect(nav).toHaveProp('tag', 'nav');
  });

  test("Bootstrap NavbarBrand should be present", () => {
    const nav = wrapper.find('NavbarBrand')
    expect(nav).toExist();
    expect(nav).toHaveProp('href', '/');
    expect(nav.contains('Default Color')).toEqual(true);
  });
});