const path = require("path");

const PROJECT_DIR = path.join(__dirname, "../../");
const PACKAGES_DIR = path.join(PROJECT_DIR, './packages');
const BUILD_DIR_NAME = '.npm-publish';

const resolveProject = (...pathSegments) => {
  return path.resolve(PROJECT_DIR, ...pathSegments);
};

const getPackageBuildPath = (name) => {
  return path.join(PACKAGES_DIR, name, BUILD_DIR_NAME)
}

module.exports = {
  BUILD_DIR_NAME,
  PROJECT_DIR,
  PACKAGES_DIR,
  resolveProject,
  getPackageBuildPath
};
