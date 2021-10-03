const path = require("path");
const webpack = require("webpack");

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  entry: ["./plugin01"],
  mode: "development",
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "plugin01.js",
    library: '__HR_Plugin_Load__',
    libraryTarget: "jsonp"
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: path.join(__dirname, "../../"),
      name: "__Lib_vendors",
      manifest: path.join(__dirname, `../../../framework/dist/vendors.manifest.json`),
    }),
    ...Object.entries(require("../../../framework/scopes")).map(([name]) => {
      return new webpack.DllReferencePlugin({
        context: path.join(__dirname, "../../node_modules/@hr"),
        name: `__Lib_${name}`,
        manifest: path.join(
          __dirname,
          `../../../framework/dist/${name}.manifest.json`
        ),
      });
    }),
  ],
};
