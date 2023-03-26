import axios from "axios";
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const generateText = async (prompt) => {
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
