import { spawn } from 'child_process';
import { join } from 'path';

const spawnChildProcess = async (args) => {
    const child = spawn('node', [join('src', 'cp', 'files', 'script.js'), ...args], {
        stdio: ['pipe', 'pipe', 'inherit']
    });

    process.stdin.pipe(child.stdin);
    child.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['arg1', 'arg2']);
