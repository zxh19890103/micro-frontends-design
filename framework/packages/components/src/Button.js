import React from "react";

export const Button = (props) => {
  return <button onClick={() => alert("hi")}>Click me {props.text}</button>;
};
