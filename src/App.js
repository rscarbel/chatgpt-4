import React, { useState } from "react";
import axios from "axios";
import { debounce } from "lodash";
import "./App.css";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const generateText = async (prompt) => {
  if (prompt.length < 2) {
    return {
      error: true,
      message: "Prompt is too short. Please don't waste API calls.",
    };
  }
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    return { error: false, message: response?.data?.choices[0]?.text };
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: `Error generating response: ${error?.message}`,
    };
  }
};

const TextInputBox = ({ isReadOnly = false, value, onChange }) => {
  const [height, setHeight] = useState(61);

  const detectTextHeight = debounce(() => {
    const textArea = document.getElementById("text-input-area");
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
        id="text-input-area"
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

const TextOutputBox = ({ response }) => {
  const classStyling = response.error
    ? "text-output-container-error small-shadow"
    : "text-output-container small-shadow";
  return (
    <div className="output">
      <span className="speaker">GPT-4:</span>
      <div className={classStyling}>
        <p>{response.message}</p>
      </div>
    </div>
  );
};

const SubmitButton = ({ onClick, index }) => {
  return <button onClick={() => onClick(index)}>Generate Response</button>;
};

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
    const response = await generateText(prompt);
    const newConversations = [...conversations];
    newConversations[currentIndex].output = response;
    newConversations.push({ input: "", output: "" });
    setConversations(newConversations);
    setCurrentIndex(currentIndex + 1);
  };

  return (
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
  );
};

export default App;
