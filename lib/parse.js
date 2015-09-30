"use strict";

const Parser = require("./util/parser");

module.exports = function parse(contents, opts) {

  let result = {};
  const contentsCopy = contents;

  opts || (opts = {});


  /*

    Intial plan of attack for parsing a string:

      * [x] Trim the string to remove extra whitespace
      * [x] Remove all comments
      * [x] Remove all newlines
      * [x] Parse each object tree and return an array of strings
      * [x] Iterate through tree assigning values to result object
         based on node name
      * [x] Parse node for namespace arguments `resource <arg> <arg> {}`
      * [ ] More to come....


  */

  // Trim the string to remove extra whitespace
  contents = contents.trim();

  // Remove all comments
  contents = contents.replace(Parser.commentsRegex, "");


  // Remove all newlines
  contents = Parser.removeNewLines(contents);


  /*

    Parse file into object nodes

    An object node refers to a top level HCL delcaration

    ```go
    application {}

    application "string" {}

    application "string" "string" {}

    ```

    Each item in the nodes array will represent an individual node

  */
  let nodes = contents.match(Parser.nodeRegex);


  for (let node of nodes) {



    /*

      Intial plan of attack for parsing a node:

        * [x] Isolate name of node
        * [x] See if simple or complex node

        Simple:
          * [x] Assign name to result object if not present
          * [x] Assign content to existing name

        Complex:
          * [x] Isolate number of namespaces
          * [x] Assign levels to object
          * [x] Assign content to namespace

    */
    // Isolate name of node
    let nodeName = node.match(Parser.nodeNameRegex)[0],
        nodeContents = "";


    // add the node name to the results object
    if (!result[nodeName]) {
      result[nodeName] = {}
    }


    // See if simple or complex node
    let isSimple = true;
    let names = node.match(Parser.nodeNameSpaceRegex)[0].split(" ");

    // remove the last item in the array which is {
    names.pop()

    if (names.length > 1) {
      isSimple = false;
    }


    let innerContents = node
      .replace(Parser.nodeNameSpaceRegex, "")
      .replace(/^\}/gmi, "");

    innerContents = Parser.removeIndentions(
      Parser.removeNewLines(innerContents)
    );

    // Simple
    if (isSimple) {

      result[nodeName] = innerContents;
      continue;
    }


    // Complex
    // remove node name
    names.shift()

    // syntax check
    for (let namespace of names) {
      if (
        (namespace.substr(0, 1) != "\"") ||
        (namespace.substr((namespace.length - 1), 1) != "\"")
      ) {
        throw new ReferenceError("NAME of TYPE must be string");
      }
    }

    let namespaceLength = names.length,
        count = 0;

    let previousNodeLevel = result;
    let currentNodeLevel = nodeName;

    while (namespaceLength > 0) {

      let name = names[count].replace(/\"/gmi, "");

      if (!previousNodeLevel[currentNodeLevel]) {
        previousNodeLevel[currentNodeLevel] = {};
      }

      if (!previousNodeLevel[currentNodeLevel][name]) {
        previousNodeLevel[currentNodeLevel][name] = {};
      }


      if (namespaceLength === 1) {
        previousNodeLevel[currentNodeLevel][name] = innerContents;
      }

      previousNodeLevel = previousNodeLevel[currentNodeLevel];
      currentNodeLevel = name;

      count++;
      namespaceLength--;

    }



  }



  // console.log(contents);
  return result;

}
