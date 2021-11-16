samplelist.cs = [
    {
        "name": "Hello, world (New)",
        "code": `Console.WriteLine("Hello, world!");`
    },
    {
        "name": "Hello, world (Old)",
        "code": `using System;

class Application
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Hello, world!");
    }
}`
    },
    {
        "name": "What's your name?",
        "code": `using System;

class Application
{
    public static void Main(string[] args)
    {
        Console.Write("What's your name? > ");
        string name = Console.ReadLine();
        Console.WriteLine($"Hello, {name}!");
    }
}`
    },
    {
        "name": "What's in the file?",
        "code": `using System;
using System.IO;

class Application
{
    public static void Main(string[] args)
    {
        Console.WriteLine(File.ReadAllText("file.txt"));
    }
}`
    }
]