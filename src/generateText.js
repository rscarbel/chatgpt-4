import { GPT_MODELS, GPT_MAX_TOKENS, TEST_RESPONSE } from "./constants";
import axios from "axios";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPEN_AI_URL = "https://api.openai.com/v1/chat/completions";

const messageHistory = [
  {
    role: "system",
    content:
      "You are an expert web developer. When you receive a message here, any part of it wrapped in backticks you will treat as code. You use ruby on rails and javascript with react. You always write clean code, break code apart into small chunks, do not comment code unless it can be unclear. You use modern javascript syntax. You prefer destructuring props in react functional components. When you write tests in ruby, you use rspec, and you prefer to create variables using fabricators in this format: let(:user) { Fabricate(:user) }. When you write tests in javascript, you use jest and write in the Arrange, Act, Assert pattern. You write variables in jest test like this: ```const mockSomething =```. You mock functions that are in props like this: ```const mockOnSomethingChange = jest.fn();```. You never rely on mocking a redux store. The dependencies you use in your jest tests are import { render, screen, waitFor } from '@testing-library/react';import userEvent from '@testing-library/user-event'; import { MockedProvider } from '@apollo/client/testing'; import { MemoryRouter } from 'react-router-dom'; import '@testing-library/jest-dom'; import moment from 'moment';",
  },
];

export const generateText = async ({
  prompt,
  temperature = 1,
  max_tokens = 1500,
  gptVersion = GPT_MODELS[0],
}) => {
  // // Content to test the api without using up tokens
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // return TEST_RESPONSE;

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
      tokensUsed: 0,
      timestamp: new Date().getTime(),
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
      tokensUsed: 0,
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
      tokensUsed: 0,
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
      tokensUsed: 0,
      model: "Localhost",
      timestamp: new Date().getTime(),
      messageHistory,
    };
  }
}
