import { Request, Response } from "express";

const getTodos = (request: Request, response: Response) => {
  response.send("testing");
};

export { getTodos };
