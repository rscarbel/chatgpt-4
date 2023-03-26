import React from "react";

export const TextOutputBox = ({ response }) => {
  const classStyling = response.error
    ? "text-output-container-error small-shadow"
    : "text-output-container small-shadow";
  return (
    <div className="output">
      <span className="speaker">GPT-4:</span>
      <div className={classStyling}>
        <p>{response.message}</p>
      </div>
    </div>
  );
};
