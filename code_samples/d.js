samplelist.d = [
    {
        "name": "Hello, world",
        "code": `import std.stdio;

void main() {
    writeln("Hello, world!");
}`
    },
    {
        "name": "What's your name?",
        "code": `import std.stdio;

void main() {
    string name;
    write("What's your name? > ");
    readf("%s", &name);
    writeln();
    
    writeln("Hello, ", std.string.strip(name), "!");
}`
    },
    {
        "name": "What's in the file?",
        "code": `import std.stdio;
import std.file;

void main() {
    writeln(readText("file.txt"));
}`
    }
]