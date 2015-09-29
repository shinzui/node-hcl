HCL to JSON
===========

```go
application {
  name = "string"
  boolean = true
  array = [
    "string", true, 10
  ]
}

```

```json
{
  "application": {
    "name": "string",
    "boolean": true,
    "array": [
      "string", true, 10
    ]
  }
}

```

### Named Objects

```go
variable "ami" {
    description = "the AMI to use"
}

```

```json
{
  "variable": {
    "ami": {
      "description": "the ami to use"
    }
  }
}

```

```go

# An AMI
variable "ami" {
  description = "the AMI to use"
}

/* A multi
   line comment. */
resource "aws_instance" "web" {
  ami = "${var.ami}"
  count = 2
  source_dest_check = false

  connection {
    user = "root"
  }
}

```

```json

{
  "variable": {
    "ami": {
      "description": "the AMI to use"
    }
  },

  "resource": {
    "aws_instance": {
      "web": {
        "ami": "${var.ami}",
        "count": 2,
        "source_dest_check": false,

        "connection": {
          "user": "root"
        }
      }
    }
  }
}
```

### Multiple resources

```go

variable "image" {
  default = "value"
  description = "the AMI to use"
}

variable "images" {
  default = {
    us-east-1 = "image-1234"
    us-west-2 = "image-4567"
  }
  description = "the AMI to use"
}


```

```json

{
  "variable": {
    "image": {
      "default": "value",
      "description": "the AMI to use"
    },
    "images": {
      "default": {
        "us-east-1": "image-1234",
        "us-west-2": "image-4567"
      },
      "description": "the AMI to use"
    }
  }
}

```
