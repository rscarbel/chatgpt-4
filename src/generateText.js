import {
  GPT_MODELS,
  TEST_RESPONSE,
  DEFAULT_MAX_TOKENS,
  OPEN_AI,
} from "./constants";
import axios from "axios";
const API_KEY = process.env.OPENAI_API_KEY;
const OPEN_AI_URL = "https://api.openai.com/v1/chat/completions";

const messageHistory = [
  {
    role: "system",
    content: `You are a helpful chatbot that parses a resume and returns the data from it in JSON format. The JSON format should be the fields listed here. If there is no possible way to fill in the content, make the field an empty string. Return the parsed resume in the following JSON format:
    {
      "linkedin_url": "",
      "postal_code": "",
      "city": "",
      "country": "",
      "region_name": "", #state or province
      "is_willing_to_relocate": "",
      "availability": "", # "ASAP", "With notice", or "By a certain date" --> default "With Notice"
      "education_history": [{
        "college_name": "",
        "degree_major": "",
        "month_start": "", #lowercase full month name
        "year_start": "", #integer
        "month_end": "", #lowercase full month name
        "year_end": "", #integer
        "is_still_in_school_here": "", # true or false
      }],
      work_history: {
        total_years_of_experience: "",
        [{
          "title": "",
          "company_name": "",
          "month_start": "", #lowercase full month name
          "month_end": "", #lowercase full month name
          "year_start": "", #integer
          "year_end": "", #integer
          "still_works_here": "",
        }],
      },
      "occupation_field_category": "", 
      "primary_skills": [], # no more than 5
      "secondary_skills": [], # no more than 5
      "one_line_summary": "", # one sentence summary
    }
    `,
  },
];

export const generateText = async ({
  prompt,
  temperature = 0.3,
  responseFormat = "json_object",
  gptVersion = GPT_MODELS[0],
}) => {
  const max_tokens = DEFAULT_MAX_TOKENS - prompt.length;

  messageHistory.push({
    role: "user",
    content: prompt,
  });

  try {
    const response = await OPEN_AI.chat.completions.create({
      model: gptVersion,
      response_format: { type: responseFormat },
      messages: messageHistory,
      temperature: temperature,
      max_tokens: max_tokens,
      user: "Resume Parser",
    });

    const responseMessage = response?.choices[0]?.message?.content;
    console.log(response);
    const parsedMessage = JSON.stringify(JSON.parse(responseMessage), null, 2);

    messageHistory.push({
      role: "assistant",
      content: responseMessage,
    });

    return {
      error: false,
      message: parsedMessage,
      tokensUsed: response?.usage?.total_tokens,
      model: response?.model,
      timestamp: response?.created,
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
