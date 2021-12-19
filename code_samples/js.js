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
        "name": "What's your name?",
        "code": `let name = prompt("What's your name?");
alert(\`Hello, \${name}!\`);`
    },
    {
        "name": "What's your name? (Node.JS)",
        "code": `const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What's your name?", (name) => {
    console.log(\`Hello, \${name}\`);
    rl.close();
});`
    },
    {
        "name": "What's in the file? (Node.JS)",
        "code": `const fs = require("fs");
fs.readFile("./file.txt", "utf8", function(err, data) {
    if (err) return console.log(err);
    console.log(data);
})`
    },
    {
        "name": "Count from 1 to 10!",
        "code": `for(let i = 1; i < 11; i++) {
    console.log(i);
}`
    }
];