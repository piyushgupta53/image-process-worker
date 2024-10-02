const { processImage } = require("./imageProcessor");
const { getImageFiles, createOutputDir } = require("./fileUtils");
const path = require("path");

async function runSingleThreaded() {
  const start = Date.now();

  try {
    await createOutputDir();

    const imageFiles = await getImageFiles();

    for (const file of imageFiles) {
      const inputPath = path.join(process.env.INPUT_DIR, file);
      const outputPath = path.join(process.env.OUTPUT_DIR, `blurred_${file}`);
      await processImage(inputPath, outputPath);
    }
    console.log(`Single Threaded Processing Took ${Date.now() - start}ms`);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { runSingleThreaded };
