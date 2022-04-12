import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Sidebar from "./Sidebar";
import { Provider } from "react-redux";
import store from "../../redux";

describe("<Sidebar />", () => {
  test("it should mount", () => {
    render(
      <Provider store={store}>
        {" "}
        <Sidebar />
      </Provider>
    );

    const sidebar = screen.getByTestId("Sidebar");

    expect(sidebar).toBeInTheDocument();
  });
});
