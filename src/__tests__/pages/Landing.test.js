import React from "react";
import { shallow } from "enzyme";
import Landing from "../../pages/Landing";

import NavigationBar from "../../components/nav/NavigationBar"

describe("Landing Page Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  });

  test("render the page", () => {
    expect(wrapper.find("main").text()).toContain("I am Landing!");
  });

  test("Navigation Bar should be present", () => {
    expect(wrapper.find(NavigationBar)).toExist();
  });

});