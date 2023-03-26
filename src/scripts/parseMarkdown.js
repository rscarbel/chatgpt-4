import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import { parseCodeBlock } from "./parseCodeBlock";

const md = new MarkdownIt({
  highlight: function (str, lang) {
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return (
      '<pre class="hljs"><code>' +
      hljs.highlight(str, { language }).value +
      "</code></pre>"
    );
  },
});

export const parseMarkdown = (markdown) => {
  const parsedMarkdown = md.render(markdown);
  const parsedCodeBlocks = parseCodeBlock(parsedMarkdown);
  return parsedCodeBlocks;
};
