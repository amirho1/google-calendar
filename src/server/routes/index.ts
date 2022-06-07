import { Express } from "express";
import calendar from "./calendars";
import register from "./register";
import login from "./login";
import events from "./events";
import upload from "./uploadImage";
import images from "./images";
import whoAmI from "./whoAmI";
import logout from "./logout";
import uploadImage from "./uploadImage";
import removeImage from "./removeImage";

export default function routes(app: Express) {
  app.use("/calendars", calendar);
  app.use("/register", register);
  app.use("/login", login);
  app.use("/events", events);
  app.use("/upload", upload);
  app.use("/images", images);
  app.use("/whoami", whoAmI);
  app.use("/logout", logout);
  app.use("/uploadImage", uploadImage);
  app.use("/removeImage", removeImage);
}
