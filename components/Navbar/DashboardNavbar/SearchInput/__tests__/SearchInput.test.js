import { render, screen, fireEvent } from "@testing-library/react";

import SearchInput from "../SearchInput";

describe("Search input", () => {
  it("should render the SearchInput", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText(/find a person.../i);
    expect(input).toBeInTheDocument();
  });

  it("should update the search input value with user entry", () => {
    render(<SearchInput />);
    const input = screen.getByPlaceholderText(/find a person.../i);
    fireEvent.change(input, { target: { value: "john" } });
    expect(input.value).toBe("john");
  });
});
