samplelist.cs = [
    {
        "name": "Highlighting Information",
        "mime": "text/x-csharp",
        "mode": "clike"
    },
    {
        "name": "Hello, world (New)",
        "code": `Console.WriteLine("Hello, world!");`
    },
    {
        "name": "Hello, world (Old)",
        "code": `using System;

public class Application
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

public class Application
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

public class Application
{
    public static void Main(string[] args)
    {
        Console.WriteLine(File.ReadAllText("file.txt"));
    }
}`
    },
    {
        "name": "Roll the dice!",
        "code": `using System;

public class Application
{
    public static void Main(string[] args)
    {
        Console.WriteLine("Rolling the dice...");
        Console.WriteLine($"You got: {new Random().Next(1, 7)}");
    }
}`
    },
    {
        "name": "Count from 1 to 10!",
        "code": `using System;

public class Application
{
    public static void Main(string[] args)
    {
        for(int i = 1; i < 11; i++)
        {
            Console.WriteLine(i);
        }
    }
}`
    }
]