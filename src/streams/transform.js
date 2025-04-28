import { Transform } from 'stream';

const transform = async () => {
    const reverseStream = new Transform({
        transform(chunk, encoding, callback) {
            const reversed = chunk.toString().split('').reverse().join('');
            callback(null, reversed);
        }
    });

    process.stdin.on('data', (chunk) => {
        reverseStream.write(chunk);
    });

    reverseStream.on('data', (chunk) => {
        process.stdout.write(chunk.toString() + "\n");
    });
};

await transform();
