import React from "react";
import { parseMarkdown } from "../scripts/parseMarkdown";

const formatTime = (dateItem) => {
  const date = new Date(dateItem);
  const hours = date.getHours();
  let minutes = date.getMinutes();
  const amPm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return `${formattedHours}:${minutes} ${amPm} UTC`;
};

export const TextOutputBox = ({
  response = "",
  model = "localhost",
  timestamp = new Date().getTime(),
  tokensUsed = 0,
  error = false,
}) => {
  const classStyling = error
    ? "text-output-container-error small-shadow"
    : "text-output-container small-shadow";

  const htmlContent = parseMarkdown(response);

  return (
    <div className="output">
      <span className="speaker">
        {model} {formatTime(parseInt(timestamp))}
      </span>
      <div className={classStyling}>
        <p dangerouslySetInnerHTML={{ __html: htmlContent }}></p>
      </div>
      <div className="request-cost">Tokens used in request: {tokensUsed}</div>
    </div>
  );
};
