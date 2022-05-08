import { ReduxStateI } from "../..";

export const selectCalendarById = (id: number) => (state: ReduxStateI) => {
  return state.calendars.calendars.find(calendar => {
    return calendar.id === id;
  });
};
