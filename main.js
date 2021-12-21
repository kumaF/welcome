figlet.defaults({ fontPath: 'https://unpkg.com/figlet/fonts/' });
figlet.preloadFonts(['Standard', 'Poison'], ready);

var description = `Welcome all fellow humans and bots to my website. [[;rgba(255,255,255,0.5);]Type 'help' to get started`;

var help = ` 
Wow, I thought the only people who would visit here would be bots and spammers,
guess I was wrong. Just type any of the commands below to get some more info.

You can even type a few letters and press [tab] to autocomplete.

[[;rgba(255,255,255,0.99);]ls \t\t\t\t\t\t[[;rgba(255,255,255,0.5);]show files in the current directory
[[;rgba(255,255,255,0.99);]cat [[;rgba(255,255,255,0.5);]FILENAME \t\t\t[[;rgba(255,255,255,0.5);]display content of FILENAME in window
[[;rgba(255,255,255,0.99);]clear \t\t\t\t\t[[;rgba(255,255,255,0.5);]clear current window
`;

var ls = `profile.txt \t\tskills.json \tcontact.md`;

var profile = ` 
Hey there! Thanks for taking such a keen interest in me. Hopefully you're not gonna
spam or stalk me... Okay, I guess if you must stalk me, just give me a fair warning so
I can look presentable when you arrive at my door.

Right, so, where to begin? Well, my parents met in... Nah, just kidding. As you
probably know, my name is [[;rgba(255,255,255,0.99);]Kumara Fernando. [[;rgba(255,255,255,0.5);]I'm a 26 year old [[;rgba(255,255,255,0.99);]Computer Science [[;rgba(255,255,255,0.5);]graduate
born in Sri Lanka.

I'm primarily a backend developer -- however I'm also skilled in DevOps too.
My go-to language is [[;rgba(255,255,255,0.99);]Python,[[;rgba(255,255,255,0.5);] but I'm also comfortable in NodeJS, Go and Bash.

I'm highly motivated, disciplined and passionate about clean code, Also I'm learning
any and everything that happens to come my way.

Nowadays I'm developing a method to order pizza for free... I wish!

[[;rgba(255,255,255,0.5);]I'm currently working at [[!;;;;https://primesens.com/]Primesens], where we develop highly scalable data-driven
solutions.
`;

var skills = ` 
{
    "language": [ "python", "javascript", "go" ]
    "backend": [ "fastapi", "expressjs" ],
    "database": [ "sql", "nosql", "graphdb" ],
    "source_control": [ "git" ],
    "cloud_paltform": [ "gcp", "aws", "azure" ],
    "other": [ "docker", "k8s", "ci-cd" ]
}
`;

var contact = ` 
## Contact Details

- email: mklmfernando@gmail.com
- linkedin: https://www.linkedin.com/in/kumafdo/
- github: https://github.com/kumaF
`;

function ready() {
    $('body').terminal(function (command) {
            var cmd = $.terminal.parse_command(command);
            
            switch (cmd.name) {
                case 'help':
                    this.echo(help);
                    break;
                case 'ls':
                    if (cmd.args[0] === '-a') {
                        this.echo(`${ls} \t\t.secret.txt`)
                    } else {
                        this.echo(ls);
                    }
                    break;
                case 'cat':
                    if (cmd.args[0] === 'profile.txt') {
                        this.echo(profile)
                    } else if (cmd.args[0] === 'skills.json') {
                        this.echo(skills)
                    } else if (cmd.args[0] === 'contact.md') {
                        this.echo(contact)
                    } else {
                        this.error(`cat: ${cmd.args[0]}: No such file or directory`);
                    }
                    break;
                default:
                    this.error(`\nCommand '${cmd.name}' not found. Type 'help' to list available commands.\n`);
                    break;
            }
        },
        {
            greetings: false,
            onInit: function () {
                this.echo(() => render(this, 'Welcome') +`\n[[;rgba(255,255,255,0.99);]${description}\n`)
            },
            prompt: "[[;green;]guest@kumafdo:~$ ]",
            completion: function(string, callback) {
                if (this.get_command().match(/^cat /)) {
                   callback(['profile.txt', 'skills.json', 'contact.md']);
                } else {
                  callback(['help', 'ls', 'cat']);
                }
            }

        }
    );
}

function render(term, text, font) {
    const cols = term.cols();
    return figlet.textSync(text, {
        font: 'Poison',
        width: cols,
        whitespaceBreak: true
    });
}