import { Router } from "express";
import { getTodos } from "../controllers/todo";

const router = Router();

router.get("/todos", getTodos);

export const todoRoutes: Router = router;
