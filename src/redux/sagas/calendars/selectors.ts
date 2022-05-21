import { ReduxStateI } from "../..";

export const selectCalendarById = (id: string) => (state: ReduxStateI) => {
  return state.calendars.calendars.find(calendar => {
    return calendar._id === id;
  });
};
