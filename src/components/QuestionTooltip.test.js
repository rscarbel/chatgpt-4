import { render, screen } from "@testing-library/react";
import { QuestionTooltip } from "./QuestionTooltip";
import "@testing-library/jest-dom/extend-expect";

describe("QuestionTooltip", () => {
  it("should render the tooltip text when not hidden", () => {
    const answer = "This is the answer to the question";
    const isHidden = false;
    render(<QuestionTooltip answer={answer} isHidden={isHidden} />);
    const tooltipText = screen.getByText(answer);
    expect(tooltipText).toBeInTheDocument();
  });

  it("should not render the tooltip text when hidden", () => {
    const answer = "This is the answer to the question";
    const isHidden = true;
    render(<QuestionTooltip answer={answer} isHidden={isHidden} />);
    const tooltipText = screen.queryByText(answer);
    expect(tooltipText).not.toBeInTheDocument();
  });
});
