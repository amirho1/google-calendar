// templates/component/NavMain.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import NavMain from "./NavMain";
import { before, Query } from "../../utils/testHelper";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../redux";

describe("<NavMain />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "NavMain",
      <Provider store={store}>
        <BrowserRouter>
          <NavMain closeSideBar={() => {}} />
        </BrowserRouter>
      </Provider>
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
