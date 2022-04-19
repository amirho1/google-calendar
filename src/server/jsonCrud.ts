import fs from "fs";
import { join } from "path";

const fileAdd = join(__dirname, "db.json");

export function write(data: string, cb: (err: Error | null) => void) {
  fs.writeFile(fileAdd, data, cb);
}

interface OBJECT {
  [props: string]: any;
}

export function updateGivenObject(origin: OBJECT, update: OBJECT) {
  for (let prop in update) {
    origin[prop] = update[prop];
  }
}
