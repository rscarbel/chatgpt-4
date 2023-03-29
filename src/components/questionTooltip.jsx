import React from "react";
import { information } from "../icons";

export const QuestionTooltip = ({ answer, isHidden }) => {
  return isHidden ? null : (
    <div className={`question-tooltip-container`}>
      {information}
      <div className="question-tooltip-text">{answer}</div>
    </div>
  );
};
