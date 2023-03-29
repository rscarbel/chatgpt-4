import React, { useState } from "react";
import { generateText } from "./generateText";
import { SubmitButton } from "./components/SubmitButton";
import { Toolbar } from "./components/Toolbar";
import { ChatContainer } from "./components/ChatContainer";
import { GPT_MODELS, DEFAULT_MAX_TOKENS, GPT_COST_PER_1000 } from "./constants";
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
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  const handleInputChange = (value) => {
    const newConversations = [...conversations];
    newConversations[currentIndex].input = value;
    setConversations([...newConversations]);
  };

  const updateCost = (tokensUsed, model) => {
    const cost = (tokensUsed / 1000) * GPT_COST_PER_1000[model];
    setTotalCost(totalCost + cost);
  };

  const handleGenerateResponse = async () => {
    setLoading(true);
    const prompt = conversations[currentIndex].input;
    const response = await generateText({
      prompt,
      gptVersion: model,
      maxTokens,
      temperature,
    });
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
    setLoading(false);
    updateCost(tokensUsed, model);
    setTotalTokensUsed(totalTokensUsed + tokensUsed);
  };
  const toolbarClassName = collapsed ? "toolbar-collapsed" : "toolbar";

  return (
    <div className="App">
      <div className={toolbarClassName}>
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
          cost={totalCost}
        />
      </div>
      <ChatContainer
        conversations={conversations}
        currentIndex={currentIndex}
        loading={loading}
        handleInputChange={handleInputChange}
        isToolbarHidden={collapsed}
      />
      <SubmitButton
        onClick={handleGenerateResponse}
        currentIndex={currentIndex}
        disabled={loading}
      />
    </div>
  );
};

export default App;
