"use strict";

const Path = require("path"),
      Fs = require("fs");


module.exports = function load(path, opts) {

  let result = {},
      file = null;

  opts || (opts = {})

  if (!Fs.existsSync(path)) {
    let error = new Error(`${path} is not a file`);
    return error;
  }

  const stats = Fs.lstatSync(path);
  if (stats.isDirectory()) {
    let error = new Error(`${path} is a directory`);
    return error;
  }

  try {

    file = Fs.readFileSync(path, {enconding: "UTF8"})
      .toString()
      .trim();

  } catch(error) {
    return error;
  }

  if (file === null || file === "") {
    let error = new Error(`${path} is an empty file`);
    return error;
  }

  // It is safe to assume we have a readable file contents at this point
  result = this.parse(file, opts);

  return result;
}
