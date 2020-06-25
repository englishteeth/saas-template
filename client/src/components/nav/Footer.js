import React from "react";

import {
  Container, Row, Col
} from "reactstrap";

const Footer = (props) => {
  return (
    <>
    <footer className="footer">
    <Container>
      <Row className="row-grid align-items-center mb-5"></Row>
      <hr />
      <Row className="align-items-center justify-content-md-between">
        <Col md="6">
          <div className="copyright">
            © {new Date().getFullYear()}{" "}
            <a href={props.company.link} target="_blank" rel="noopener noreferrer" >{props.company.name}</a>
            .
          </div>
        </Col>
      </Row>
    </Container>
    </footer>
    </>
  );
}

Footer.defaultProps = {
  company: {
    name: "No Company",
    link: "#no-link"
  }
}

export default Footer;