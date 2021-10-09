const paths = require("./paths");
const tsConfig = require("../../tsconfig.json");

if (!tsConfig.compilerOptions.paths) {
  module.exports = {};
} else {
  module.exports = Object.entries(tsConfig.compilerOptions.paths).reduce(
    (map, item) => {
      const [name, value] = item.map((x) => x.replace(/\/\*$/, ""));
      return {
        ...map,
        [name]: paths.resolveProject(value),
      };
    },
    {}
  );
}
