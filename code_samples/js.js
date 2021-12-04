samplelist.js = [
    {
        "name": "Highlighting Information",
        "mime": "text/javascript",
        "mode": "javascript"
    },
    {
        "name": "Hello, world",
        "code": `console.log("Hello, world!");`
    },
    {
        "name": "Addition",
        "code": `let a = 10;
let b = 20;
console.log(a + b);`
    },
    {
        "name": "What's your name?",
        "code": `let name = prompt("What's your name?");
` + "alert(`Hello, ${name}!`);"
    },
    {
        "name": "What's in the file? (Node.JS)",
        "code": `const fs = require("fs");
fs.readFile("./file.txt", "utf8", function(err, data) {
    if (err) return console.log(err);
    console.log(data);
})`
    }
];