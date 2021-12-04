samplelist.python = [
    {
        "name": "Highlighting Information",
        "mime": "text/x-cython",
        "mode": "python"
    },
    {
        "name": "Hello, world!",
        "code": `print("Hello, world!")`
    },
    {
        "name": "What's your name?",
        "code": `name = input("What's your name? > ")
print(f"Hello, {name}!")`
    },
    {
        "name": "What's in the file?",
        "code": `with open("file.txt", "r") as f:
    print(f.read())`
    },
    {
        "name": "Roll the dice!",
        "code": `import random

print("Rolling the dice...")
print(f"You got: {random.randint(1, 6)}")`
    }
];
