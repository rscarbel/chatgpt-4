export const GPT_MAX_TOKENS = {
  "gpt-3.5-turbo": 2049,
  "gpt-4": 4097,
};

export const GPT_MODELS = Object.keys(GPT_MAX_TOKENS);

export const DEFAULT_MAX_TOKENS = 1500;

export const ROLES = ["user", "assistant", "system"];


export const TEST_RESPONSE = {
  error: false,
  message:
    "To parse Markdown in JavaScript, you can use an external library like `markdown-it`. Here's a simple example of how to use it: 1. Install the library via npm or yarn: ```sh npm install markdown-it ``` or ```sh yarn add markdown-it ``` 2. Import the library and create an instance: ```javascript import MarkdownIt from 'markdown-it'; const md = new MarkdownIt(); ``` 3. Define a basic function to display code wrapped in triple backticks: ```javascript function parseMarkdown(input) { const html = md.render(input); const div = document.createElement(\"div\"); div.innerHTML = html; document.body.appendChild(div); } ``` This function renders the input Markdown string into HTML and appends it to the DOM. For code highlighting in the pretty format, you can extend `markdown-it` with the `markdown-it-prism` plugin. 4. Install the Prism.js library and its Markdown-It plugin: ```sh npm install prismjs markdown-it-prism ``` or ```sh yarn add prismjs markdown-it-prism ``` 5. Import the libraries and configure the `markdown-it` instance: ```javascript import MarkdownIt from 'markdown-it'; import Prism from 'prismjs'; import 'prismjs/themes/prism-tomorrow.css'; // Choose a theme for syntax highlighting import loadLanguages from 'prismjs/components/index.js'; import mdPrism from 'markdown-it-prism'; // Load additional languages for syntax highlighting loadLanguages(['ruby', 'javascript']); const md = new MarkdownIt().use(mdPrism); ``` Now the `parseMarkdown` function should display code within triple backticks in a pretty IDE-like format using the chosen Prism.js theme.",
  timestamp: "1679852278537",
  modelUsed: "gpt-3.5-turbo",
  tokensUsed: 42,
};

export const EXAMPLE_RESPONSE = {
  id: "chatcmpl-6yOxqS7zf3TNFf4VtqIoHnlntjiBl",
  object: "chat.completion",
  created: 1679853662,
  model: "gpt-4-0314",
  usage: {
    prompt_tokens: 147,
    completion_tokens: 369,
    total_tokens: 516,
  },
  choices: [
    {
      message: {
        role: "assistant",
        content:
          "To parse Markdown in JavaScript, you can use an external library like `markdown-it`. Here's a simple example of how to use it:\n\n1. Install the library via npm or yarn:\n\n```sh\nnpm install markdown-it\n```\n\nor\n\n```sh\nyarn add markdown-it\n```\n\n2. Import the library and create an instance:\n\n```javascript\nimport MarkdownIt from 'markdown-it';\n\nconst md = new MarkdownIt();\n```\n\n3. Define a basic function to display code wrapped in triple backticks:\n\n```javascript\nfunction parseMarkdown(input) {\n  const html = md.render(input);\n  \n  const div = document.createElement(\"div\");\n  div.innerHTML = html;\n  document.body.appendChild(div);\n}\n```\n\nThis function renders the input Markdown string into HTML and appends it to the DOM. For code highlighting in the pretty format, you can extend `markdown-it` with the `markdown-it-prism` plugin.\n\n4. Install the Prism.js library and its Markdown-It plugin:\n\n```sh\nnpm install prismjs markdown-it-prism\n```\n\nor\n\n```sh\nyarn add prismjs markdown-it-prism\n```\n\n5. Import the libraries and configure the `markdown-it` instance:\n\n```javascript\nimport MarkdownIt from 'markdown-it';\nimport Prism from 'prismjs';\nimport 'prismjs/themes/prism-tomorrow.css'; // Choose a theme for syntax highlighting\nimport loadLanguages from 'prismjs/components/index.js';\nimport mdPrism from 'markdown-it-prism';\n\n// Load additional languages for syntax highlighting\nloadLanguages(['ruby', 'javascript']);\n\nconst md = new MarkdownIt().use(mdPrism);\n```\n\nNow the `parseMarkdown` function should display code within triple backticks in a pretty IDE-like format using the chosen Prism.js theme.",
      },
      finish_reason: "stop",
      index: 0,
    },
  ],
};

