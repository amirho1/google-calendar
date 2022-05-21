import { ReduxStateI } from "../..";

interface SelectEventByIdProps {
  id: string;
  timeStamp: number;
  calId: string;
}

export const selectEventById =
  ({ id, timeStamp, calId }: SelectEventByIdProps) =>
  (state: ReduxStateI) => {
    return (
      state.events.events[calId] &&
      state.events.events[calId][timeStamp] &&
      state.events.events[calId][timeStamp].find(event => event._id === id)
    );
  };
