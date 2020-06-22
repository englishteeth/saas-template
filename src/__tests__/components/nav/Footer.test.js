import React from "react";
import { shallow } from "enzyme";
import Footer from "../../../components/nav/Footer";

describe("Footer Component Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  test("Footer should render", () => {
    expect(wrapper).not.toBeEmptyRender();
  });

});