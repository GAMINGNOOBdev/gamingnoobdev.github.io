const RED = "redtext";
const BLUE = "bluetext";
const YELLOW = "yellowtext";
const PURPLE = "purpletext";

var cmdLine;
var stdout;
var commands;

function focusAndMoveCursorToTheEnd()
{
    focusCmdLine();

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

    document.addEventListener('mousedown', () => {
        focusCmdLine();
    });

    document.addEventListener('selectionchange', () => {
        focusCmdLine();

        if (document.activeElement.id !== 'cmdline') return;

        const range = window.getSelection().getRangeAt(0);
        const start = range.startOffset;
        const end = range.endOffset;
        const length = cmdLine.textContent.length;

        if (end < length)
            cmdLine.classList.add('noCaret');
        else
            cmdLine.classList.remove('noCaret');
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

    document.addEventListener('keydown', (e) =>
    {
        if (e.target !== cmdLine)
            focusAndMoveCursorToTheEnd();
    });

    cmdLine.addEventListener('keydown', (e) => {    
        if (e.key === 'Enter')
        {
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
        consolePrintLine("...");
        consolePrintLine("...");
        consolePrintLine("if you want to go back to the homepage, type 'index'");
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
        consolePrintLine("Muscle Man: YOU KNOW WHO ELSE NEEDS HELP?", PURPLE);
        consolePrintLine("...", PURPLE);
        consolePrintLine("MY MOM!!!!", PURPLE);
    };

    commands["help me"] = () => {
        consolePrintLine("Error: nah", RED);
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
        consolePrintLine("\t");
        consolePrintLine("INDEX     HTM     ?,??? ??-??-??  6:66a");
        consolePrintLine("PROJECTS  HTM     ?,??? ??-??-??  6:66a");
        consolePrintLine("TERMINAL  HTM     ?,??? ??-??-??  6:66a");
        consolePrintLine("SOCIALS   HTM     ?,??? ??-??-??  6:66a");
        consolePrintLine("GIMMICKS  HTM     ?,??? ??-??-??  6:66a");
        consolePrintLine("ABOUT     HTM     ?,??? ??-??-??  6:66a");
        consolePrintLine("         7 file(s)        ?,??? bytes");
        consolePrintLine("                          ????? bytes free");
        consolePrintLine("\t");
    };

    commands["homepage"] = commands["index"] = () => {
        window.location.href = "/";
    };

    commands["projects"] = () => {
        window.location.href = "/projects";
    };

    commands["terminal"] = commands["cls"];

    commands["socials"] = () => {
        window.location.href = "/socials";
    };

    commands["gimmicks"] = () => {
        window.location.href = "https://gamingnoobdev.straw.page/";
    };

    commands["about"] = () => {
        window.location.href = "/about";
    };

    commands["lesbian"] = commands["gay"] = commands["shit"] = commands["fuck"] = commands["sex"] = commands["yuri"] = commands["Yuri"] = commands["YURI"] = () => {
        consolePrintLine("YURIIII I LOVE YURI I LOVE GIRLS I LOVE YURI I LOVE GIRLS", RED);
        consolePrintLine("DO YOU LOVE YURI AND GIRLS TOO?", RED);
    };

    commands["the truth"] = () => {
        window.location.href = "/code";
    };
}