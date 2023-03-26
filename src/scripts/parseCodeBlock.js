const LANGUAGES = [
  "javascript",
  "css",
  "ruby",
  "python",
  "java",
  "C",
  "C++",
  "C#",
  "PHP",
  "Go",
  "Rust",
  "Swift",
  "Kotlin",
  "Dart",
  "Scala",
  "Haskell",
  "R",
  "Julia",
  "MATLAB",
  "Perl",
  "Lua",
  "SQL",
  "Bash",
  "PowerShell",
  "TypeScript",
  "JSON",
  "YAML",
  "Markdown",
  "XML",
  "GraphQL",
  "Dockerfile",
  "Makefile",
  "CMake",
  "Bazel",
  "Gradle",
  "ApacheConf",
  "Nginx",
  "VimL",
  "Vim script",
];

export const parseCodeBlock = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const codeBlocks = doc.querySelectorAll("code");
  codeBlocks.forEach((codeBlock) => {
    const codeBlockText = codeBlock.innerHTML;
    const componentWords = codeBlockText.split(" ");
    let numberOfSpaces = 0;
    for (let i = 0; i < componentWords.length; i++) {
      const word = componentWords[i];
      if (LANGUAGES.includes(word)) {
        componentWords[i] += "<br>------------------------------------<br>";
      }
      if (word.endsWith(";")) {
        componentWords[i] += "<br>";
      }
      if (word === "{") {
        componentWords[i] += "<br>&nbsp;&nbsp;";
      }
      if (word === "}") {
        componentWords[i] = "<br>&nbsp;&nbsp;}";
      }
    }
    codeBlock.innerHTML = componentWords.join(" ");
  });
  return doc.body.innerHTML;
};
