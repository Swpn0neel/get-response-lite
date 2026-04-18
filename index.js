#!/usr/bin/env node

import chalk from "chalk";
import { VERSION } from "./src/config.js";
import { isUpdated, versionMsg } from "./src/utils/system.js";
import { ask } from "./src/ai.js";
import { chatMode } from "./src/chat.js";
import { askTerminal } from "./src/terminal.js";
import { help } from "./src/ui/help.js";
import { fileContext, directoryContext } from "./src/utils/context.js";

// Check for updates on startup
await isUpdated();

// CLI argument parsing
const cmd = process.argv.slice(2);
const question = cmd
  .filter(
    (exec) =>
      exec !== "-f" &&
      exec !== "--file" &&
      exec !== "--mermaid" &&
      exec !== "-d" &&
      exec !== "--directory" &&
      exec !== "-c" &&
      exec !== "--chat-mode" &&
      exec !== "-h" &&
      exec !== "--help" &&
      exec !== "-t" &&
      exec !== "--terminal" &&
      exec !== "-v" &&
      exec !== "--version" &&
      !exec.startsWith("./")
  )
  .join(" ");

/**
 * Main command router
 */
async function main() {
  if (cmd.includes("-v") || cmd.includes("--version")) {
    versionMsg();
  } else if (cmd.includes("-h") || cmd.includes("--help")) {
    help();
  } else if (cmd.includes("-f") || cmd.includes("--file")) {
    const material = await fileContext(cmd, question);
    if (cmd.includes("-c") || cmd.includes("--chat-mode")) {
      chatMode(material);
    } else {
      if (question) ask(material);
      else console.error(chalk.red("Please ask a question!"));
    }
  } else if (cmd.includes("-d") || cmd.includes("--directory")) {
    const material = await directoryContext(cmd, question);
    if (cmd.includes("-c") || cmd.includes("--chat-mode")) {
      chatMode(material);
    } else {
      if (question) ask(material);
      else console.error(chalk.red("Please ask a question!"));
    }
  } else if (cmd.includes("-c") || cmd.includes("--chat-mode")) {
    chatMode("");
  } else if (cmd.includes("-t") || cmd.includes("--terminal")) {
    await askTerminal(question);
  } else {
    if (question) {
      await ask(question);
    } else {
      console.log(
        chalk.red("Please provide a question or a valid flag to get a response!!")
      );
    }
  }
}

main().catch(error => {
    console.error(chalk.red("An unexpected error occurred:"), error);
    process.exit(1);
});
