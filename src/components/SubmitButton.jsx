import React from "react";
import { send, wait } from "../icons";

export const SubmitButton = ({ onClick, index, disabled }) => {
  const text = disabled ? "Generating..." : "Generate Response";
  const handleClick = () => {
    if (!disabled) {
      onClick(index);
    }
  };
  const buttonClass = disabled ? "button-disabled" : "";
  const buttonIcon = disabled ? wait : send;
  return (
    <button className={buttonClass} onClick={handleClick} disabled={disabled}>
      <span>{text}</span>
      <span className="button-icon">{buttonIcon}</span>
    </button>
  );
};
