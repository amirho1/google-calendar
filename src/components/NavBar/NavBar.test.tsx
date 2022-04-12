import React from "react";
import { Query } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NavBar from "./NavBar";
import { before } from "../../utils/testHelper";
import { Provider } from "react-redux";
import store from "../../redux";

describe("<NavBar />", () => {
  let element: HTMLElement;
  let query: Query;

  beforeEach(() => {
    ({ element, query } = before(
      "NavBar",
      <Provider store={store}>
        <NavBar closeSideBar={() => {}} />
      </Provider>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
