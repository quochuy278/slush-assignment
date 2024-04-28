import { Router } from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo";
import verifyJwtToken from "../middleware/authenticate";
import { validateTodoBody } from "../middleware/validation";

const router = Router();

router.get("/todos", verifyJwtToken, getTodos);

router.post("/todo", verifyJwtToken, validateTodoBody, createTodo);

router.patch("/todo/:todoId", verifyJwtToken, validateTodoBody, updateTodo);

router.delete("/todo/:todoId", verifyJwtToken, deleteTodo);

export const todoRoutes: Router = router;
