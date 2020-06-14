const fs = require("fs");
const path = require("path");

const createBatScript = function(configs){
  const bat = configs.readTemplate("bat.template");
  configs.createFile("start_code.bat", bat);
}

module.exports = {
  createBatScript
}