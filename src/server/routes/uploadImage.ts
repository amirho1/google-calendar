import { Router } from "express";
import { unlinkSync } from "fs";
import { join } from "path";
import User from "../db/user";
import isLoggedIn from "../middlewares/isLoggedIn";
import { upload } from "../middlewares/multer";

const router = Router();

const uploading = upload.single("image");

router.put("/", isLoggedIn, (req, res) => {
  try {
    uploading(req, res, async err => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      if (!req.file)
        return res.status(400).send("bad request there isn't any image.");
      const user = await User.findOneAndUpdate(
        { _id: req.session.userId },
        { image: req.file?.filename }
      );

      if (user.image) unlinkSync(join(__dirname, "..", "uploads", user.image));

      (user as any).image = req.file?.filename;

      res.send(user);
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
