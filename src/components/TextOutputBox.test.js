import { render } from "@testing-library/react";
import { TextOutputBox } from "../components/TextOutputBox";
import "@testing-library/jest-dom";

describe("TextOutputBox", () => {
  const response = "Hello, world!";
  const model = "TestModel";
  const timestamp = "1648413000000";
  const tokensUsed = "10";

  it("renders the speaker's name and timestamp correctly", () => {
    const { getByText } = render(
      <TextOutputBox
        response={response}
        model={model}
        timestamp={timestamp}
        tokensUsed={tokensUsed}
        error={false}
      />
    );
    const speaker = getByText(`${model} 4:30 PM UTC`);
    expect(speaker).toBeInTheDocument();
  });

  it("renders the response content correctly", () => {
    const { getByText } = render(
      <TextOutputBox
        response={response}
        model={model}
        timestamp={timestamp}
        tokensUsed={tokensUsed}
        error={false}
      />
    );
    const responseContent = getByText("Hello, world!");
    expect(responseContent).toBeInTheDocument();
  });

  it("renders the tokens used correctly", () => {
    const { getByText } = render(
      <TextOutputBox
        response={response}
        model={model}
        timestamp={timestamp}
        tokensUsed={tokensUsed}
        error={false}
      />
    );
    const tokensUsedText = getByText("Tokens used in request: 10");
    expect(tokensUsedText).toBeInTheDocument();
  });

  it("applies the correct class styling when there is an error in the response", () => {
    const { container } = render(
      <TextOutputBox
        error={true}
        response={response}
        model={model}
        timestamp={timestamp}
        tokensUsed={tokensUsed}
      />
    );
    const textOutputContainer = container.querySelector(
      ".text-output-container-error"
    );
    expect(textOutputContainer).toHaveClass("text-output-container-error");
  });

  it("applies the correct class styling when there is no error in the response", () => {
    const { container } = render(
      <TextOutputBox
        response={response}
        model={model}
        timestamp={timestamp}
        tokensUsed={tokensUsed}
        error={false}
      />
    );
    const textOutputContainer = container.querySelector(
      ".text-output-container"
    );
    expect(textOutputContainer).toHaveClass("text-output-container");
  });
});
