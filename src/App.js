import React, { useState } from "react";
import { generateText } from "./generateText";
import { TextInputBox } from "./components/TextInputBox";
import { TextOutputBox } from "./components/TextOutputBox";
import { SubmitButton } from "./components/SubmitButton";
import { Toolbar } from "./components/Toolbar";
import { GPT_MODELS } from "./constants";
import "./App.css";

const App = () => {
  const [conversations, setConversations] = useState([
    { input: "", output: "" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [model, setModel] = useState(GPT_MODELS[0]);
  const [maxTokens, setMaxTokens] = useState(1500);
  const [temperature, setTemperature] = useState(1);
  const [collapsed, setCollapsed] = useState(false);

  const handleInputChange = (index, value) => {
    const newConversations = [...conversations];
    newConversations[index].input = value;
    setConversations(newConversations);
  };

  const handleGenerateResponse = async () => {
    const prompt = conversations[currentIndex].input;
    const response = await generateText({
      prompt,
      model,
      maxTokens,
      temperature,
    });
    const newConversations = [...conversations];
    newConversations[currentIndex].output = response;
    newConversations.push({ input: "", output: "" });
    setConversations(newConversations);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="App">
      <Toolbar
        model={model}
        setModel={setModel}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        temperature={temperature}
        setTemperature={setTemperature}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className={`chat-container ${collapsed ? "no-margin" : ""}`}>
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
              <TextOutputBox model={model} response={conversation.output} />
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
