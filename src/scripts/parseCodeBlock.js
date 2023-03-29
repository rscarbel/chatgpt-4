export const parseCodeBlock = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const codeBlocks = doc.querySelectorAll("code");
  codeBlocks.forEach((codeBlock) => {
    const codeBlockText = codeBlock.innerHTML;
    const componentWords = codeBlockText.split(" ");
    const isOneWord = componentWords.length === 1;
    if (isOneWord) {
      codeBlock.classList.add("code-small");
    }
    const modifiedText = componentWords.join(" ");
    codeBlock.innerHTML = modifiedText;
  });
  return doc.body.innerHTML;
};
