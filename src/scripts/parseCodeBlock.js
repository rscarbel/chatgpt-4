import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";

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
      const language = componentWords[0];
      const code = componentWords.slice(1).join(" ");
      codeBlock.innerHTML = hljs.highlight(language, code).value;
    }
  });

  if (isJavascript) return addLineBreaksAndClasses(doc.body.innerHTML);

  return doc.body.innerHTML;
};
