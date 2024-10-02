const fs = require("fs").promises;
const path = require("path");

const inputDir = path.join(__dirname, "..", "input");
const outputDir = path.join(__dirname, "..", "output");

process.env.INPUT_DIR = inputDir;
process.env.OUTPUT_DIR = outputDir;

async function getImageFiles() {
  try {
    const files = await fs.readdir(inputDir);
    return files.filter((file) => /\.(png|jpg|jpeg)$/i.test(file));
  } catch (error) {
    console.error("Error reading directory:", error);
    return [];
  }
}

async function createOutputDir() {
  try {
    await fs.mkdir(outputDir, { recursive: true });
    console.log("Output directory created successfully");
  } catch (error) {
    console.error("Error creating output directory:", error);
  }
}

module.exports = { getImageFiles, createOutputDir };
