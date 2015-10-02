


/*

  This is a mutli line string

*/
application {

  awesomeString = "string"

  awesomeNumber = 100

  awsomeBoolean = true // this is a trailing comment

  // this is a single comment
  array = [
    "string", true, 10
  ]


}

variable "image" {
  default = "value"
  description = "the AMI to use"
}

variable "images" {

  description = "the AMI to use"
  default = {
    us-east-1 = "image-1234"
    us-west-2 = "image-4567"
  }
}


resource "aws_instance" "web" {
  ami = "${var.ami}"
  count = 2
  source_dest_check = false

  connection {
    user = "root"
  }
}


resource "aws_instance" "server" {
  ami = "${var.ami}"
  count = 2
  source_dest_check = false

  connection {
    user = "root"
  }
}
