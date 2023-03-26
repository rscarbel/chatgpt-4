import React from "react";
import { GPT_MODELS, GPT_MAX_TOKENS } from "../constants";

const chevronDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-chevron-down"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
    />
  </svg>
);

const chevronUp = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-chevron-up"
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
    />
  </svg>
);

export const Toolbar = ({
  model,
  setModel,
  maxTokens,
  setMaxTokens,
  temperature,
  setTemperature,
  collapsed,
  setCollapsed,
}) => {
  const handleModelChange = (event) => {
    const newModel = event.target.value;
    setModel(newModel);
    setMaxTokens(GPT_MAX_TOKENS[newModel]);
  };

  const handleMaxTokensChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value)) {
      setMaxTokens(value);
    }
  };

  const handleTemperatureChange = (event) => {
    const value = event.target.value;
    if (!isNaN(value) && value >= 0 && value <= 2) {
      setTemperature(value);
    }
  };

  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <div className={`toolbar${collapsed ? "-collapsed" : ""}`}>
        <div className={`parameter${collapsed ? "-collapsed" : ""}`}>
          <label
            className={`${collapsed ? "hidden" : ""}`}
            htmlFor="model-select"
          >
            Model:
          </label>
          <select
            className={`${collapsed ? "hidden" : ""}`}
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
        <div className={`parameter${collapsed ? "-collapsed" : ""}`}>
          <label
            className={`${collapsed ? "hidden" : ""}`}
            htmlFor="max-tokens-input"
          >
            Max Tokens:
          </label>
          <input
            id="max-tokens-input"
            className={`${collapsed ? "hidden" : ""}`}
            type="text"
            value={maxTokens}
            onChange={handleMaxTokensChange}
          />
          <input
            type="range"
            className={`${collapsed ? "hidden" : ""}`}
            min="1"
            max={GPT_MAX_TOKENS[model]}
            value={maxTokens}
            onChange={(e) => setMaxTokens(e.target.value)}
          />
        </div>
        <div className={`parameter${collapsed ? "-collapsed" : ""}`}>
          <label
            className={`${collapsed ? "hidden" : ""}`}
            htmlFor="temperature-input"
          >
            Temperature:
          </label>
          <input
            className={collapsed ? "hidden" : ""}
            id="temperature-input"
            type="text"
            value={temperature}
            onChange={handleTemperatureChange}
          />
          <input
            className={`${collapsed ? "hidden" : ""}`}
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </div>
      </div>
      <div
        className={`collapse-icon${collapsed ? "-collapsed" : ""}`}
        onClick={handleCollapse}
      >
        {collapsed ? chevronDown : chevronUp}
      </div>
    </>
  );
};
