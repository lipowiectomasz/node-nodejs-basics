import { writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import {dirname, join} from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async () => {
    const filePath = join(__dirname, 'files', 'fresh.txt');

    if(existsSync(filePath)){
        throw new Error('FS operation failed');
    } else {
        await writeFile(filePath, 'I am fresh and young');
    }
};

await create();