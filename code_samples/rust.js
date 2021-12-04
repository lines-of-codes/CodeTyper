samplelist.rust = [
    {
        "name": "Highlighting Information",
        "mime": "text/x-rustsrc",
        "mode": "rust"
    },
    {
        "name": "Hello, world",
        "code": `fn main() {
    println!("Hello, world!");
}`
    },
    {
        "name": "What's your name",
        "code": `use std::io::{stdout, stdin, Write};

fn main() {
    println!("What's your name?");
    stdout().flush().unwrap();
    
    let mut input = String::new();
    stdin().read_line(&mut input).unwrap();
    
    println!("Hello, {}!", input);
}`
    },
    {
        "name": "What's in the file?",
        "code": `use std::fs;

fn main() {
    println!("{}", fs::read_to_string(Path::new("file.txt")).unwrap());
}`
    },
    {
        "name": "Roll the dice",
        "code": `use rand::*;

fn main() {
    let mut rng = thread_rng();

    println!("{}", rng.gen_range(1..=6));
}
`
    }
]