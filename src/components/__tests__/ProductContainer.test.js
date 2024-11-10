import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import mockProducts from "../mocks/productsList.json";
import ProductContainer from "../ProductContainer";

const mockStore = configureStore({});

describe("ProductContainer render", () => {
  let store;

  it("should render product cards when filteredProducts is not empty", () => {
    store = mockStore({
      products: {
        filteredProducts: mockProducts,
        productsFound: true,
        page: 1,
      },
    });

    render(
      <Provider store={store}>
        <ProductContainer />
      </Provider>
    );

    expect(screen.getAllByTestId("card").length).toBe(mockProducts.length);
    mockProducts.forEach((product) => {
      expect(
        screen.getByRole("img", { name: new RegExp(product.name, "i") })
      ).toBeInTheDocument();
      expect(screen.getByText(product.name)).toBeInTheDocument();
      expect(
        screen.getByText(`Category: ${product.category}`)
      ).toBeInTheDocument();
      expect(screen.getByText(`Brand: ${product.brand}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Price: $${product.price.toFixed(2)}`)
      ).toBeInTheDocument();

      expect(
        screen.getByText(`Rating: ${product.rating} ⭐`)
      ).toBeInTheDocument();
    });
  });

  it("should show EmptyResults when no products are found", () => {
    store = mockStore({
      products: {
        filteredProducts: [],
        productsFound: false,
        page: 1,
      },
    });

    render(
      <Provider store={store}>
        <ProductContainer />
      </Provider>
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("No Products Found");
  });
});
