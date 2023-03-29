import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { TextInputBox } from "./TextInputBox";
import "@testing-library/jest-dom/extend-expect";

jest.useFakeTimers();

describe("TextInputBox", () => {
  const handleChange = jest.fn();
  const value = "test input";
  const index = 0;

  it("should change the height of the textarea as the user types", () => {
    render(
      <TextInputBox value={value} onChange={handleChange} index={index} />
    );

    const textarea = screen.getByRole("textbox");

    const initialHeight = textarea.style.height;
    expect(initialHeight).toBe("61px");

    fireEvent.change(textarea, { target: { value: "typing some text" } });
    act(() => {
      jest.runAllTimers();
    });

    expect(textarea.style.height).not.toBe(initialHeight);
    expect(handleChange).toHaveBeenCalled();
  });

  it("should render in read-only mode when specified", () => {
    const text = "Hello, world!";
    render(<TextInputBox text={text} isReadOnly />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveAttribute("readonly");
  });
});
