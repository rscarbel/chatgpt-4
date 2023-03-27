import React, { useState } from "react";
import { debounce } from "lodash";

export const TextInputBox = ({
  isReadOnly = false,
  value,
  onChange,
  index,
}) => {
  const [height, setHeight] = useState(61);

  const detectTextHeight = debounce(() => {
    const textArea = document.getElementById(`text-input-area-${index}`);
    const currentHeight = textArea.style.height;
    textArea.style.height = "auto";
    const newHeight = textArea.scrollHeight;
    textArea.style.height = currentHeight;
    if (newHeight !== height) {
      setHeight(newHeight);
    }
  }, 300);

  return (
    <div className="text-input-container">
      <span className="speaker">You:</span>
      <textarea
        id={`text-input-area-${index}`}
        style={{ height: height }}
        value={value}
        onChange={(e) => {
          onChange(e);
          detectTextHeight();
        }}
        readOnly={isReadOnly}
      />
    </div>
  );
};
