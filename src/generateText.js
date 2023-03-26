import { GPT_MODELS, GPT_MAX_TOKENS, TEST_RESPONSE } from "./constants";
import axios from "axios";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPEN_AI_URL = "https://api.openai.com/v1/chat/completions";

const messageHistory = [
  {
    role: "system",
    content:
      "You are an expert web developer. When you receive a message here, any part of it wrapped in backticks you will treat as code. You use ruby on rails and javascript with react. You always write clean code, break code apart into small chunks, do not comment code unless it can be unclear. When you write tests, you use rspec, and you prefer to create variables using fabricators in this format: let(:user) { Fabricate(:user) }.",
  },
];

export const generateText = async ({
  prompt,
  temperature = 1,
  max_tokens = 1500,
  gptVersion = GPT_MODELS[0],
}) => {
  return TEST_RESPONSE;

  const validation = validate(prompt, max_tokens, gptVersion);
  if (validation?.error) {
    return validation;
  }

  messageHistory.push({
    role: "user",
    content: prompt,
  });

  try {
    const response = await axios.post(
      OPEN_AI_URL,
      {
        model: gptVersion,
        messages: messageHistory,
        temperature: temperature,
        max_tokens: max_tokens,
        user: "Ryan's App",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    const responseMessage = response?.data?.choices[0]?.message?.content;

    messageHistory.push({
      role: "assistant",
      content: responseMessage,
    });

    return {
      error: false,
      message: responseMessage,
      tokensUsed: response?.data?.usage?.total_tokens,
      model: response?.data?.model,
      timestamp: response?.data?.created,
    };
  } catch (error) {
    return {
      error: true,
      message: `Error generating response: ${error?.message}`,
      model: "Localhost",
    };
  }
};

function validate(prompt, max_tokens, gptVersion) {
  const gptVersionValidation = validateGptVersion(gptVersion);
  if (gptVersionValidation?.error) {
    return gptVersionValidation;
  }

  const promptValidation = validatePrompt(prompt);
  if (promptValidation?.error) {
    return promptValidation;
  }

  const maxTokensValidation = validateMaxTokens(max_tokens, gptVersion);
  if (maxTokensValidation?.error) {
    return maxTokensValidation;
  }
}

function validateGptVersion(gptVersion) {
  if (!GPT_MODELS.includes(gptVersion)) {
    return {
      error: true,
      message: `Invalid GPT version. Please use one of the following: ${GPT_MODELS.join(
        ", "
      )}`,
      tokensUsed: 10,
      model: "Localhost",
      timestamp: new Date().getTime(),
      messageHistory,
    };
  }
}

function validatePrompt(prompt) {
  if (prompt.length < 2) {
    return {
      error: true,
      message: "Prompt is too short. Please don't waste API calls.",
      tokensUsed: 10,
      model: "Localhost",
      timestamp: new Date().getTime(),
      messageHistory,
    };
  }
}

function validateMaxTokens(max_tokens, gptVersion) {
  if (max_tokens > GPT_MAX_TOKENS[gptVersion]) {
    return {
      error: true,
      message: `Max tokens is too high. Please use a value less than ${GPT_MAX_TOKENS[gptVersion]}`,
      tokensUsed: 10,
      model: "Localhost",
      timestamp: new Date().getTime(),
      messageHistory,
    };
  }
}
