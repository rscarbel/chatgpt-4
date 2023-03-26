import { GPT_MODELS, GPT_MAX_TOKENS } from "./constants";
import axios from "axios";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const generateText = async ({
  prompt,
  temperature = 0.7,
  max_tokens = 1500,
  gptVersion = GPT_MODELS[0],
}) => {
  const validation = validate(prompt, max_tokens, gptVersion);
  if (validation?.error) {
    return validation;
  }

  try {
    const response = await axios.post(
      `https://api.openai.com/v1/engines/${gptVersion}/completions`,
      {
        prompt: prompt,
        temperature: temperature,
        max_tokens: max_tokens,
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
    };
  }
}

function validatePrompt(prompt) {
  if (prompt.length < 2) {
    return {
      error: true,
      message: "Prompt is too short. Please don't waste API calls.",
    };
  }
}

function validateMaxTokens(max_tokens, gptVersion) {
  if (max_tokens > GPT_MAX_TOKENS[gptVersion]) {
    return {
      error: true,
      message: `Max tokens is too high. Please use a value less than ${GPT_MAX_TOKENS[gptVersion]}`,
    };
  }
}
