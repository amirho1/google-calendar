import multer from "multer";
import { join } from "path";
import User from "../db/user";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "../", "uploads"));
  },

  filename(req, file, cb) {
    User.findOne({ _id: req.session.userId }).then(user => {
      cb(null, `${Date.now()}-${user.name}.${file.mimetype.split("/")[1]}`);
    });
  },
});

export const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const fileExtensions = /jpg|jpeg|png|gif/;

    const isValid = fileExtensions.test(file.mimetype);

    if (isValid) cb(null, true);
    else cb(Error("Images only"));
  },
});
