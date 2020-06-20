import React from "react";
import { shallow } from "enzyme";

import ShapeHero from "../../../components/sections/ShapeHero"

describe("Shape Hero Component Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ShapeHero headline="Hero Heading Text" lead="Hero Lead Text" />);
  });

  test("Shape Hero should render", () => {
    expect(wrapper).not.toBeEmptyRender();
  });

  test("Section should defined appropriately", () => {
    expect(wrapper).toContainExactlyOneMatchingElement('section');
    expect(wrapper.find('section')).toHaveClassName('section');
    expect(wrapper.find('section')).toHaveClassName('section-lg');
    expect(wrapper.find('section')).toHaveClassName('section-shaped');
    expect(wrapper.find('section')).toHaveClassName('pb-250');
  });

  test("Shape Hero should render shapes", () => {
    const shape = wrapper.find('.shape');
    expect(shape).toExist();
    expect(shape.children().length).toEqual(9);
  });

  test("Shape Hero should contain populated container", () => {
    expect(wrapper).toContainExactlyOneMatchingElement('Container');  
    const container = wrapper.find('Container');
    const headline = container.find("h1");
    expect(headline).toExist();
    expect(headline.text()).toEqual("Hero Heading Text");
    const lead = container.find("p");
    expect(lead).toExist();
    expect(lead).toHaveClassName('lead');
    expect(lead.text()).toEqual("Hero Lead Text");
  });

  test("Shape Hero should render section divide", () => {
    const separator = wrapper.find('.separator');
    expect(separator).toExist();
    expect(separator.html()).toEqual('<div class="separator separator-bottom separator-skew"><svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0"><polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon></svg></div>');
  });

});