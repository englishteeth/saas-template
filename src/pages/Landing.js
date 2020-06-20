import React from "react";

import NavigationBar from "../components/nav/NavigationBar"
import ShapeHero from "../components/sections/ShapeHero"
import ProductSection from "../components/sections/ProductSection"

function Landing() {
  return (
    <>
      <NavigationBar />
      <ShapeHero />
      <ProductSection />
      <main>I am Landing!</main>
    </>
  );
}

export default Landing;