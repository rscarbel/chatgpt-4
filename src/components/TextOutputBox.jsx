import React from "react";

export const TextOutputBox = ({ response, model, timestamp, tokensUsed }) => {
  const classStyling = response.error
    ? "text-output-container-error small-shadow"
    : "text-output-container small-shadow";
  return (
    <div className="output">
      <span className="speaker">
        {model} {new Date(timestamp).toTimeString()}
      </span>
      <div className={classStyling}>
        <p>{response}</p>
      </div>
      <div className="request-cost">Cost of request: {tokensUsed}</div>
    </div>
  );
};
