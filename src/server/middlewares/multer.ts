import multer from "multer";
import { extname, join } from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, join(__dirname, "..", "uploads"));
  },

  filename(req, file, cb) {
    cb(null, `${Date.now()}.${file.mimetype}`);
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
