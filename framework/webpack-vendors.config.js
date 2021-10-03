const path = require("path");
const webpack = require("webpack");

const vendors = ["react", "react-dom", "react/jsx-runtime"];

/**
 *
 * @returns {webpack.Configuration}
 */
module.exports = () => {
  return {
    mode: "production",
    entry: vendors,
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "vendors.dll.js",
      library: "__Lib_vendors",
      libraryTarget: "var",
    },
    plugins: [
      new webpack.DllPlugin({
        name: "__Lib_vendors",
        context: __dirname,
        path: path.join(__dirname, `./dist/vendors.manifest.json`),
        entryOnly: false,
        format: true,
      }),
    ],
  };
};
