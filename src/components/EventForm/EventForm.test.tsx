// templates/component/EventForm.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import EventForm from "./EventForm";
import { before, Query } from "../../utils/testHelper";
import { EditorState } from "draft-js";
import { convertFromHTML } from "draft-convert";

describe("<EventForm />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "EventForm",
      <EventForm
        handleAddingEvent={() => {}}
        onDescriptionChange={() => {}}
        onTitleChange={() => {}}
        description={EditorState.createWithContent(convertFromHTML(""))}
        title=""
        onEndTimeChang={() => {}}
        eventEndTime={0}
        eventStartTime={0}
        onHeaderMouseDown={() => {}}
        onStartTimeChange={() => {}}
        setModalDisplay={() => {}}
        calName=""
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
