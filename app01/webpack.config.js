const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
/**
 * @type {webpack.Configuration}
 */
module.exports = {
  context: __dirname,
  entry: ["./index"],
  mode: "development",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "app01.js",
  },
  devServer: {
    static: [path.join(__dirname, "../framework/dist"), "./plugins"],
    compress: false,
    port: 9000,
    allowedHosts: "all",
    historyApiFallback: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          transpileOnly: true
        }
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: "body",
      template: path.join(__dirname, "./index.html"),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      name: "__Lib_vendors",
      manifest: path.join(__dirname, `../framework/dist/vendors.manifest.json`),
    }),
    ...Object.entries(require("../framework/scopes")).map(([name]) => {
      return new webpack.DllReferencePlugin({
        context: __dirname + "/node_modules/@hr",
        name: `__Lib_${name}`,
        manifest: path.join(
          __dirname,
          `../framework/dist/${name}.manifest.json`
        ),
      });
    }),
  ],
};
