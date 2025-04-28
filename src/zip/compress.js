import { createReadStream, createWriteStream } from 'fs';
import {dirname, join} from 'path';
import { createGzip } from 'zlib';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
    const source = join(__dirname, 'files', 'fileToCompress.txt');
    const destination = join(__dirname, 'files', 'archive.gz');

    const readable = createReadStream(source);
    const writable = createWriteStream(destination);
    const gzip = createGzip();

    readable.pipe(gzip).pipe(writable);
};

await compress();
