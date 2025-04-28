import { createWriteStream } from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const write = async () => {
    const filePath = join(__dirname, 'files', 'fileToWrite.txt');
    const stream = createWriteStream(filePath);

    process.stdin.on('data', (chunk) => {
        stream.write(chunk);
    });

    process.stdin.on('end', () => {
        stream.end();
    });
};

await write();
