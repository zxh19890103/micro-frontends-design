const path = require("path");
const webpack = require("webpack");

const plugins = ["plugin01", "plugin02", "plugin03"];

/**
 * @type {webpack.Configuration[]}
 */
module.exports = plugins.map((x) => {
  const pkg = require(path.join(__dirname, x, "./package.json"));
  return {
    entry: path.join(__dirname, x),
    mode: "production",
    output: {
      path: path.join(__dirname, "./dist"),
      filename: `${pkg.name}.js`,
      library: "__HR_Plugin_Load__",
      libraryTarget: "jsonp",
    },
    module: {
      rules: [
        {
          test: /jsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
        {
          test: require.resolve(__dirname + "/" + x),
          use: [
            {
              loader: path.resolve(__dirname, "../framework/exports-loader"),
              options: {
                name: pkg.name,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        name: "__Lib_vendors",
        manifest: path.join(
          __dirname,
          `../framework/dist/vendors.manifest.json`
        ),
      }),
      ...Object.entries(require("../framework/scopes")).map(([name]) => {
        return new webpack.DllReferencePlugin({
          context: path.join(__dirname, "./node_modules/@hr"),
          name: `__Lib_${name}`,
          manifest: path.join(
            __dirname,
            `../framework/dist/${name}.manifest.json`
          ),
        });
      }),
    ],
  };
});
