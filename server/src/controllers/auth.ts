import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../services/repository/user/user";
import { UserDto } from "../services/repository/user/dto/user.dto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { v4 as uuidv4 } from "uuid";

const signIn = async (request: Request, response: Response) => {
  const { email, password } = request.body;
  console.log("🚀 ~ signIn ~ email, password:", email, password);

  const user = await getUserByEmail(email);

  if (!user) {
    return response.status(400).json({
      message: "User not found",
    });
  }

  const comparedPassword = bcrypt.compareSync(password, user.hash);

  if (!comparedPassword) {
    return response.status(400).json({
      message: "Something wrong happened",
    });
  }

  const { hash, public_id, ...userObject } = user;

  const token = jwt.sign(
    { email: user.email, userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "8h" }
  );

  return response.status(200).json({
    ...userObject,
    id: public_id,
    accessToken: token,
  });
};

const signUp = async (request: Request, response: Response) => {
  const { name, email, password } = request.body;

  const user = await getUserByEmail(email);

  if (user) {
    response.status(400).json({
      message: "User existed",
    });
  }

  // Hashing password
  const hashedPassword = bcrypt.hashSync(password);

  const userData: Omit<UserDto, "id"> = {
    public_id: uuidv4(),
    email: email,
    name: name,
    hash: hashedPassword,
  };

  await createUser(userData);

  response.status(200).json({
    message: "Successfully add a user",
  });
};

export { signIn, signUp };
