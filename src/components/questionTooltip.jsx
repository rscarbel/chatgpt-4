import React from "react";
import { information } from "../icons";

export const QuestionTooltip = ({ answer, isHidden }) => {
  const hiddenClass = isHidden ? "hidden" : "";
  return (
    <div className={`question-tooltip-container ${hiddenClass}`}>
      {information}
      <div className="question-tooltip-text">{answer}</div>
    </div>
  );
};
