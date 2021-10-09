let style = { color: "red" };

export const bootstrap = () => {};
export const render = ({ name }) => {
  return <h2 style={style}>Err while Loading {name}</h2>;
};
export const destroy = () => {};

export const type = "react-component";
