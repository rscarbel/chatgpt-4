export const parseCodeBlock = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const codeBlocks = doc.querySelectorAll("code");
  codeBlocks.forEach((codeBlock) => {
    const codeBlockText = codeBlock.innerHTML;
    const componentWords = codeBlockText.split(" ");
    if (componentWords.length === 1) {
      codeBlock.classList.add("code-small");
    }
    if (componentWords[0] === "javascript") {
      for (let i = 0; i < componentWords.length; i++) {
        const word = componentWords[i];
        if (word.endsWith(";")) {
          componentWords[i] += "<br>";
          continue;
        }
        if (word === "{") {
          componentWords[i] += "<br>&nbsp;&nbsp;";
          continue;
        }
        if (word === "}") {
          componentWords[i] = "<br>&nbsp;&nbsp;}";
          continue;
        }
      }
    }
    codeBlock.innerHTML = componentWords.join(" ");
  });

  return doc.body.innerHTML;
};
