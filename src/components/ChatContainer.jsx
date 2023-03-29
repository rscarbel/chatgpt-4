import React from "react";
import { TextInputBox } from "./TextInputBox";
import { TextOutputBox } from "./TextOutputBox";

export const ChatContainer = ({
  conversations,
  currentIndex,
  loading,
  handleInputChange,
  isToolbarHidden,
}) => {
  const containerClass = isToolbarHidden ? "no-margin" : "large-top-margin";
  return (
    <div className={containerClass}>
      {conversations.map((conversation, index) => (
        <div key={index}>
          <TextInputBox
            value={conversation.input}
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
            isReadOnly={index !== currentIndex || loading}
            index={index}
          />
          {conversation.output.message && (
            <TextOutputBox
              model={conversation.output.modelUsed}
              response={conversation.output.message}
              timestamp={conversation.output.timestamp}
              tokensUsed={conversation.output.tokensUsed}
              error={conversation.output.error}
            />
          )}
        </div>
      ))}
    </div>
  );
};
