import { Request, Response } from "express";

const signIn = (request: Request, response: Response) => {
  response.send("Sign in route");
};

const signUp = (request: Request, response: Response) => {
  response.send("Sign in route");
};

export { signIn, signUp };
