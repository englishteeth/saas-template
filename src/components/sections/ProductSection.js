import React from "react";

import { 
  Container,
  Row,
  Col
} from "reactstrap";

import ProductCard from "./ProductCard"

const ProductSection = (props) => {
  const products = props.products.map( product => 
    <Col lg="4" key={product.heading}>
      <ProductCard product={product} />
    </Col>
  );
  return (
    <>
      <section className="section section-lg pt-lg-0 mt--200">
        <Container>
          <Row className="justify-content-center">
            <Col lg="12">
              <Row className="row-grid">
                {products}
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

ProductSection.defaultProps = {
  products: []
};

export default ProductSection;