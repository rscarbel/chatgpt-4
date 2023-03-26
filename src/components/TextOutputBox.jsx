import React from "react";

export const TextOutputBox = ({ response, model = "ChatGPT" }) => {
  const classStyling = response.error
    ? "text-output-container-error small-shadow"
    : "text-output-container small-shadow";
  return (
    <div className="output">
      <span className="speaker">{model}</span>
      <div className={classStyling}>
        <p>{response.message}</p>
      </div>
    </div>
  );
};
