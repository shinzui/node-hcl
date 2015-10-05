
"use strict";

class Parser {

  constructor(){


    this.commentsRegex = /(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)|(?:([\s;])+\#(?:.*)$)/gmi;
    this.whitespaceRegexes = [ /^\s\s*/, /\s\s*$/ ];
    this.nodeRegex = /(?:^\w+(?:[\s\S]*?)^\})/gmi
    this.nodeNameRegex = /(?:^\w+(?:[\s\S]*?))/gmi
    this.nodeNameSpaceRegex = /(?:^\w+(?:[\s\S]*?)$)/gm
    this.variableRegex = /(?:\$\{(?:[\s\S]*?)\})/gmi


  }

  trim(str, arr){

    const defaults = this.whitespaceRegexes;

    arr = (this.isArray(arr) ) ? arr.concat(defaults) : defaults;

    arr.forEach((regEx) => {
      str = str.replace(regEx, "");
    });

    return str;

  }

  isArray(obj) {
    return toString.call( obj ) === "[object Array]";
  };

  size(obj) {
    let size = 0;

    for (let key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key))
        size++;
    }

    return size;
  }

  removeNewLines(str) {
    let lines = [];
    for (let line of str.split("\n")) {
      if (this.trim(line) === "") {
        continue;
      }

      lines.push(line);

    }

    return lines.join("\n")
  }

  removeIndentions(str) {
    let lines = [];
    for (let line of str.split("\n")) {

      lines.push(this.trim(line));

    }

    return lines.join("\n")
  }


}


module.exports = new Parser()
