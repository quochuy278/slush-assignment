import { Request, Response } from "express";
import { getAllTodos } from "../services/repository/todo/todo";

const getTodos = async (request: Request, response: Response) => {
  const userId = 1;
  try {
    const todos = await getAllTodos(userId);
  } catch (error) {}

  response.send("testing");
};

export { getTodos };
