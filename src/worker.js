const { isMainThread, workerData, parentPort } = require("worker_threads");
const { processImage } = require("./imageProcessor");
const path = require("path");

async function processWorkerImages(workerId, totalWorkers, imageFiles) {
  for (let i = workerId; i < imageFiles.length; i += totalWorkers) {
    const file = imageFiles[i];
    const inputPath = path.join(process.env.INPUT_DIR, file);
    const outputPath = path.join(process.env.OUTPUT_DIR, `blurred-${file}`);
    try {
      await processImage(inputPath, outputPath);
      console.log(`Worker ${workerId} processed: ${file}`);
    } catch (error) {
      console.error(
        `Worker ${workerId} failed to process ${file}: ${error.message}`
      );
    }
  }
}

if (!isMainThread) {
  const { workerId, totalWorkers, imageFiles } = workerData;

  processWorkerImages(workerId, totalWorkers, imageFiles).then(() => {
    parentPort.postMessage("done");
  });
}

module.exports = { processWorkerImages };
