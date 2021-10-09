import { Button } from "@hr/components/Button";
let age = null;

export const bootstrap = () => {
  age = 18;
  console.log("plugin02 was bootstrap");
};

export const render = ({ name }) => {
  return <Button />;
};

export const destroy = () => {
  age = null;
  console.log("plugin02 was destoryed");
};
