import prisma from "@utils/db";
import { comparePasswords, createJWT, hashPassword } from "../modules/authentication";

export const signUp = async (req: any, res: any) => {
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user);
  res.json({ token: token });
  return;
};

export const signIn = async (req: any, res: any) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  const isValid = await comparePasswords(req.body.password, user?.password);
  if (!isValid) {
    res.status(401);
    res.json({ message: "nope" });
    return;
  }
  const token = createJWT(user);
  res.json({ token });
  console.log("token ===>", token);
  return;
};
