import chalk from "chalk";
import path from "path";
import { part1 } from "./solutions/part1";
import { part2 } from "./solutions/part2";
import { part3 } from "./solutions/part3";

// Default to test input, overridden by flags
let USETESTINPUT = true;

// Process command-line arguments
const args = process.argv.slice(2);
if (args.includes("--real")) USETESTINPUT = false;
if (args.includes("--test")) USETESTINPUT = true;

// Fancy ASCII Art Header - Tech Themed
console.clear();
console.log(
  chalk.cyan(`
⚡  💻  🔮  ⚡  💻  🔮
 ⚡ EVERYBODY CODES ⚡
   💻  🔮  2025  🔮  💻
⚡  💻  🔮  ⚡  💻  🔮
  `)
);
console.log(chalk.blue(`Using ${chalk.bold(USETESTINPUT ? "test" : "real")} input\n`));

// Helper function to format section headers
function formatSectionHeader(title: string) {
  const line = "━".repeat(title.length + 12);
  const formattedTitle = `      ${title}  `;
  return `${chalk.cyan(line)}\n${chalk.magenta.bold(formattedTitle)}\n${chalk.cyan(line)}`;
}

// Load input files
const inputDir = path.join(import.meta.dir, "input");
const testInputPath = path.join(inputDir, "input_test.txt");
const realInputPath = path.join(inputDir, "input_real.txt");

// Verify input files
function verifyFile(filePath: string) {
  try {
    Bun.file(filePath).text();
  } catch {
    console.log(chalk.red(`❌ Missing input file: ${filePath}`));
    process.exit(1);
  }
}
verifyFile(testInputPath);
verifyFile(realInputPath);

const testInput = await Bun.file(testInputPath).text();
const realInput = await Bun.file(realInputPath).text();
const input = USETESTINPUT ? testInput : realInput;

// Function to execute and profile a solution
async function executeSolution(partName: string, solutionFn: (input: string) => unknown, input: string) {
  console.log(formatSectionHeader(partName));

  const startTime = performance.now();
  try {
    const result = await solutionFn(input);
    const endTime = performance.now();

    console.log(`${chalk.bold("Result:")} ${chalk.cyan(result)}`);
    console.log(chalk.gray(`[Execution time: ${(endTime - startTime).toFixed(2)}ms]\n`));
  } catch (error) {
    console.log(chalk.red(`⚠️ Error in ${partName}:`));
    console.error(error);
  }
}

// Execute parts
await executeSolution("Part 1", part1, input);
await executeSolution("Part 2", part2, input);
await executeSolution("Part 3", part3, input);

// Summary
console.log("\n" + chalk.bold.bgCyan(" ⚡ Quest Complete! ⚡ "));
