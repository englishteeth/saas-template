import React from "react";
import { shallow } from "enzyme";

import ProductSection from "../../../components/sections/ProductSection"

describe("Product Section Component Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProductSection />);
  });

  test("Hero Section should render", () => {
    expect(wrapper).not.toBeEmptyRender();
  });

});