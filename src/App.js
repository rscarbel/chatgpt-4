import React, { useState } from "react";
import { generateText } from "./generateText";
import { TextInputBox } from "./components/TextInputBox";
import { TextOutputBox } from "./components/TextOutputBox";
import { SubmitButton } from "./components/SubmitButton";
import { Toolbar } from "./components/Toolbar";
import { GPT_MODELS, DEFAULT_MAX_TOKENS } from "./constants";
import "./App.css";

const App = () => {
  const [conversations, setConversations] = useState([
    {
      input: "",
      output: {
        error: false,
        message: "",
        timestamp: "",
        modelUsed: "",
        tokensUsed: "",
      },
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [model, setModel] = useState(GPT_MODELS[0]);
  const [maxTokens, setMaxTokens] = useState(DEFAULT_MAX_TOKENS);
  const [temperature, setTemperature] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const [totalTokensUsed, setTotalTokensUsed] = useState(0);
  const [messageHistory, setMessageHistory] = useState([]);

  const handleInputChange = (value) => {
    const newConversations = [...conversations];
    newConversations[currentIndex].input = value;
    setConversations([...newConversations]);
  };

  const handleGenerateResponse = async () => {
    const prompt = conversations[currentIndex].input;
    const response = await generateText({
      prompt,
      model,
      maxTokens,
      temperature,
    });
    setMessageHistory(response.messageHistory);
    const tokensUsed = response.tokensUsed;
    const newConversations = [...conversations];
    newConversations[currentIndex].output = {
      error: response.error,
      message: response.message,
      timestamp: response.timestamp,
      modelUsed: response.model,
      tokensUsed,
    };
    newConversations.push({
      input: "",
      output: { message: "", timestamp: "", modelUsed: "", tokensUsed: "" },
    });
    setConversations([...newConversations]);
    setCurrentIndex(currentIndex + 1);
    setTotalTokensUsed(totalTokensUsed + tokensUsed);
  };

  return (
    <div className="App">
      {console.log(messageHistory)}
      <Toolbar
        model={model}
        setModel={setModel}
        maxTokens={maxTokens}
        setMaxTokens={setMaxTokens}
        temperature={temperature}
        setTemperature={setTemperature}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        tokensUsed={totalTokensUsed}
      />
      <div className={`chat-container ${collapsed ? "no-margin" : ""}`}>
        {conversations.map((conversation, index) => (
          <div key={index}>
            <TextInputBox
              value={conversation.input}
              onChange={(e) => {
                handleInputChange(e.target.value);
              }}
              isReadOnly={index !== currentIndex}
            />
            {conversation.output.message && (
              <TextOutputBox
                model={conversation.output.modelUsed}
                response={conversation.output.message}
                timestamp={conversation.output.timestamp}
                tokensUsed={conversation.output.tokensUsed}
              />
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
