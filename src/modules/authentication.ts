import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

export const comparePasswords = (password: any, hash: any) => {
  return bcrypt.compare(password, hash);
};

export const hashPassword = (password: any) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const createJWT = (user: any) => {
    console.log(" process.env.JWT_SECRET ==>  ", process.env.JWT_SECRET);
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET ?? ""
  );
  return token;
};

export const protect = (req: any, res: any, next: any) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET ?? "");
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    res.json({ message: "not authorized" });
    return;
  }
};
