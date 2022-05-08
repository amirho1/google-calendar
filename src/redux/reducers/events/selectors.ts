import { ReduxStateI } from "../..";

interface SelectEventByIdProps {
  id: number;
  timeStamp: number;
  calName: string;
}

export const selectEventById =
  ({ id, timeStamp, calName }: SelectEventByIdProps) =>
  (state: ReduxStateI) => {
    return (
      state.events.events[calName] &&
      state.events.events[calName][timeStamp] &&
      state.events.events[calName][timeStamp].find(event => event.id === id)
    );
  };
