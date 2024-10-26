const RED = "redtext";
const BLUE = "bluetext";
const YELLOW = "yellowtext";
const PURPLE = "purpletext";

var cmdLine;
var stdout;
var commands;

function focusAndMoveCursorToTheEnd()
{
    cmdLine.focus();

    const range = document.createRange();
    const selection = window.getSelection();
    const { childNodes } = cmdLine;
    const lastChildNode = childNodes && childNodes.length - 1;

    range.selectNodeContents(lastChildNode === -1 ? cmdLine : childNodes[lastChildNode]);
    range.collapse(false);

    selection.removeAllRanges();
    selection.addRange(range);
}

function initEverything()
{
    cmdLine = document.getElementById("cmdline");
    stdout = document.getElementById("stdout");

    document.addEventListener('selectionchange', () => {
        focusCmdLine();
    });

    cmdLine.addEventListener('input', () =>
    {
        if (cmdLine.childElementCount < 0)
            return;

        const lines = cmdLine.innerText.replace(/\n$/, '').split('\n');
        const lastLine = lines[lines.length - 1];

        for (let i = 0; i <= lines.length - 2; ++i)
            handleCommand(lines[i]);
    
        cmdLine.textContent = lastLine;

        focusAndMoveCursorToTheEnd();
    });

    cmdLine.addEventListener('keydown', (e) => {    
        if (e.key === 'Enter') {
            e.preventDefault();
                
            handleCommand(cmdLine.textContent);    
            cmdLine.textContent = '';
            focusAndMoveCursorToTheEnd();
        }
    });

    focusCmdLine();

    setupCommands();
}

function focusCmdLine()
{
    cmdLine.focus();
}

function handleCommand(command)
{
    consolePrintLine(`C:\\> ${ command }`);
    if (command == "")
        return;

    try 
    {
        commands[command]();
    }
    catch (error)
    {
        // consolePrintLine(`No such command as '${ command }'`);
        consolePrintLine("Bad command or file name");
    }
}

function consolePrintLine(msg, ID = "")
{
    if (msg == "")
        return;

    const line = document.createElement('DIV');
    if (ID != "")
        line.id = ID;
    line.textContent = msg;
    stdout.appendChild(line);
}

///
/// commands setup
///

function setupCommands()
{
    commands = new Object()

    commands["quit"] = commands["exit"] = () => {
        consolePrintLine("Cannot quit process 'MYLIFE.EXE'", RED);
        consolePrintLine("You should get help.");
        consolePrintLine("try specifying the person you need help for in the help command.");
        consolePrintLine("append the person who needs help, i.e. `help mom`, `help me`, etc.");
    };

    commands["help"] = () => {
        consolePrintLine("Commands list");
        consolePrintLine("  help            - Display this help message");
        consolePrintLine("  cls/clear       - Clear console");
        consolePrintLine("  dir/ls          - Display directory contents");
        consolePrintLine("                    Note: type the name of the listed file to run (without extension)");
        consolePrintLine("  exit/quit       - Quits the terminal");
    };

    commands["help mom"] = () => {
        consolePrintLine("Muscle Man: YOU KNOW WHO ELSE NEEDS HELP?");
        consolePrintLine("...");
        consolePrintLine("me.", PURPLE);
    };

    commands["help me"] = () => {
        consolePrintLine("try inputting the favorite number of hell", RED);
    };

    commands["666"] = () => {
        consolePrintLine("have you ever entered 'empty'", PURPLE);
    };

    commands["empty"] = () => {
        consolePrintLine("53 59 53 54 45 4D 2E 46 41 49 4C 55 52 45 3A 20", RED);
        consolePrintLine("54 52 41 43 45 42 41 43 4B 20 54 4F 20 46 55 4E", RED);
        consolePrintLine("43 54 49 4F 4E 20 22 42 52 41 49 4E 22 3A 20 43", RED);
        consolePrintLine("41 55 53 45 3A 20 46 41 49 4C 45 44 20 54 4F 20", RED);
        consolePrintLine("4C 4F 43 41 54 45 20 45 4D 4F 54 49 4F 4E 2E 20", RED);
        consolePrintLine("55 4E 41 42 4C 45 20 54 4F 20 50 52 4F 43 45 53", RED);
        consolePrintLine("53 20 45 4D 4F 54 49 4F 4E 20 22 45 4D 50 54 59", RED);
        consolePrintLine("22 2E 20 53 48 55 54 54 49 4E 47 20 44 4F 57 4E", RED);
        consolePrintLine("20 41 4C 4C 20 53 4F 43 49 41 4C 20 53 59 53 54", RED);
        consolePrintLine("45 4D 53 2E 2E 2E 2E 2E 2E 2E 2E 2E 2E 2E 2E 2E", RED);
        consolePrintLine("45 52 52 4F 52 3A 20 43 41 4E 4E 4F 54 20 46 49", RED);
        consolePrintLine("4E 44 20 53 4F 43 49 41 4C 20 53 59 53 54 45 4D", RED);
        consolePrintLine("2C 20 4E 4F 20 53 55 43 48 20 46 49 4C 45 20 4F", RED);
        consolePrintLine("52 20 44 49 52 45 43 54 4F 52 59 2E 20 43 41 4E", RED);
        consolePrintLine("27 54 20 43 4F 4E 54 49 4E 55 45 20 50 52 4F 43", RED);
        consolePrintLine("45 53 53 20 22 4D 59 4C 49 46 45 2E 45 58 45 22", RED);
        consolePrintLine("if you seek to copy the hex, edit thy html text", PURPLE);
    };

    commands["clear"] = commands["cls"] = () => {
        var stdoutChildren = stdout.children.length;
        for (let i = 0; i < stdoutChildren; i++)
            stdout.removeChild(stdout.children[0]);
    };

    commands["ls"] = commands["dir"] = () => {
        consolePrintLine("\t");
        consolePrintLine(" Volume in drive C is BE-TERM97");
        consolePrintLine(" Volume Serial Number is ????-????");
        consolePrintLine(" Directory of C:\\");
        consolePrintLine("");
        consolePrintLine("INDEX     HTM       810 ??-??-??  6:66a");
        consolePrintLine("PROJECTS  HTM     1,881 ??-??-??  6:66a");
        consolePrintLine("TERMINAL  HTM       593 ??-??-??  6:66a");
        consolePrintLine("SOCIALS   HTM     3,286 ??-??-??  6:66a");
        consolePrintLine("ABOUT     HTM     1,504 ??-??-??  6:66a");
        consolePrintLine("         4 file(s)        8,074 bytes");
        consolePrintLine("                          ????? bytes free");
        consolePrintLine("\t");
    };

    commands["index"] = () => {
        window.location.href = "https://gamingnoobdev.github.io/";
    };

    commands["projects"] = () => {
        window.location.href = "https://gamingnoobdev.github.io/projects";
    };

    commands["terminal"] = commands["cls"];

    commands["socials"] = () => {
        window.location.href = "https://gamingnoobdev.github.io/socials";
    };

    commands["about"] = () => {
        window.location.href = "https://gamingnoobdev.github.io/about";
    };
}