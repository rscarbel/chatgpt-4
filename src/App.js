import React, { useState } from "react";
import { generateText } from "./generateText";
import { TextInputBox } from "./components/TextInputBox";
import { TextOutputBox } from "./components/TextOutputBox";
import { SubmitButton } from "./components/SubmitButton";
import { Toolbar } from "./components/Toolbar";
import "./App.css";

const App = () => {
  const [conversations, setConversations] = useState([
    { input: "", output: "" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleInputChange = (index, value) => {
    const newConversations = [...conversations];
    newConversations[index].input = value;
    setConversations(newConversations);
  };

  const handleGenerateResponse = async () => {
    const prompt = conversations[currentIndex].input;
    const response = await generateText({ prompt: prompt });
    const newConversations = [...conversations];
    newConversations[currentIndex].output = response;
    newConversations.push({ input: "", output: "" });
    setConversations(newConversations);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="App">
      <Toolbar />
      <div className="chat-container">
        {conversations.map((conversation, index) => (
          <div key={index}>
            <TextInputBox
              value={conversation.input}
              onChange={(e) => {
                handleInputChange(index, e.target.value);
                setCurrentIndex(index);
              }}
              isReadOnly={index !== currentIndex}
            />
            {conversation.output !== "" && (
              <TextOutputBox response={conversation.output} />
            )}
          </div>
        ))}
        <SubmitButton
          onClick={handleGenerateResponse}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};

export default App;
