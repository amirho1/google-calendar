// templates/component/EventForm.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import EventForm from "./EventForm";
import { before, Query } from "../../utils/testHelper";
import moment from "moment-jalaali";

describe("<EventForm />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "EventForm",
      <EventForm
        eventEndTime={0}
        eventStartTime={0}
        onHeaderMouseDown={() => {}}
        date={moment()}
        onStartTimeChange={() => {}}
        setModalDisplay={() => {}}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
