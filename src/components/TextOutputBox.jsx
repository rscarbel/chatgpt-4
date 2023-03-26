import React from "react";
import { marked } from "marked";

function formatTime(dateItem) {
  const date = new Date(dateItem);
  const hours = date.getHours();
  let minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${minutes} ${amPm}`;
}

const parseHtml = (html) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const codeBlocks = doc.querySelectorAll("code");
  codeBlocks.forEach((codeBlock) => {
    const codeBlockText = codeBlock.innerHTML;
    const codeBlockTextArray = codeBlockText.split(";");
    const codeBlockTextWithLineBreaks = codeBlockTextArray.join(";<br>");
    codeBlock.innerHTML = codeBlockTextWithLineBreaks;
  });
  return doc.body.innerHTML;
};

export const TextOutputBox = ({ response, model, timestamp, tokensUsed }) => {
  const classStyling = response.error
    ? "text-output-container-error small-shadow"
    : "text-output-container small-shadow";

  const htmlContent = marked(response);
  const parsedHTML = parseHtml(htmlContent);

  return (
    <div className="output">
      <span className="speaker">
        {model} {formatTime(timestamp)}
      </span>
      <div className={classStyling}>
        <p dangerouslySetInnerHTML={{ __html: parsedHTML }}></p>
      </div>
      <div className="request-cost">Cost of request: {tokensUsed}</div>
    </div>
  );
};
