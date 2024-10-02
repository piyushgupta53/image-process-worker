const sharp = require("sharp");

async function processImage(inputPath, outputPath) {
  await sharp(inputPath).blur(10).toFile(outputPath);
}

module.exports = { processImage };
