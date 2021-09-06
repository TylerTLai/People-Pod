import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "../../../Modal/index";
import PersonForm from "../index";
import Button from "../../../Button/index";
import { Provider } from "react-redux";
import { store } from "../../../../../redux/store";

const jestMock = jest.fn();
const MockButton = () => <Button onClick={jestMock}>Add Person</Button>;
const MockModal = () => (
  <Provider store={store}>
    <Modal />
  </Provider>
);
describe("PersonForm", () => {
  it("should render PersonForm on Add Person button click", () => {
    render(<MockButton />);
    const button = screen.getByText(/add person/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    render(<MockModal />);
    const modal = screen.getByTestId("modal");
    // const form = screen.getByRole("form");
    expect(modal).toBeInTheDocument();
  });
});
