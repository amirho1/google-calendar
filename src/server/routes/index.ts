import { Express } from "express";
import calendar from "./calendars";
import register from "./register";
import login from "./login";
import events from "./events";

export default function routes(app: Express) {
  app.use("/calendars", calendar);
  app.use("/register", register);
  app.use("/login", login);
  app.use("/events", events);
}
