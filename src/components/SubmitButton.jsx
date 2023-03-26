import React from "react";

export const SubmitButton = ({ onClick, index }) => {
  return <button onClick={() => onClick(index)}>Generate Response</button>;
};
