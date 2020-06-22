import React from "react";
import { shallow } from "enzyme";

import ProductSection from "../../../components/sections/ProductSection"

describe("Product Section Component Testing", () => {

  const products = [{heading: "This is the product!"}];
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProductSection products={products} />);
  });

  test("Product Section should render", () => {
    expect(wrapper).not.toBeEmptyRender();
  });

  test("Section should defined appropriately", () => {
    expect(wrapper).toContainExactlyOneMatchingElement('section');
    expect(wrapper.find('section')).toHaveClassName('section');
    expect(wrapper.find('section')).toHaveClassName('section-lg');
    expect(wrapper.find('section')).toHaveClassName('pt-lg-0');
    expect(wrapper.find('section')).toHaveClassName('mt--200');
  });

  test("Should render a product card", () => {
    expect(wrapper).toContainMatchingElements(products.length, 'ProductCard');
  });


});