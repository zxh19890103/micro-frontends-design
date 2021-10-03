import { Button } from "@hr/components/Button";

let age = null;

export const bootstrap = () => {
  age = 18;
  console.log("plugin01 was bootstrap");
};

export const render = () => {
  return (
    <p>
      <h1>my age is {age}</h1>
      <Button />
    </p>
  );
};

export const destroy = () => {
  age = null;
  console.log("plugin01 was destoryed");
};

export const name = 'plugin01'