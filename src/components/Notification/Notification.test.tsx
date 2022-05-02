// templates/component/Notification.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Notification from "./Notification";
import { before, Query } from "../../utils/testHelper";

describe("<Notification />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Notification",
      <Notification
        message={null}
        closeNotification={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
