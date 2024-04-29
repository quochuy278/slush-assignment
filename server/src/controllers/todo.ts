import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoDto } from "../services/repository/todo/dto/todo.dto";
import {
  addTodo,
  deleteTodo as deleteTodoFromdb,
  getAllTodos,
  updateTodo as updateTodoFromDb,
} from "../services/repository/todo/todo";

const getTodos = async (request: any, response: Response) => {
  const { userId } = request.user;

  try {
    const todos = await getAllTodos(userId);

    const formattedTodo = todos.map((todo: TodoDto) => {
      const { public_id, ...rest } = todo;

      return {
        ...rest,
        id: public_id,
      };
    });

    return response.status(200).json(formattedTodo);
  } catch (error) {
    response.status(400).json(error);
  }
};

const createTodo = async (request: any, response: Response) => {
  const { userId } = request.user;
  const { name, description, ready } = request.body;

  const createTodoData = {
    name,
    description,
    ready,
    public_id: uuidv4(),
  };

  try {
    const todo = await addTodo(createTodoData, userId);

    const { user_id, id, public_id, ...todoData } = todo;

    return response.status(200).json({
      id: public_id,
      ...todoData,
    });
  } catch (error) {
    response.status(400).json(error);
  }
};

const updateTodo = async (request: any, response: Response) => {
  const { name, description, ready } = request.body;

  const { todoId } = request.params;
  console.log(
    "🚀 ~ updateTodo ~ name, description, ready:",
    name,
    description,
    ready
  );

  const updateData = {
    name: name as string,
    description: description as string,
    ready: ready as boolean,
    public_id: todoId as string,
  };

  try {
    await updateTodoFromDb(todoId, updateData);

    response.status(200).json({
      message: "Update todo successfully",
    });
  } catch (error) {
    response.status(400).json(error);
  }
};

const deleteTodo = async (request: any, response: Response) => {
  const { todoId } = request.params;

  try {
    await deleteTodoFromdb(todoId);

    return response.status(200).json({
      message: "Successfully delete todo",
    });
  } catch (error) {
    response.status(400).json(error);
  }
};

export { createTodo, deleteTodo, getTodos, updateTodo };
