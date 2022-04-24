// templates/component/DescriptionEditor.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import DescriptionEditor from "./DescriptionEditor";
import { before, Query } from "../../utils/testHelper";
import { EditorState } from "draft-js";
import { convertFromHTML } from "draft-convert";

describe("<DescriptionEditor />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "DescriptionEditor",
      <DescriptionEditor
        onEditorChange={() => {}}
        editorState={EditorState.createWithContent(convertFromHTML(""))}
      />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
