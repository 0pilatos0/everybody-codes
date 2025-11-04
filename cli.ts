import inquirer from "inquirer";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import ora from "ora";
import figlet from "figlet";
import gradient from "gradient-string";
import boxen from "boxen";
import { z } from "zod";

// Typesafe input validation using Zod
const YearSchema = z.string().regex(/^\d{4}$/, "Please enter a valid year.");
const DaySchema = z.string().regex(/^(0?[1-9]|1[0-9]|2[0-5])$/, "Please enter a valid day between 1 and 25.");

const printBanner = (): void => {
  console.log(gradient.vice(figlet.textSync("Everybody Codes", { horizontalLayout: "default" })));
  console.log(
    boxen(chalk.cyan("Welcome to the Everybody Codes Challenge CLI!"), {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
    })
  );
};

const promptYearAndDay = async (): Promise<{ year: string; day: string }> => {
  const yearPrompt = await inquirer.prompt([
    {
      type: "input",
      name: "year",
      message: "Enter the challenge year:",
      default: new Date().getFullYear().toString(),
      validate: (input: string) => {
        const result = YearSchema.safeParse(input);
        return result.success ? true : chalk.red(result.error.issues[0].message);
      },
    },
  ]);

  const dayPrompt = await inquirer.prompt([
    {
      type: "input",
      name: "day",
      message: "Enter the quest day (1-25):",
      default: "1",
      validate: (input: string) => {
        const result = DaySchema.safeParse(input);
        return result.success ? true : chalk.red(result.error.issues[0].message);
      },
    },
  ]);

  return { year: yearPrompt.year, day: dayPrompt.day };
};

const confirmCreation = async (year: string, day: string): Promise<boolean> => {
  const confirmPrompt = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Create a new quest solution for ${chalk.bold(year)}/day ${chalk.bold(day)}?`,
    },
  ]);
  return confirmPrompt.confirm;
};

const createDirectories = (yearPath: string, dayPath: string): void => {
  if (!fs.existsSync(yearPath)) {
    fs.mkdirSync(yearPath);
  }
  if (!fs.existsSync(dayPath)) {
    fs.mkdirSync(dayPath);
  }
};

const copyTemplate = (templatePath: string, dayPath: string): void => {
  const spinner = ora("Copying template files...").start();
  try {
    const copyDirWithSubDirs = (src: string, dest: string): void => {
      fs.mkdirSync(dest, { recursive: true });
      const entries = fs.readdirSync(src, { withFileTypes: true });
      for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        if (entry.isDirectory()) {
          copyDirWithSubDirs(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };
    copyDirWithSubDirs(templatePath, dayPath);
    spinner.succeed("Template files copied successfully!");
  } catch (error) {
    spinner.fail("Failed to copy template files.");
    console.error(chalk.red("Error:", error));
    process.exit(1);
  }
};

const main = async (): Promise<void> => {
  printBanner();

  const { year, day } = await promptYearAndDay();
  const confirm = await confirmCreation(year, day);

  if (!confirm) {
    console.log(chalk.yellow("Operation cancelled."));
    process.exit(0);
  }

  const templatePath = path.join(__dirname, "template");
  const yearPath = path.join(__dirname, year);
  const dayPath = path.join(yearPath, `day ${day}`);

  createDirectories(yearPath, dayPath);
  copyTemplate(templatePath, dayPath);

  console.log(
    boxen(chalk.cyan(`New quest created at ${chalk.bold(`${yearPath}/day ${day}`)}\nHappy coding!`), {
      padding: 1,
      margin: 1,
      borderStyle: "round",
      borderColor: "cyan",
    })
  );
  process.exit(0);
};

main();
