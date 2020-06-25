import React from 'react';

const Greeting = (props) => {
  const message = (props.name) ? `Hi, ${props.name}!` : "You're not logged in.";
  return (
    <span>{message}</span>
  );
}

export default Greeting;