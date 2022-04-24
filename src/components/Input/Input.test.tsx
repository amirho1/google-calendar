// templates/component/Input.js

import React from "react";
import "@testing-library/jest-dom/extend-expect";
import Input from "./Input";
import { before, Query } from "../../utils/testHelper";

describe("<Input />", () => {
  let query: Query;
  let element: HTMLElement;

  beforeEach(() => {
    ({ element, query } = before(
      "Input",
      <Input tag="name" value="something" onChange={() => {}} />
    ));
  });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });

  it("should use the given tag as label", () => {
    const label = query("label");
    expect(label).toBeInTheDocument();
    expect(label?.textContent).toBe("name");
  });

  it("should has an input element", () => {
    const input = query("input");

    expect(input).toBeInTheDocument();
    expect(input?.id).toBe("name");
  });

  it("should n`t has a label when small is true", () => {
    before(
      "Input",
      <Input tag="name" value="something" onChange={() => {}} small={true} />
    );
    const label = query("label");

    expect(label).not.toBeInTheDocument();
  });
});
