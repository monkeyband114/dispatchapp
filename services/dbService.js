const fs = require("fs");
const path = "./db.json";

function readData() {
  return JSON.parse(fs.readFileSync(path, "utf-8"));
}

function writeData(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };
