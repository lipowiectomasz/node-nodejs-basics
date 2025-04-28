import { Worker } from 'worker_threads';
import os from 'os';
import {dirname, join} from 'path';
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const performCalculations = async () => {
    const numCPUs = os.cpus().length;
    const workers = [];

    const createWorker = (workerData) => {
        return new Promise((resolve) => {
            const worker = new Worker(join(__dirname, 'worker.js'), { workerData });

            worker.on('message', (data) => {
                resolve({ status: 'resolved', data });
            });

            worker.on('error', () => {
                resolve({ status: 'error', data: null });
            });
        });
    };

    for (let i = 0; i < numCPUs; i++) {
        workers.push(createWorker(10 + i));
    }

    const settledResults = await Promise.all(workers);
    console.log(settledResults);
};

await performCalculations();
