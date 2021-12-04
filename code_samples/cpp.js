samplelist.cpp = [
    {
        "name": "Highlighting Information",
        "mime": "text/x-c++src",
        "mode": "clike"
    },
    {
        "name": "Hello, world",
        "code": `#include <iostream>

int main() {
    std::cout << "Hello, world!\\n";
    return 0;
}`
    },
    {
        "name": "What's your name?",
        "code": `#include <iostream>
#include <string>

int main() {
    std::string name = "";
    std::getline(std::cin, name);
    
    std::cout << "Hello, " << name << "!\\n";
    return 0;
}`
    },
    {
        "name": "What's in the file?",
        "code": `#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main()
{
    ifstream ifs("file.txt");
    string content((istreambuf_iterator<char>(ifs)), (istreambuf_iterator<char>()));
    
    cout << content << '\\n';
    return 0;
}`
    },
    {
        "name": "Roll the dice",
        "code": `#include <iostream>
#include <cstdlib>
#include <ctime>

int main() {
    srand(time(0));
    std::cout << (rand() % 6 + 1) << std::endl;
    return 0;
}`
    }
]