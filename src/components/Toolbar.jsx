import React from "react";
import { chevronDown, chevronUp } from "../icons";
import { QuestionTooltip } from "./questionTooltip";
import { GPT_MODELS, GPT_MAX_TOKENS, DEFAULT_MAX_TOKENS } from "../constants";

const MAX_TEMPERATURE = 2;

const maxTokensDescription =
  "Tokens can be thought of as pieces of words. Before the API processes the prompts, the input is broken down into tokens. These tokens are not cut up exactly where the words start or end - tokens can include trailing spaces and even sub-words. Roughly speaking, each word in english is about 4 tokens. The more tokens in a request and response, the more expensive the API call will be.";

const temperatureDescription =
  "The temperature parameter controls the randomness of the model. The higher the temperature, the more random the model will be.";

const trimCost = (cost) => {
  return Math.round(cost * 1000) / 1000;
};

export const Toolbar = ({
  model,
  setModel,
  maxTokens,
  setMaxTokens,
  temperature,
  setTemperature,
  collapsed,
  setCollapsed,
  tokensUsed,
  cost,
}) => {
  const handleModelChange = (event) => {
    const newModel = event.target.value;
    setModel(newModel);
    setMaxTokens(DEFAULT_MAX_TOKENS);
  };

  const handleMaxTokensChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= GPT_MAX_TOKENS[model]) {
      setMaxTokens(parseInt(value));
    }
  };

  const handleTemperatureChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= MAX_TEMPERATURE) {
      setTemperature(parseFloat(value));
    }
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const parameterClassNames = collapsed ? "parameter-collapsed" : "parameter";
  const hiddenClassName = collapsed ? "hidden" : "";
  const toolbarClassName = collapsed ? "toolbar-collapsed" : "toolbar";

  return (
    <>
      <div className={toolbarClassName}>
        <div className={parameterClassNames}>
          <label className={hiddenClassName} htmlFor="model-select">
            Model:
          </label>
          <select
            className={hiddenClassName}
            id="model-select"
            value={model}
            onChange={handleModelChange}
          >
            {GPT_MODELS.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className={parameterClassNames}>
          <label className={hiddenClassName} htmlFor="max-tokens-input">
            Max Tokens:
          </label>
          <input
            id="max-tokens-input"
            className={hiddenClassName}
            type="text"
            value={maxTokens}
            onChange={handleMaxTokensChange}
          />
          <input
            type="range"
            className={hiddenClassName}
            min="1"
            max={GPT_MAX_TOKENS[model]}
            value={maxTokens}
            onChange={(e) => setMaxTokens(parseInt(e.target.value))}
          />
          <QuestionTooltip answer={maxTokensDescription} isHidden={collapsed} />
        </div>
        <div className={parameterClassNames}>
          <label className={hiddenClassName} htmlFor="temperature-input">
            Temperature:
          </label>
          <input
            className={hiddenClassName}
            id="temperature-input"
            type="text"
            value={temperature}
            onChange={handleTemperatureChange}
          />
          <input
            className={hiddenClassName}
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
          <QuestionTooltip
            answer={temperatureDescription}
            isHidden={collapsed}
          />
        </div>
        <div className={parameterClassNames}>
          <label className={hiddenClassName}>Tokens Used: {tokensUsed}</label>
          <label className={hiddenClassName}>
            Total cost: ${trimCost(cost)}
          </label>
        </div>
        <div
          className={`collapse-icon${collapsed ? "-collapsed" : ""}`}
          onClick={handleCollapse}
        >
          {collapsed ? chevronDown : chevronUp}
        </div>
      </div>
    </>
  );
};
