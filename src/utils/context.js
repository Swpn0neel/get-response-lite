import fs from "fs";
import path from "path";
import chalk from "chalk";
import { createSpinner } from "nanospinner";

/**
 * Checks if a file or directory should be skipped based on size or name.
 * @param {string} file Path to file/directory
 * @returns {Promise<boolean>}
 */
export async function isSkippable(file) {
  const stats = fs.statSync(file);
  const maxSize = 3 * 1024 * 1024;
  const largeFile = [".log", ".zip", ".tar", ".rar", ".gz", ".7z"];
  const largeDirectory = [
    ".next",
    "node_modules",
    "dist",
    "build",
    "coverage",
    "logs",
    "__pycache__",
    "tmp",
    "temp",
  ];
  const name = path.basename(file);
  const extension = path.extname(file);
  if (largeFile.includes(extension) || largeDirectory.includes(name))
    return true;
  if (stats.size > maxSize) return true;
  return false;
}

/**
 * Reads the content of a file to provide context.
 * @param {string[]} cmd Command arguments
 * @param {string} question Original question
 * @returns {Promise<string>} Content with context
 */
export async function fileContext(cmd, question) {
  let material = "";
  const index =
    (cmd.indexOf("-f") > cmd.indexOf("--file")
      ? cmd.indexOf("-f")
      : cmd.indexOf("--file")) + 1;
  if (index < cmd.length) {
    const spinner = createSpinner();
    spinner.start({ text: "Reading your file..." });
    let file = cmd[index];
    try {
      if (await isSkippable(file)) {
        spinner.error({
          text: `${chalk.red(
            " Cannot read this file, it is too large:"
          )} ${file}`,
        });
      } else {
        const content = fs.readFileSync(path.resolve(file), "utf-8");
        material = `${question}\n\nContext of the question is:\n${content}`;
        spinner.success({ text: " File read successfully." });
      }
    } catch (error) {
      spinner.error({ text: ` Error while reading the file: ${error}` });
      process.exit(1);
    }
  } else {
    console.log("Please provide a file path after the -f flag.");
    process.exit(1);
  }
  return material;
}

/**
 * Reads all files from a directory to provide context.
 * @param {string[]} cmd Command arguments
 * @param {string} question Original question
 * @returns {Promise<string>} Combined content with context
 */
export async function directoryContext(cmd, question) {
  let material = "";
  const index =
    (cmd.indexOf("-d") > cmd.indexOf("--directory")
      ? cmd.indexOf("-d")
      : cmd.indexOf("--directory")) + 1;
  if (index < cmd.length) {
    const spinner = createSpinner();
    spinner.start({ text: "Reading each file from your directory..." });
    let dir = cmd[index];
    let content = "";
    
    const readFilesRecursively = async (directory) => {
      const files = fs.readdirSync(path.resolve(directory));
      for (const file of files) {
        const filePath = path.join(directory, file);
        if (fs.lstatSync(filePath).isDirectory()) {
            if (!(await isSkippable(filePath))) {
                await readFilesRecursively(filePath);
            }
        } else {
          if (await isSkippable(filePath)) {
            spinner.warn({
              text: `${chalk.red(
                " Cannot read this file, it is too large:"
              )} ${file}`,
            });
          } else {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            content += `\nContext from ${filePath}:\n\n${fileContent}`;
            spinner.success({ text: `Read this file successfully: ${file}` });
          }
        }
      }
    };

    try {
      await readFilesRecursively(dir);
      spinner.success({ text: "Completed reading files from the directory" });
      material = `${question}\n\nContext of the question is:\n${content}`;
    } catch (error) {
      spinner.error({
        text: `Error while reading files from the directory: ${error}`,
      });
      process.exit(1);
    }
  } else {
    console.log("Please provide a directory path after the -d flag.");
    process.exit(1);
  }
  return material;
}
