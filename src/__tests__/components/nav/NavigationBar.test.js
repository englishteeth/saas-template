import React from "react";
import { shallow } from "enzyme";
import NavigationBar from "../../../components/nav/NavigationBar";

describe("Navigation Bar Component Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationBar brand='My Brand' />);
  });

  test("Navigation Bar should render", () => {
    expect(wrapper).not.toBeEmptyRender();
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
    expect(nav.contains('My Brand')).toEqual(true);
  });
});