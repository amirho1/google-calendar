import { Router } from "express";
import { existsSync } from "fs";
import { join } from "path";

const router = Router();

router.get("/:image", ({ params: { image } }, res) => {
  try {
    const fileAddress = join(__dirname, "..", "uploads", image);
    if (!image) return res.status(400).send("image name was empty.");
    if (!existsSync(fileAddress))
      return res.status(400).send("bad request file didn't exist.");

    res.sendFile(fileAddress);
  } catch (err: any) {
    res.status(500).send(err);
  }
});

export default router;
