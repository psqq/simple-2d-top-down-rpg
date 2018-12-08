// Git commands to create clear orphan branch:
// git checkout --orphan gh-pages
// git rm --cached -r .

var options = {
    filesToMoveOnGhPages: [
        'dist/*', 'assets'
    ],
    runBeforeCheckoutOnGhPages: [
        'yarn run setDebugStatus'
    ],
    onGhPages: {
        removeFiles: true,
        filesToRemove: {
            globPattern: '*',
            exclude: ['node_modules', 'dist', '.git', '.gitignore'],
        },
    },
    debug: true,
};

var sh = require('shelljs');
var tmp = require('tmp');
var git = require('simple-git/promise')(__dirname);
var glob = require("glob");

var tmpDir = tmp.dirSync();

function debugMessage(...args) {
    if (options.debug) {
        console.log(...args);
    }
}

debugMessage('tmpDir:', tmpDir.name);

var lastMasterCommitMessage = sh.exec('git log -1 --pretty=%B', { silent: true }).stdout.trim();

debugMessage('lastMasterCommitMessage:', JSON.stringify(lastMasterCommitMessage));

function run(cmd) {
    debugMessage('shelljs:', cmd);
    var res = sh.exec(cmd, { silent: false });
    if (res.code != 0) {
        throw "Result code is not zero!";
    }
}

function printStatusFiles(files, ignoreDebug) {
    for (var f of files) {
        if (ignoreDebug) {
            console.log(f);
        } else {
            debugMessage(f);
        }
    }
}

async function main() {
    run('yarn run build');
    for (var fn of options.filesToMoveOnGhPages) {
        run(`cp -R ${fn} ${tmpDir.name}`);
    }
    for(var cmd of options.runBeforeCheckoutOnGhPages) {
        run(cmd);
    }
    var status = await git.status();
    var currentBranch = status.current;
    debugMessage('Current branch:', currentBranch);
    if (status.files.length > 0) {
        console.log(currentBranch + ' status files:');
        printStatusFiles(status.files, true);
        console.error("Error: You have modified files in current branch!");
        return;
    }
    run('git checkout gh-pages');
    if (options.onGhPages.removeFiles) {
        var filesToRemove = glob.sync(options.onGhPages.filesToRemove.globPattern);
        var exclude = options.onGhPages.filesToRemove.exclude;
        var t = [];
        for (var fn of filesToRemove) {
            if (exclude.indexOf(fn) >= 0) {
                continue;
            }
            t.push(fn);
        }
        filesToRemove = t;
        debugMessage("Files to remove:", filesToRemove, filesToRemove.join(" "));
        run('rm -rf ' + filesToRemove.join(" "));
    }
    run(`cp -R ${tmpDir.name}/* ./`);
    var status = await git.status();
    debugMessage('gh-pages status files:');
    printStatusFiles(status.files);
    if (status.files.length <= 0) {
        console.warn("Warning: Nothing to commit in gh-pages branch!");
    } else {
        run('git add .');
        run(`git commit -m "last master commit message: ${lastMasterCommitMessage}"`);
    }
    run('git checkout ' + currentBranch);
}

main();
