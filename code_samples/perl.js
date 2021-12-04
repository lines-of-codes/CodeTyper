samplelist.perl = [
    {
        "name": "Highlighting Information",
        "mime": "text/x-perl",
        "mode": "perl"
    },
    {
        "name": "Hello, world",
        "code": `use strict;
use warnings;

print "Hello, world!\\n";`
    },
    {
        "name": "What's in the file?",
        "code": `use strict;
use warnings;

open my $fh, '<', 'file.txt'
    or die "Can't open file: $_"

while(my $line = <$fh>){
    print $line;
}
close $fh or die "Couldn't close file: $_";`
    }
]