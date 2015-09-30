"use strict";

const Path = require("path"),
      Fs = require("fs");


class HCL {

  constructor() {

  }

}

// converts an object into an HCL string
HCL.prototype.stringify = require("./lib/stringify");

// parses an HCL string into an object
HCL.prototype.parse = require("./lib/parse");

// parses an HCL file into an object
HCL.prototype.load = require("./lib/load");

// requires an HCL file and returns the result object
HCL.prototype.require = require("./lib/require");


module.exports = new HCL()
