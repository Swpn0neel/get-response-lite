import readline from "readline";
import chalk from "chalk";
import boxen from "boxen";
import { interactive } from "./ai.js";
import { help } from "./ui/help.js";

/**
 * Starts the interactive chat mode.
 * @param {string} material Context from files/directories
 */
export function chatMode(material) {
  let context = material
    ? `All the necessary details read from the files is:\n\n${material}`
    : "";
    
  console.log(
    chalk.italic(
      `Welcome to the interactive chat mode of ${chalk.yellow(
        "Get Response Lite"
      )}.\nYou can type ${chalk.yellow(
        "help"
      )} if you need any assistance, or type ${chalk.yellow(
        "exit"
      )} to quit the chat mode.`
    )
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: chalk.cyan("Type your message: "),
  });

  rl.prompt();
  let input = "";
  rl.on("line", async (line) => {
    input = line.trim();
    if (input.toLowerCase() === "exit" || input.toLowerCase() === "stack") {
      rl.close();
    } else if (input.toLowerCase() === "help") {
      help();
      rl.prompt();
    } else {
      readline.moveCursor(process.stdout, 0, -1);
      readline.clearLine(process.stdout, 0);
      readline.cursorTo(process.stdout, 0);
      console.log(
        "\n" +
          boxen(chalk.cyan(input), {
            padding: 1,
            align: "left",
            borderColor: "cyan",
            title: "You",
            titleAlignment: "left",
          })
      );
      context = await interactive(input, context);
      rl.prompt();
    }
  }).on("close", () => {
    if (input.toLowerCase() === "stack") {
      // stackMode was called in original index.js but not defined. 
      // I will keep it as a placeholder or remove it if it's dead code.
      // Based on original, it looks like it was intended but not implemented.
      console.log(chalk.yellow("Stack mode not implemented."));
      console.log(chalk.red("Exiting chat mode."));
    } else {
      console.log(chalk.red("Exiting chat mode."));
    }
  });
}
