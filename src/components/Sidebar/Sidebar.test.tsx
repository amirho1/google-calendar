import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import store from "../../redux";
import { BrowserRouter } from "react-router-dom";

describe("<Sidebar />", () => {
  test("it should mount", () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Sidebar />
        </Provider>
      </BrowserRouter>
    );

    const sidebar = screen.getByTestId("Sidebar");

    expect(sidebar).toBeInTheDocument();
  });
});
