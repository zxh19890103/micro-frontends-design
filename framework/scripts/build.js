const path = require('path')
const webpack = require("webpack");

// const config = require("./config/webpack.config")();
// const compiler = webpack(config);
// const ora = require('ora')
const yargs = require("yargs/yargs");
const argv = yargs(process.argv).argv;
const packages = argv._.slice(2);

const build = (pkg) => {
  const entry = require.resolve(`../packages/${pkg}`);
  console.log(entry);
};

const main = async () => {
  for (const pkg of packages) {
    await build(pkg);
  }
};

main()

// compiler.run((err, stats) => {
//   if (err) throw err;
//   const info = stats.toJson();
//   if (stats.hasErrors()) {
//     console.error(info.errors);
//     return;
//   }
//   console.log(stats.toString({ colors: true }));
//   compiler.close((err) => {
//     console.log("closed");
//   });
// });
