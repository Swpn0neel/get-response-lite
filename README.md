# 🚀 Get Response-Lite: Terminal-based AI Assistant

**Get Response Lite** is a lightweight, modular Node.js CLI tool designed to bring the power of Google's Gemini AI directly to your terminal. Whether you need a quick answer, an interactive chat session, or automated terminal command execution, Get Response Lite provides a seamless and aesthetically pleasing experience.

Created by [Swapnoneel Saha](https://x.com/swapnoneel123), this is the streamlined version of the [Get-Response](https://www.npmjs.com/package/get-response) package, optimized for speed and minimal overhead.

---

## ✨ Features

- **Instant Answers**: Get high-quality responses from Gemini 2.0/2.5 Flash models instantly.
- **Context Awareness**: Use files (`-f`) or entire directories (`-d`) as context for your questions.
- **Interactive Chat**: Enter a persistent chat session (`-c`) that remembers the context of your conversation.
- **Terminal Automation**: Let AI generate and execute terminal commands (`-t`) based on your natural language prompts.
- **Beautiful UI**: Rich text formatting, spinners, and boxed outputs for a premium terminal experience.
- **Smart Filtering**: Automatically skips large files, binary data, and common build directories (`node_modules`, `.next`, etc.) to keep context relevant and within token limits.

---

## 🏗 Architecture Overview

The project follows a modular architecture to ensure clean separation of concerns and ease of maintenance.

### Directory Structure

```text
get-response-lite/
├── index.js                # Main entry point & CLI router
├── package.json            # Project manifest & dependencies
├── src/
│   ├── ai.js               # Google Generative AI integration & generation cores
│   ├── chat.js             # Interactive chat mode implementation
│   ├── config.js           # Centralized configuration
│   ├── terminal.js         # Command generation & execution logic
│   ├── ui/
│   │   └── help.js         # stylized help message UI
│   └── utils/
│       ├── context.js      # File & Directory reading with smart skipping
│       ├── formatter.js    # Markdown-to-Chalk text styling
│       └── system.js       # OS detection & update checks
```

### Module breakdown

- **`index.js`**: The traffic controller. It parses CLI arguments and routes them to the appropriate module (Chat, Terminal, or Simple Ask).
- **`src/ai.js`**: Handles the direct communication with the `@google/generative-ai` SDK. It initializes the model and manages the prompt-response cycle.
- **`src/utils/context.js`**: Contains the logic for recursively reading directories and files. It includes a "smart skip" mechanism to avoid reading huge binary files or dependency folders that would clutter the AI's context.
- **`src/terminal.js`**: A unique module that translates natural language into shell commands. It includes a safety-first execution loop that asks for user permission before running any generated command.
- **`src/utils/formatter.js`**: A custom text parser that converts standard Markdown (like code blocks and bold text) into `chalk`-styled terminal output, making the AI's response highly readable.

---

## 📦 Installation

To use Get Response Lite, ensure you have [Node.js](https://nodejs.org/) installed. Install it globally via npm:

```sh
npm i get-response-lite -g
```

---

## 🛠 Usage & Examples

### Basic Question
```sh
npx ai "How does asymmetric encryption work?"
```

### With File Context
```sh
npx ai "Optimize this function" -f ./src/utils/formatter.js
```

### With Directory Context
```sh
npx ai "Explain the architecture of this project" -d ./src
```

### Interactive Chat Mode
```sh
npx ai -c
```
*Note: You can combine `-c` with `-f` or `-d` to start a chat session with pre-loaded context.*

### Terminal Automation
```sh
npx ai "Find all .js files and count the lines of code" -t
```

---

## ⚙ How It Works (The Logic Flow)

1. **Initialization**: On startup, the tool checks for updates using `latest-version` and initializes the Google Generative AI model using a base64-secured API key.
2. **Context Gathering**: If `-f` or `-d` is used, the system reads the targeted files, strips out irrelevant data (using `isSkippable`), and bundles the content into a context block.
3. **Prompting**: The user's question is combined with the gathered context and sent to the Gemini model.
4. **Formatting**: The raw markdown response from the AI is passed through the `textFormat` utility, which applies colors, italics, and code block styling.
5. **Execution (Terminal Mode)**: If in terminal mode, the AI's response is parsed into individual shell commands. The tool then iterates through these commands, prompting the user for `(y/n)` permission before each execution.

---

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features or bug fixes, feel free to:
1. Open an issue on the [Get Response Repo](https://github.com/Swpn0neel/get-response).
2. Submit a pull request with your improvements.

## 📄 License & Credits

- **Author**: Swapnoneel Saha ([@swapnoneel123](https://www.swapnoneel.site))
- **License**: CC-BY-NC-SA-3.0
- **Main Package**: [get-response](https://www.npmjs.com/package/get-response)

---
*Built with ❤️ for terminal lovers.*
