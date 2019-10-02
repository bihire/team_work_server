import fs from "fs"
import path from "path"
import express from "express"
import morgan from "morgan"
import bodyparser from "body-parser"
import cors from "cors"
import config from "./config/config"

const app = express();

app.use(morgan("combined"));
app.use(bodyparser.json());
app.use(cors());

app.use((req, res, next) => {
  let version = req.url.match(/\/api\/(v[0-9]+).*/) || [];
  const { readdirSync } = require("fs");

  const dirPath = path.join(__dirname, "./api");
  const getDirectories = srcPath =>
    fs
      .readdirSync(srcPath)
      .filter(file => fs.statSync(path.join(srcPath, file)).isDirectory());

  const lastDir = getDirectories(dirPath)[getDirectories(dirPath).length - 1];
  const callBackPath = path.join(__dirname, `./api/${lastDir}/index.js`);
  version = version[1] || "";
  if (version != "") {
    const appPath = path.join(__dirname, `./api/${version}/index.js`);
    if (!fs.existsSync(appPath)) {
      return res.status(404).send({
        message: "It's not us, sorry we can't find this end point"
      });
    }
    require(appPath)
  } else {
    require("./index")
  }
  next();
});

app.listen(config.port);
console.log(`Server started on port ${config.port}`);

export default app;
