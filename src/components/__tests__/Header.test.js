import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Header from "../Header";
import { inputChange } from "../../features/searchSlice";
import { toggleMenu } from "../../features/appSlice";

const mockStore = configureStore({});
describe("Header component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      search: { searchText: "" },
    });
    store.dispatch = jest.fn();
  });

  it("Should render logo, filter button and search input", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    expect(screen.getByAltText("logo")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Type to search...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Should call inputChange action on input change", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const input = screen.getByPlaceholderText("Type to search...");
    fireEvent.change(input, { target: { value: "test" } });
    expect(store.dispatch).toHaveBeenCalledWith(inputChange("test"));
  });

  it("should dispatch toggleMenu action when filter button is clicked", () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    const filterBtn = screen.getByRole("button");
    fireEvent.click(filterBtn);
    expect(store.dispatch).toHaveBeenCalledWith(toggleMenu());
  });
});
