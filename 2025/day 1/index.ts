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

// Load input files - per part
const inputDir = path.join(import.meta.dir, "input");

// Helper function to load input for a specific part
function getInputPath(partNumber: number): string {
  const inputType = USETESTINPUT ? "test" : "real";
  return path.join(inputDir, `input_${inputType}_part${partNumber}.txt`);
}

// Verify input files exist
function verifyFile(filePath: string): void {
  try {
    Bun.file(filePath).text();
  } catch {
    console.log(chalk.red(`❌ Missing input file: ${filePath}`));
    process.exit(1);
  }
}

// Verify all part input files exist before running
verifyFile(getInputPath(1));
verifyFile(getInputPath(2));
verifyFile(getInputPath(3));

// Function to execute and profile a solution with per-part input
async function executeSolution(
  partNumber: number,
  partName: string,
  solutionFn: (input: string) => unknown
): Promise<void> {
  console.log(formatSectionHeader(partName));

  const inputPath = getInputPath(partNumber);
  const input = await Bun.file(inputPath).text();

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

// Execute all parts with their respective inputs
await executeSolution(1, "Part 1 - Warm Up", part1);
await executeSolution(2, "Part 2 - Intermediate", part2);
await executeSolution(3, "Part 3 - Expert", part3);

// Summary
console.log("\n" + chalk.bold.bgCyan(" ⚡ Quest Complete! ⚡ "));
