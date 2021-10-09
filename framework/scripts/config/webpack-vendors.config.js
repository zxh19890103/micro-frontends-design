const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const paths = require("./paths");

/**
 * @returns {webpack.Configuration}
 */
module.exports = (env) => {
  return {
    mode: "production",
    entry: require('./vendors'),
    output: {
      publicPath: "http://0.0.0.0:8080/dll/vendors/",
      path: paths.vendorsBuildPath,
      filename: "[name].[chunkhash:7].dll.js",
      library: "__Lib_[name]",
      libraryTarget: "var",
    },
    optimization: {
      chunkIds: "natural",
      removeEmptyChunks: true,
      splitChunks: {
        // cacheGroups: {
        //   default: false,
        //   defaultVendors: false,
        //   react: {
        //     test: /react/,
        //     priority: 10,
        //   }
        // },
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new WebpackManifestPlugin({
        filter: (file) => {
          return file.isChunk && file.isInitial;
        },
        generate: (seed, files, entries) => {
          return Object.fromEntries(
            files.map((f) => {
              const name = f.chunk.name || f.chunk.id;
              return [name, f.path];
            })
          );
        },
        fileName: "index.json",
      }),
      new webpack.DllPlugin({
        name: "__Lib_[name]",
        context: path.join(__dirname, "../../"),
        path: path.join(paths.vendorsBuildPath, `./[name].manifest.json`),
        entryOnly: true,
        format: true,
      }),
    ],
  };
};
