const path = require('path');

module.exports = {
  pages: resolvePackages("./pages/src"),
  components: resolvePackages("./components/src"),
  portal: resolvePackages("./portal/src"),
};

function resolvePackages(module) {
  return path.join(__dirname, './packages', module)
}