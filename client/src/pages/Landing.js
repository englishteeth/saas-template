import React from "react";

import NavigationBar from "../components/nav/navigation-bar"
import ShapeHero from "../components/sections/shape-hero"
import ProductSection from "../components/sections/product-section"
import Footer from "../components/nav/footer"

const products = [
  {
    style: "primary",
    icon: "ni ni-istanbul",
    heading: "This is product 1",
    description: "The product description goes here.",
    tags: ["This","That","The Other"],
    href: "/#anywhere",
    action: "Do It!"
  },
  {
    style: "warning",
    icon: "ni ni-istanbul",
    heading: "This is product 2",
    description: "The product description goes here.",
    tags: ["This","That","The Other"],
    href: "/#anywhere",
    action: "Do It!"
  },
  {
    style: "success",
    icon: "ni ni-istanbul",
    heading: "This is product 3",
    description: "The product description goes here.",
    tags: ["This","That","The Other"],
    href: "/#anywhere",
    action: "Do It!"
  }
]

function Landing() {
  return (
    <>
      <NavigationBar />
      <ShapeHero />
      <ProductSection products={products} />
      <Footer />
    </>
  );
}

export default Landing;