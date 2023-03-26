import React from "react";
import { send } from "../icons";

export const SubmitButton = ({ onClick, index }) => {
  return (
    <button onClick={() => onClick(index)}>
      <span>Generate Response</span>
      <span className="button-icon">{send}</span>
    </button>
  );
};
