const path = require("path");
const webpack = require("webpack");
const DllPlugin = require("../plugins/DllPlugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

const scopes = require("./dll");
const paths = require("./paths");
const DLL_CONTEXT = paths.resolvePackage("./");
// const tsConfig = require("../../tsconfig.json");

/**
 * @returns {webpack.Configuration}
 */
module.exports = () => {
  return {
    mode: "production",
    entry: scopes,
    output: {
      publicPath: "http://0.0.0.0:8080/dll/company/",
      path: paths.buildPath,
      filename: "[name].[chunkhash:7].dll.js",
      library: "__Lib_[name]",
      libraryTarget: "var",
    },
    devtool: "source-map",
    resolve: {
      alias: {
        components: paths.resolvePackage("components/src"),
        pages: paths.resolvePackage("pages/src"),
        core: paths.resolvePackage("core/src"),
      },
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new WebpackManifestPlugin({
        useEntryKeys: true,
        filter: (file) => {
          return file.isInitial;
        },
        fileName: "index.json",
      }),
      ...Object.keys(
        require(path.join(paths.vendorsBuildPath, "index.json"))
      ).map((k) => {
        return new webpack.DllReferencePlugin({
          context: path.join(__dirname, "../../"),
          name: `__Lib_${k}`,
          manifest: path.join(paths.vendorsBuildPath, `./${k}.manifest.json`),
        });
      }),
      new DllPlugin({
        name: "__Lib_[name]",
        context: DLL_CONTEXT,
        path: path.join(paths.buildPath, `./[name].manifest.json`),
        entryOnly: true,
        // /**
        //  * @param {string} ent
        //  * @returns
        //  */
        // entryName: (ent) => {
        //   if (ent.includes("node_modules")) {
        //     return ent; // ent.replace("../", "./");
        //   } else {
        //     return ent.replace("src/", "");
        //   }
        // },
        format: true,
      }),
    ],
  };
};
