import { rename as fsRename, access } from 'fs/promises';
import { constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
    const wrongFile = join(__dirname, 'files', 'wrongFilename.txt');
    const correctFile = join(__dirname, 'files', 'properFilename.md');

    try {
        await access(wrongFile, constants.F_OK);
    } catch {
        throw new Error('FS operation failed');
    }

    try {
        await access(correctFile, constants.F_OK);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code !== 'ENOENT') {
            throw new Error('FS operation failed');
        }
    }

    try {
        await fsRename(wrongFile, correctFile);
    } catch {
        throw new Error('FS operation failed');
    }
};

await rename();
