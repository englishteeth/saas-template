import React from "react";
import { shallow } from "enzyme";
import Profile from "../../pages/Profile";

describe("Landing Page Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Profile />);
  });

  test("render the page", () => {
    expect(wrapper).not.toBeEmptyRender();
  });

});