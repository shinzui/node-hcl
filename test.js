"use strict";

const HCL = require("./index")(".tf"),
      PrettyPrint = require("prettyjson");


// const object = HCL.load("./AppFile");
//
// console.log("\n--- Lets see how we did ---\n")
// console.log(PrettyPrint.render(object));

const object = {
  "application": {
    "awesomeString": "string",
    "awesomeNumber": 100,
    "awsomeBoolean": true,
    "array": [
      "string",
      true,
      10
    ],
    "object": {
      "key": "value"
    }
  }
}



console.log(HCL.stringify(object));
// console.log(object)
