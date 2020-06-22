import React from "react";
import { shallow } from "enzyme";
import Landing from "../../pages/Landing";

import NavigationBar from "../../components/nav/NavigationBar"
import ShapeHero from "../../components/sections/ShapeHero"
import ProductSection from "../../components/sections/ProductSection"
import Footer from "../../components/nav/Footer"

describe("Landing Page Testing", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Landing />);
  });

  test("render the page", () => {
    expect(wrapper).not.toBeEmptyRender();
  });

  test("Navigation Bar should be present", () => {
    expect(wrapper.find(NavigationBar)).toExist();
  });

  test("Hero Section should be present", () => {
    expect(wrapper.find(ShapeHero)).toExist();
  });

  test("Product Section should be present", () => {
    expect(wrapper.find(ProductSection)).toExist();
  });

  test("Footer should be present", () => {
    expect(wrapper.find(Footer)).toExist();
  });

});