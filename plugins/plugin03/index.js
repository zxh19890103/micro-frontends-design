let age = null;

export const bootstrap = () => {
  age = 18;
  console.log("plugin02 was bootstrap");
};

export const render = ({ name, domElement }) => {
  domElement.textContent = `this is plugin: ${name}`
};

export const destroy = () => {
  age = null;
  console.log("plugin02 was destoryed");
};
