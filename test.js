"use strict";

const HCL = require("./index")(".tf"),
      PrettyPrint = require("prettyjson");


const object = require("./test-config");

console.log("\n--- Lets see how we did ---\n")
console.log(PrettyPrint.render(object));
// console.log(object)
