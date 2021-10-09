const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");

const schema = {
  type: "object",
  properties: {
    name: {
      type: "string",
    },
  },
};

function loader(content, map, meta) {
  const callback = this.async();
  const options = getOptions(this);
  validate(schema, options, {
    name: "Exports Constants Loader",
    baseDataPath: "options",
  });
  callback(null, content + `\n export const name="${options.name}";`);
}

module.exports = loader;
