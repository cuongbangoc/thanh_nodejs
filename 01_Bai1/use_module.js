var my_module = require("./my_module.js");

var my_message = my_module.message("Hello, this is a message");
console.log(my_message);

var result1 = my_module.add(4, 6);
console.log(result1);

var result2 = my_module.sub(15, 9);
console.log(result2);