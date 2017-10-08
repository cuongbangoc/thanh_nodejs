var a = [
    {
        "name": "Thanh",
        "age": 18
    },
    {
        "name": "trung",
        "age": 27
    }
];

// JSON => String
var js_str = JSON.stringify(a);
// String => JSON
var js_demo = JSON.parse(js_str);

console.log(js_str);
console.log(js_demo);

// Check array
console.log(Array.isArray(a));

// Delete item in array
a.splice(1, 1); //(index, length)
console.log(a);