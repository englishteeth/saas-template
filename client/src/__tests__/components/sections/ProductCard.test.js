import React from "react";
import { shallow } from "enzyme";

import ProductCard from "../../../components/sections/ProductCard"

describe("Product Card Component Testing", () => {

  const product = {
    icon: "ni ni-istanbul",
    heading: "This is the product!",
    description: "The product description goes here.",
    tags: ["This","That","The Other"],
    href: "/#anywhere",
    action: "Do It!"
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ProductCard product={product} />);
  });

  test("Product Card should render", () => {
    expect(wrapper).not.toBeEmptyRender();
    expect(wrapper).toContainExactlyOneMatchingElement('Card');  
  });

  test("Should render a product card body", () => {
    const card = wrapper.find('CardBody');
    expect(card).toExist();
  });

  test("Product card icon should be present", () => {
    const icon = wrapper.find('CardBody').find('.icon');
    expect(icon).toExist();
    expect(icon.find('i')).toHaveClassName(product.icon);
  });

  test("Product heading should be present", () => {
    const heading = wrapper.find('CardBody').find('h6');
    expect(heading).toExist();
    expect(heading.text()).toEqual(product.heading);
  });

  test("Product description should be present", () => {
    const desc = wrapper.find('CardBody').find('.description');
    expect(desc).toExist();
    expect(desc.text()).toEqual(product.description);
  });

  test("Should render tags should if present", () => {
    const card = wrapper.find('CardBody');
    expect(card).toContainMatchingElements(product.tags.length, 'Badge');
    wrapper.find('Badge').forEach((node) => {
      expect(product.tags.includes(node.childAt(0).text())).toEqual(true);
    });
  });

  test("Should handle no tags present", () => {
    const noTagsProduct = {
      icon: "ni ni-istanbul",
      heading: "This is the product!",
      description: "The product description goes here."
    };
    wrapper = shallow(<ProductCard product={noTagsProduct} />);
    const card = wrapper.find('CardBody');
    expect(card).toContainMatchingElements(0, 'Badge');
  });


  test("Should render product action", () => {
    const button = wrapper.find('CardBody').find('Button');
    expect(button).toExist();
    expect(button).toHaveProp('href', product.href);
    expect(button.contains(product.action)).toEqual(true);
  });

  test("should be able to specify the card style", () => {
    wrapper = shallow(<ProductCard />);
    expect(wrapper.find('CardBody').find('.icon')).toHaveClassName("icon-shape-default");
    expect(wrapper.find('CardBody').find('h6')).toHaveClassName("text-default");
    expect(wrapper.find('CardBody').find('Button')).toHaveProp('color', 'default');
    const primaryProduct = {style:"primary", tags: ["A", "B"]};
    wrapper.find('Badge').forEach((node) => {
      expect(node).toHaveProp('color', 'default');
    });
    wrapper = shallow(<ProductCard product={primaryProduct} />);
    expect(wrapper.find('CardBody').find('.icon')).toHaveClassName("icon-shape-primary");
    expect(wrapper.find('CardBody').find('h6')).toHaveClassName("text-primary");
    expect(wrapper.find('CardBody').find('Button')).toHaveProp('color', 'primary');
    wrapper.find('Badge').forEach((node) => {
      expect(node).toHaveProp('color', 'primary');
    });
    const successProduct = {style:"success", tags: ["A", "B"]};
    wrapper = shallow(<ProductCard product={successProduct} />);
    expect(wrapper.find('CardBody').find('.icon')).toHaveClassName("icon-shape-success");
    expect(wrapper.find('CardBody').find('h6')).toHaveClassName("text-success");
    expect(wrapper.find('CardBody').find('Button')).toHaveProp('color', 'success');
    wrapper.find('Badge').forEach((node) => {
      expect(node).toHaveProp('color', 'success');
    });
  });


});