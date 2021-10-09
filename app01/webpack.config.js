const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { getDLLManifests, syncDLLManifests } = require("./scripts/manifest");

const dllManifests = getDLLManifests();

/**
 * @type {webpack.Configuration}
 */
module.exports = {
  context: __dirname,
  entry: ["./src/index"],
  mode: "production",
  output: {
    publicPath: '/',
    path: path.join(__dirname, "./dist"),
    filename: "app01.js",
  },
  devServer: {
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
          transpileOnly: true,
        },
      },
    ],
  },
  stats: {
  },
  performance: {
  },
  optimization: {
    minimize: false
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "@hr/components": path.resolve("./node_modules/@hr/components/src"),
      "@hr/pages": path.resolve("./node_modules/@hr/pages/src"),
      "@hr/core": path.resolve("./node_modules/@hr/core/src"),
    }
  },
  plugins: [
    new HTMLWebpackPlugin({
      inject: false,
      template: path.join(__dirname, "./index.html"),
      minify: false,
      templateParameters: (_, assets) => {
        return {
          htmlWebpackPlugin: {
            js: [...dllManifests.map((x) => x.src), ...assets.js].map(
              (x) => `  <script src="${x}"></script>`
            ).join('\n'),
            css: assets.css,
          },
        };
      },
    }),
    ...dllManifests.map((item) => {
      return new webpack.DllReferencePlugin({
        context: path.join(__dirname, item.context),
        name: `__Lib_${item.name}`,
        manifest: item.manifest,
      });
    }),
  ],
};
