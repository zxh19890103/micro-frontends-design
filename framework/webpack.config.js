const path = require("path");
const webpack = require("webpack");
const DllPlugin = require("./DllPlugin");

const scopes = require("./scopes");
const DLL_CONTEXT = __dirname + "/packages";
const scopeKeys = Object.keys(scopes)
  .map((k) => `${k}/src`)
  .join(",");

/**
 *
 * @returns {webpack.Configuration}
 */
module.exports = () => {
  return {
    mode: "production",
    entry: scopes,
    output: {
      path: path.join(__dirname, "./dist"),
      filename: "[name].dll.js",
      library: "__Lib_[name]",
      libraryTarget: "var",
    },
    resolve: {
      alias: {
        components: path.resolve( __dirname, "./packages/components/src"),
        pages: path.resolve( __dirname, "./packages/pages/src")
      }
    },
    module: {
      rules: [
        {
          test: /.jsx?$/,
          loader: "ts-loader",
        },
      ],
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        name: "__Lib_vendors",
        manifest: path.join(__dirname, `./dist/vendors.manifest.json`),
      }),
      new DllPlugin({
        name: "__Lib_[name]",
        context: DLL_CONTEXT,
        path: path.join(__dirname, `./dist/[name].manifest.json`),
        entryOnly: false,
        /**
         *
         * @param {string} ent
         * @returns
         */
        entryName: (ent) => {
          if (ent.includes("node_modules")) {
            return ent; // ent.replace("../", "./");
          } else {
            return ent.replace("src/", "");
          }
        },
        format: true,
      }),
    ],
  };
};
