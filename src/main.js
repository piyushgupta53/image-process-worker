const { runSingleThreaded } = require("./singleThreaded");
const { runMultithread } = require("./multiThreaded");

async function main() {
  console.log("Running single-threaded processing...");
  await runSingleThreaded();

  console.log("\nRunning multi-threaded processing...");
  await runMultithread();
}

main();
