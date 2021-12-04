samplelist.c = [
    {
        "name": "Highlighting Information",
        "mime": "text/x-csrc",
        "mode": "clike"
    },
    {
        "name": "Hello, world",
        "code": `#include <stdio.h>

int main() {
    printf("Hello, world!\\n");
    return 0;
}`
    },
    {
        "name": "What's your name?",
        "code": `#include <stdio.h>

int main() {
    char* name;
    scanf("%s", name);
    
    printf("Hello, %s!", *name);
}`
    }
]