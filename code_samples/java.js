samplelist.java = [
    {
        "name": "Highlighting Information",
        "mime": "text/x-java",
        "mode": "clike"
    },
    {
        "name": "Hello, world",
        "code": `class Application {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}`
    },
    {
        "name": "What's your name?",
        "code": `import java.util.Scanner;

class Application {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("What's your name? > ");
        String name = scanner.nextLine();
        System.out.println("Hello, " + name + "!");
    }
}`
    },
    {
        "name": "What's in the file?",
        "code": `import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

class Application {
    public static void main(String[] args) throws FileNotFoundException {
        File file = new File("file.txt");
        Scanner myReader = new Scanner(file);
        while (myReader.hasNextLine()) {
            String data = myReader.nextLine();
            System.out.print(data);
        }
        myReader.close();
    }
}`
    },
    {
        "name": "Roll the dice!",
        "code": `import java.util.concurrent.ThreadLocalRandom;

class Application {
    public static void main(String[] args) {
        System.out.println("Rolling the dice...");
        int randomNum = ThreadLocalRandom.current().nextInt(1, 7);
        System.out.printf("You got: %d", randomNum);
    }
}`
    },
    {
        "name": "Count from 1 to 10!",
        "code": `class Application {
    public static void main(String[] args) {
        for(int i = 1; i < 11; i++) {
            System.out.println(i);
        }
    }
}`
    }
]