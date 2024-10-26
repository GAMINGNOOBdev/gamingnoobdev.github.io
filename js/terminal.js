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
    consolePrintLine(`> ${ command }`);
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

function consolePrintLine(msg)
{
    const line = document.createElement('DIV');
    line.textContent = msg;
    stdout.appendChild(line);
}

///
/// commands setup
///

function setupCommands()
{
    commands = new Object()

    commands["exit"] = () => {};

    commands["help"] = () => {
        consolePrintLine("No.");
    };

    commands["cls"] = () => {
        var stdoutChildren = stdout.children.length;
        for (let i = 0; i < stdoutChildren; i++)
            stdout.removeChild(stdout.children[0]);
    };

    commands["dir"] = () => {
        consolePrintLine("");
        consolePrintLine(" Volume in drive C is BE-TERM666");
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
        consolePrintLine("");
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