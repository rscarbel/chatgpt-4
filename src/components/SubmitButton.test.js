import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { SubmitButton } from "./SubmitButton";
import "@testing-library/jest-dom/extend-expect";

describe("SubmitButton", () => {
  it("should render correctly", () => {
    const onClick = jest.fn();
    const index = 0;
    const disabled = false;
    render(
      <SubmitButton onClick={onClick} index={index} disabled={disabled} />
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Generate Response");
  });

  it("should disable the button and show a different text and icon when disabled", () => {
    const onClick = jest.fn();
    const index = 0;
    const disabled = true;
    render(
      <SubmitButton onClick={onClick} index={index} disabled={disabled} />
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("Generating...");
  });

  it("should call onClick function with index when clicked if not disabled", () => {
    const onClick = jest.fn();
    const index = 0;
    const disabled = false;
    render(
      <SubmitButton onClick={onClick} index={index} disabled={disabled} />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledWith(index);
  });

  it("should not call onClick function when clicked if disabled", () => {
    const onClick = jest.fn();
    const index = 0;
    const disabled = true;
    render(
      <SubmitButton onClick={onClick} index={index} disabled={disabled} />
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
