import { UserProvider } from "@auth0/nextjs-auth0";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { store } from "../../../../../redux/store";
import Button from "../../../Button/index";
import PersonForm from "../../../Form/PersonForm/index";

const jestMock = jest.fn();

const MockButton = () => <Button onClick={jestMock}>Add Person</Button>;
const MockPersonForm = () => (
  <UserProvider>
    <Provider store={store}>
      <PersonForm data-testid="modal" />
    </Provider>
  </UserProvider>
);

describe("PersonForm", () => {
  it("should render PersonForm when Add Person button is clicked", () => {
    render(<MockButton />);
    const button = screen.getByText(/add person/i);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    act(() => {
      render(<MockPersonForm />);
    });

    // render(<MockPersonForm />);
    const form = screen.getByTestId("add-person-form");
    expect(form).toBeInTheDocument();
  });
});
