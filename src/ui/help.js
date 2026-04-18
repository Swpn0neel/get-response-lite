import chalk from "chalk";
import boxen from "boxen";

/**
 * Displays the help message.
 */
export function help() {
  const helpText = `
${chalk.underline.yellow("Get-Response-Lite : A terminal-based AI chat-bot")}

[ ${chalk.italic.cyan("Created by Swapnoneel Saha")} ]

${chalk.bold("Usage : ")}

  ${chalk.yellow("npx ai [question] [option(s)] [directory path]")}

${chalk.bold("Options : ")}

  ${chalk.cyan("-h, --help")}          Show this help message and exit
  ${chalk.cyan("-v, --version")}       Show the version number and exit
  ${chalk.cyan(
    "-f <file>"
  )}           Provide a file path to include its content as context
  ${chalk.cyan(
    "-d <directory>"
  )}      Provide a directory path to include all files' content as context
  ${chalk.cyan(
    "-c, --chat-mode"
  )}     Starts an context-based interactive chat window (type "exit" to exit)
  ${chalk.cyan(
    "-t, --terminal"
  )}      Based on the prompt, generates commands that directly executes in the terminal

${chalk.bold("Examples : ")}

  ${chalk.dim(`npx ai "How is Python better than C++?"
  npx ai "What is the function isRand() doing?" -f context.js
  npx ai "How to import app.js within index.js?" -d contextDir
  npx ai "Create a React app named get-response" -t
  npx ai -c
  npx ai -c -f context.txt
  npx ai -c -d contextDir`)}
  
${chalk.bold("Check out Get Response : ")}      ${chalk.cyan.italic(
    "https://www.npmjs.com/package/get-response"
  )}
${chalk.bold("Follow me to stay updated : ")}   ${chalk.cyan.italic(
    "https://twitter.com/swapnoneel123"
  )}`;
  
  const helpMsg = boxen(helpText, {
    padding: 1,
    title: "Welcome",
    titleAlignment: "center",
    borderStyle: "double",
    borderColor: "green",
  });
  console.log(helpMsg);
}
