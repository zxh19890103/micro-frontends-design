let age = null;

export const bootstrap = () => {
  age = 18;
  console.log("plugin01 was bootstrap");
};

export const render = ({ name, domElement }) => {
  domElement.textContent = `this is plugin: ${name}`;
};

export const destroy = () => {
  age = null;
  console.log("plugin01 was destoryed");
};

export const update = () => {};
