import { render, screen } from "@testing-library/react";
import ErrorBanner from "../ErrorBanner";
import "@testing-library/jest-dom";
describe("Error Banner", () => {
  it("should render the error banner component", () => {
    // ARRANGE
    render(<ErrorBanner message="This is an error" />);
    //ACT
    const paragraph = screen.getByText(/This is an error/i);
    // const paragraph = screen.getByTestId("errorBanner");
    //ASSERT
    expect(paragraph).toBeInTheDocument();
  });

  it("good check", () => {
    // ARRANGE
    render(<ErrorBanner message="Title" />);
    //ACT
    const paragraph = screen.getByText(/Title/i);
    // const paragraph = screen.getByTestId("errorBanner");
    //ASSERT
    expect(paragraph).toBeInTheDocument();
  });
});
