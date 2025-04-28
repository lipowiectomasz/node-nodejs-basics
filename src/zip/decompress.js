import { createReadStream, createWriteStream } from 'fs';
import {dirname, join} from 'path';
import { createUnzip } from 'zlib';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
    const source = join(__dirname, 'files', 'archive.gz');
    const destination = join(__dirname, 'files', 'fileToCompress.txt');

    const readable = createReadStream(source);
    const writable = createWriteStream(destination);
    const unzip = createUnzip();

    readable.pipe(unzip).pipe(writable);
};

await decompress();
