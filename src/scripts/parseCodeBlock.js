import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

const languages = [
  "ruby",
  "javascript",
  "python",
  "java",
  "c#",
  "php",
  "sh",
  "html",
  "perl",
  "go",
  "rust",
  "c++",
  "c",
  "html",
  "css",
  "xml",
  "bash",
  "json",
  "typescript",
  "swift",
  "kotlin",
  "scala",
  "coffeescript",
  "clojure",
  "lua",
  "matlab",
  "r",
  "sql",
  "yaml",
  "diff",
  "dockerfile",
  "makefile",
  "markdown",
  "nginx",
  "powershell",
];

const addLineBreaksAndClasses = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const codeBlocks = doc.querySelectorAll("code");
  codeBlocks.forEach((codeBlock) => {
    if (codeBlock.classList.contains("code-small")) return;
    const codeBlockText = codeBlock.innerHTML;
    const componentWords = codeBlockText.split(" ");
    for (let i = 0; i < componentWords.length; i++) {
      const word = componentWords[i];
      if (word.endsWith(";")) {
        componentWords[i] += "<br>";
      }
    }
    codeBlock.innerHTML = componentWords.join(" ");
  });

  return doc.body.innerHTML;
};

export const parseCodeBlock = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const codeBlocks = doc.querySelectorAll("code");
  let isJavascript = false;
  codeBlocks.forEach((codeBlock) => {
    const codeBlockText = codeBlock.innerHTML;
    const componentWords = codeBlockText.split(" ");
    const isOneWord = componentWords.length === 1;
    if (isOneWord) {
      codeBlock.classList.add("code-small");
    }
    if (!isOneWord && componentWords[0] === "javascript") {
      isJavascript = true;
    }
    const modifiedText = componentWords.join(" ");
    if (isOneWord) {
      codeBlock.innerHTML = modifiedText;
    } else {
      const language = languages.includes(componentWords[0].toLocaleLowerCase())
        ? componentWords[0]
        : null;
      const code = language ? componentWords.slice(1).join(" ") : modifiedText;
      if (language) {
        codeBlock.innerHTML = hljs.highlight(language, code).value;
      } else {
        codeBlock.innerHTML = hljs.highlightAuto(code).value;
      }
    }
  });

  if (isJavascript) return addLineBreaksAndClasses(doc.body.innerHTML);

  return doc.body.innerHTML;
};
