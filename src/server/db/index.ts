import mongoose from "mongoose";

export default function connect() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/test")
    .then(() => {
      console.log("Connecting to mongodb");
    })
    .catch(err => {
      console.error(err);
    });
}
