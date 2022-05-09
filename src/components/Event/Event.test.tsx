// templates/component/Event.js

import React, { MouseEvent } from "react";
import "@testing-library/jest-dom/extend-expect";
import Event from "./Event";
import { before, Query } from "../../utils/testHelper";
import { EventDetailsI } from "../Day/Day";
import { EventI } from "../../redux/reducers/events/events";
import { onEventMouseDownT } from "../Modal/Modal";

describe("<Event />", () => {
  let query: Query;
  let element: HTMLElement;

  // beforeEach(() => {
  //   ({ element, query } = before(
  //     "Event",
  //     <Event
  //       event={{
  //         calId: 3,
  //         color: "",
  //         description: "",
  //         endTime: 3,
  //         startTime: 3,
  //         title: "",
  //       }}
  //       onEventClick={() => {}}
  //       onEventBottomMouseDownSetIsMouseDownTrue={function (): void {
  //         throw new Error("Function not implemented.");
  //       }}
  //       onBottomBorderMouseUp={function (): void {
  //         throw new Error("Function not implemented.");
  //       }}
  //       onEventMouseDown={function (event: EventI): onEventMouseDownT {
  //         throw new Error("Function not implemented.");
  //       }}
  //       onEventRightClick={() => {}}
  //     />
  //   ));
  // });

  it("should mount", () => {
    expect(element).toBeInTheDocument();
  });
});
