import React from "react";

import { Container, Row, Col } from "reactstrap";

const ShapeHero = (props) => {
  return (
    <>
      <section className="section section-lg section-shaped pb-250">
        <div className="shape shape-style-1 shape-default">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Container>
          <Row>
            <Col lg="6">
              <h1>{props.headline}</h1>
              <p className="lead">{props.lead}</p>
            </Col>
          </Row>
        </Container>
        {/* SVG separator */}
        <div className="separator separator-bottom separator-skew">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="fill-white"
              points="2560 0 2560 100 0 100"
            />
          </svg>
        </div>
      </section>
    </>
  );
}

ShapeHero.defaultProps = {
  headline: "No Headline Text",
  lead: "No lead text."
}

export default ShapeHero;