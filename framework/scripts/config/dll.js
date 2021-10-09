const paths = require("./paths");

module.exports = {
  pages: paths.resolvePackage("pages"),
  components: paths.resolvePackage("components"),
  core: paths.resolvePackage("core"),
};
