"use strict";

const TypeOf = require('remedial').typeOf;

module.exports = function stringify(data) {

    let string = [],
      nodes = [],
      indentLevel = "";

    function buildBlock(member) {
      console.log(member)
      return []

    }

    const handlers = {
        "undefined": function () {
          // objects will not have `undefined` converted to `null`
          // as this may have unintended consequences
          // For arrays, however, this behavior seems appropriate
          return undefined;
        }
      , "null": function () {
          return null;
        }
      , "number": function (x) {
          return x;
        }
      , "boolean": function (x) {
          return x;
        }
      , "string": function (x) {
          // to avoid the string "true" being confused with the
          // the literal `true`, we always wrap strings in quotes
          return JSON.stringify(x);
        }
      , "array": function (x) {
          var output = '[';

          if (0 === x.length) {
            output += '[]';
            return output;
          }

          indentLevel = indentLevel.replace(/$/, '  ');
          x.forEach(function (y, index) {
            // TODO how should `undefined` be handled?
            var handler = handlers[typeOf(y)];

            output += '\n' + indentLevel + '  ' + handler(y);

            if (index !== (x.length - 1)) {
              output += ","
            }

          });
          output += "\n" + indentLevel + "]"
          indentLevel = indentLevel.replace(/  /, '');

          return output;
        }
      , "object": function (x) {

          let output = "{\n";

          indentLevel = indentLevel.replace(/$/, "  ");

          for (let key in x) {
            // console.log(output);
            if (TypeOf(x[key]) === "object") {
              output += "\n";
            }
            output += indentLevel + key + " = " + handlers[TypeOf(x[key])](x[key]) + "\n"
          }

          indentLevel = indentLevel.replace(/  /, '');
          output += indentLevel + "}"
          return output
        }
      , "function": function () {
          // TODO this should throw or otherwise be ignored
          return '[object Function]';
        }
    };
    // return handlers[typeOf(data)](data) + '\n';

    for (let node in data) {
      let value = data[node];
      let nodeString = [];

      let objectLiterals = 0,
          nonObjectLiterals = 0;

      // evaluate the content of the blocks
      // to see if we should format this in a nice way
      for (let member in value) {
        if (TypeOf(value[member]) === "object") {
          objectLiterals++
        } else {
          nonObjectLiterals++
        }
      }

      if (objectLiterals > nonObjectLiterals) {

        for (let member in value) {
          // indentLevel = indentLevel.replace(/$/, "  ");

          if (TypeOf(value[member]) === "object") {

            const stringifiedValue = handlers[TypeOf(value[member])](value[member]);

            let newNode = [
              node + ' "' + member + '" ' + stringifiedValue
            ];
            
            nodes.push(newNode.join("\n"));

          }

        }

      } else {
        // open block
        nodeString.push(node + " {");


        // build block memebers
        for (let member in value) {

          indentLevel = indentLevel.replace(/$/, "  ");
          if (TypeOf(value[member]) === "object") {
            nodeString.push("")
          }
          let stringifiedValue = handlers[TypeOf(value[member])](value[member]);

          nodeString.push(
            indentLevel + member + " = " + stringifiedValue
          );
          indentLevel = indentLevel.replace(/  /, '');

        }

        // close block
        nodeString.push("}");
      }


      nodes.push(nodeString.join("\n"));
    }

    for (let node of nodes) {
      if (nodes.indexOf(node) === (nodes.length -1)) {
        string.push(node);
      } else {
        string.push(node + "\n");
      }

    }

    return string.join("\n");

}
