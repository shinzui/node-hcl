"use strict";

const HCL = require("./index"),
      PrettyPrint = require("prettyjson");


const object = HCL.load("./Norma");

console.log("\n--- Lets see how we did ---\n")
console.log(PrettyPrint.render(object));
