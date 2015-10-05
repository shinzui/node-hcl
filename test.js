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
  },
  "variable": {
    "bool": true,
    "image": {
      "default": "value",
      "description": "the AMI to use"
    },
    "images": {
      "description": "the AMI to use",
      "default": {
        "us-east-1": "image-1234",
        "us-west-2": "image-4567"
      }
    }
  }


}

const testObject = HCL.load("./Norma");

console.log(HCL.stringify(testObject));
console.log("\n--- Lets see how we did ---\n")
console.log(PrettyPrint.render(testObject));
