import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import FilterSidebar from "../FilterSidebar";
import { applyFilters, initialFilters } from "../../features/filterSlice";
import { closeMenu } from "../../features/appSlice";

const mockStore = configureStore({});

describe("FilterSidebar component render", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      filters: {
        filters: initialFilters,
      },
    });
  });

  it("Should render FilterSidebar with correct elements", () => {
    render(
      <Provider store={store}>
        <FilterSidebar />
      </Provider>
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Filters"
    );

    expect(screen.getByText("Price Range")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /clear filters/i })
    ).toBeInTheDocument();
    expect(screen.getByTestId("close")).toBeInTheDocument();
  });

  it("Should clear filters when Clear Filters button is clicked", () => {
    render(
      <Provider store={store}>
        <FilterSidebar />
      </Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: /clear filters/i }));

    const actions = store.getActions();
    expect(actions[0]).toEqual(applyFilters(initialFilters));
  });

  it("Should call closeMenu when close button is clicked", () => {
    render(
      <Provider store={store}>
        <FilterSidebar />
      </Provider>
    );

    fireEvent.click(screen.getByTestId("close"));

    const actions = store.getActions();
    expect(actions[0]).toEqual(closeMenu());
  });
});
