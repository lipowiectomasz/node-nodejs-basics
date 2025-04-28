import { access, cp } from 'fs/promises';
import { constants } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async () => {
    const source = join(__dirname, 'files');
    const destination = join(__dirname, 'files_copy');

    try {
        await access(source, constants.F_OK);
        await access(destination, constants.F_OK);
        throw new Error('FS operation failed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            await cp(source, destination, { recursive: true });
        } else {
            throw new Error('FS operation failed');
        }
    }
};

await copy();
