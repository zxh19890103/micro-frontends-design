const path = require("path");
const fs = require("fs");
const http = require("http");

const PUBLIC_PATH = "http://0.0.0.0:8080/dll";
const SAVE_TO = path.join(__dirname, "manifests");

if (!fs.existsSync(SAVE_TO)) {
  fs.mkdirSync(SAVE_TO);
}

const main = async () => {
  if (!(await isOutdated())) {
    console.log("manifests is the latest");
    return;
  }
  await downloadIndex();
  downloadDLLManifests();
};

const downloadIndex = async () => {
  const d = await getJson("/vendors/index.json");
  for (const k in d) {
    d[k] = {
      context: "./",
      src: d[k],
      manifest: `/vendors/${k}.manifest.json`,
    };
  }
  const d2 = await getJson("/company/index.json");
  for (const k in d2) {
    d2[k] = {
      context: "./node_modules/@hr",
      src: d2[k],
      manifest: `/company/${k}.manifest.json`,
    };
  }
  fs.writeFileSync(
    path.join(SAVE_TO, "./index.json"),
    JSON.stringify({ ...d, ...d2 }, 2)
  );
};

const downloadDLLManifests = () => {
  const index = require(path.join(SAVE_TO, "./index.json"));
  for (const [name, data] of Object.entries(index)) {
    http.get(`${PUBLIC_PATH}${data.manifest}`, (res) => {
      res.pipe(
        fs.createWriteStream(path.join(SAVE_TO, `./${name}.dll.json`), {
          encoding: "utf-8",
        })
      );
    });
  }
};

const getJson = (url) => {
  return new Promise((r) => {
    console.log('getJson', PUBLIC_PATH + url)
    http.get(PUBLIC_PATH + url, (res) => {
      res.on("data", (chunk) => {
        r(JSON.parse(chunk))
      });
    });
  });
};

const isOutdated = () => {
  return new Promise((r) => {
    const indexFile = path.join(SAVE_TO, "./index.json");
    if (!fs.existsSync(indexFile)) {
      r(true);
      return;
    }
    const req = http.request(
      `${PUBLIC_PATH}/company/index.json`,
      {
        method: "HEAD",
      },
      (res) => {
        const local = fs.statSync(indexFile);
        r(new Date(res.headers["last-modified"]).getTime() > local.ctimeMs);
      }
    );
    req.end();
  });
};

module.exports = {
  syncDLLManifests: main,
  getDLLManifests: () => {
    const index = require(path.join(SAVE_TO, "./index.json"));
    return Object.entries(index).map(([name, data]) => {
      return {
        name,
        ...data,
        manifest: path.join(SAVE_TO, name + ".dll.json"),
      };
    });
  },
};

if (require.main == module) {
  main();
}
