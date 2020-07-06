import React from "react";

import { Container, Row, Col } from "reactstrap";

const Hero = (props) => {
  return (
    <>
      <section className="section section-lg pb-250">
        <Container>
          <Row>
            <Col lg="6">
              <h1 className="display-3">
                {props.headline}
                {(props.subline) &&
                  <span>{props.subline}</span>
                }
              </h1>
              <p className="lead">{props.lead}</p>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

Hero.defaultProps = {
  headline: "No Headline Text",
  lead: "No lead text."
}

export default Hero;