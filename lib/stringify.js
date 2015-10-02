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
            output += indentLevel + indentLevel + key + " = " + handlers[TypeOf(x[key])](x[key]);
          }
          output += "\n" + indentLevel + "}"
          indentLevel = indentLevel.replace(/  /, '');
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

      // open block
      nodeString.push(node + " {");

      // build block memebers
      for (let member in value) {

        let stringifiedValue = handlers[TypeOf(value[member])](value[member]);

        nodeString.push(
          "  " + member + " = " + stringifiedValue
        )
      }

      // close block
      nodeString.push("}");

      nodes.push(nodeString.join("\n"));
    }

    for (let node of nodes) {
      if (nodes.indexOf(node) === (nodes.length -1)) {
        string.push(node);
      } else {
        string.push(node);
      }

    }

    return string.join("\n");

}
