HCL
===

Ported from https://github.com/hashicorp/hcl

HCL (HashiCorp Configuration Language) is a configuration language built by HashiCorp. The goal of HCL is to build a structured configuration language that is both human and machine friendly for use with command-line tools, but specifically targeted towards DevOps tools, servers, etc.

HCL is also fully JSON compatible. That is, JSON can be used as completely valid input to a system expecting HCL. This helps makes systems interoperable with other systems.

HCL is heavily inspired by[libucl](https://github.com/vstakhov/libucl), nginx configuration, and others similar.

Why?
----

A common question when viewing HCL is to ask the question: why not JSON, YAML, etc.?

Prior to HCL, the tools we built at [HashiCorp](http://www.hashicorp.com) used a variety of configuration languages from full programming languages such as Ruby to complete data structure languages such as JSON. What we learned is that some people wanted human-friendly configuration languages and some people wanted machine-friendly languages.

JSON fits a nice balance in this, but is fairly verbose and most importantly doesn't support comments. With YAML, we found that beginners had a really hard time determining what the actual structure was, and ended up guessing more than not whether to use a hyphen, colon, etc. in order to represent some configuration key.

Full programming languages such as Ruby enable complex behavior a configuration language shouldn't usually allow, and also forces people to learn some set of Ruby.

Because of this, we decided to create our own configuration language that is JSON-compatible. Our configuration language (HCL) is designed to be written and modified by humans. The API for HCL allows JSON as an input so that it is also machine-friendly (machines can generate JSON instead of trying to generate HCL).

Our goal with HCL is not to alienate other configuration languages. It is instead to provide HCL as a specialized language for our tools, and JSON as the interoperability layer.

Resource
--------

-	http://www.terraform.io/docs/configuration/syntax.html
-	https://github.com/hashicorp/hcl/blob/master/hcl/parse.y

Syntax
------

The complete grammar[can be found here](https://github.com/hashicorp/hcl/blob/master/hcl/parse.y), if you're more comfortable reading specifics, but a high-level overview of the syntax and grammar are listed here.

-	Single line comments start with `#` or `//`

-	Multi-line comments are wrapped in `/*` and `*/`. Nested block comments are not allowed. A multi-line comment (also known as a block comment) terminates at the first `*/` found.

-	Values are assigned with the syntax `key = value` (whitespace doesn't matter). The value can be any primitive: a string, number, boolean, object, or list.

-	Strings are double-quoted and can contain any UTF-8 characters. Example: `"Hello, World"`

-	Numbers are assumed to be base 10. If you prefix a number with 0x, it is treated as a hexadecimal. If it is prefixed with 0, it is treated as an octal. Numbers can be in scientific notation: "1e10".

-	Boolean values: `true`, `false`

-	Arrays can be made by wrapping it in `[]`. Example:`["foo", "bar", 42]`. Arrays can contain primitives and other arrays, but cannot contain objects. Objects must use the block syntax shown below.

Objects and nested objects are created using the structure shown below:

```go
variable "ami" {
    description = "the AMI to use"
}
```

```json
{
  "variable": {
    "ami": {
      "description": "the AMI to use"
    }
  }
}

```

TODO
----

-	[ ] Parse HCL from string into JSON
-	[ ] Parse HCL from file into JSON
-	[ ] Requireable config from HCL
-	[ ] JSON to HCL string
-	[ ] JSON to HCL file
-	[ ] Handle variables
-	[ ] Handle templates
-	[ ] Add built-in functions [like here](https://terraform.io/docs/configuration/interpolation.html)
-	[ ] Handle custom interpreters [like here](https://terraform.io/docs/configuration/resources.html)

Licence
-------

The original language is licenced under Mozilla Public License, version 2.0 https://github.com/hashicorp/hcl/blob/master/LICENSE

Whatever that is mine is under MIT.
