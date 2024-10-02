const { Worker } = require("worker_threads");
const { getImageFiles, createOutputDir } = require("./fileUtils");
const path = require("path");

const numWorkers = 4;

async function runMultithread() {
  const start = Date.now();

  try {
    await createOutputDir();

    const imageFiles = await getImageFiles();

    const workerPromises = [];
    for (let i = 0; i < numWorkers; i++) {
      const worker = new Worker(path.join(__dirname, "worker.js"), {
        workerData: { workerId: i, totalWorkers: numWorkers, imageFiles },
      });

      workerPromises.push(
        new Promise((resolve, reject) => {
          worker.on("message", resolve), worker.on("error", reject);
        })
      );
    }

    await Promise.all(workerPromises);
    console.log(`Multi-threaded processing took ${Date.now() - start}ms`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { runMultithread };
