import React from "react";

import NavigationBar from "../components/nav/NavigationBar"
import ShapeHero from "../components/sections/ShapeHero"
import ProductSection from "../components/sections/ProductSection"
import Footer from "../components/nav/Footer"

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