import { NextFunction } from "client-sessions";
import { Request, Response } from "express";
import User from "../db/user";

const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session || !req.session.userId)
    return res.status(401).send("/login");

  const user = await User.findOne({ _id: req.session.userId });

  if (!user) return res.status(401).send("/login");

  next();
};

export default isLoggedIn;
