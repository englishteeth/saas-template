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
    const footer = wrapper.find('footer');
    expect(footer).toExist();
  });

  test("Include copyright in footer", () => {
    const company={name: 'test corp', link: 'https://www.test-corp.com?ref=saas-template'}
    wrapper = shallow(<Footer company={company} />);
    const copyright = wrapper.find('.copyright');
    expect(copyright).toExist();
    expect(copyright).toIncludeText("©");
    expect(copyright).toIncludeText(new Date().getFullYear());
    expect(copyright.find('a')).toHaveProp("href", company.link);
    expect(copyright.find('a')).toHaveText(company.name);
  });

});