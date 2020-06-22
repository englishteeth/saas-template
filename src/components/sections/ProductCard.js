import React from "react";

import { 
  Card, CardBody, Badge, Button
} from "reactstrap";

const ProductCard = (props) => {
  const tags = props.product.tags;
  const badges = (tags) ? tags.map( (tag) => <Badge key={tag} color={props.product.style} pill className="mr-1">{tag}</Badge> ) : null;
  return (
    <>
      <Card className="shadow border-0">
        <CardBody className="py-5">
          <div className={`icon icon-shape icon-shape-${props.product.style} rounded-circle mb-4`}>
            <i className={props.product.icon} />
          </div>
          <h6 className={`text-${props.product.style} text-uppercase`}>{props.product.heading}</h6>
          <p className="description mt-3">{props.product.description}</p>
          <div>{badges}</div>
          <Button href={props.product.href} className="mt-4" color={props.product.style} onClick={e => e.preventDefault()}>{props.product.action}</Button>
        </CardBody>
      </Card>
    </>
  );
}

ProductCard.defaultProps = 
{
  product: {
    style: "default",
    icon: "ni ni-atom",
    heading: "No product!",
    description: "No description.",
    href: "/#anywhere",
    action: "No Action"
  }
}

export default ProductCard;