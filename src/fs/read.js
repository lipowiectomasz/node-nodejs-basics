import { readFile, access } from 'fs/promises';
import { constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
    const filePath = join(__dirname, 'files', 'fileToRead.txt');

    try {
        await access(filePath, constants.F_OK);
    } catch {
        throw new Error('FS operation failed');
    }

    try {
        const content = await readFile(filePath, { encoding: 'utf-8' });
        console.log(content);
    } catch {
        throw new Error('FS operation failed');
    }
};

await read();
