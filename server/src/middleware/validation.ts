import { NextFunction, Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import {
  ValidateSignUpUser,
  ValidatedUser,
} from "../services/repository/user/dto/user.dto";
import { ValidatedTodo } from "../services/repository/todo/dto/todo.dto";

export const validateSignUpBody = async <T>(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Extract user data from request body
  const userBody = req.body;

  // 2. Convert to User class instance (validation)
  const user = plainToClass(ValidateSignUpUser, userBody);

  // 3. Validate the user object
  const errors = await validate(user);

  // 4. Handle validation errors
  if (errors.length > 0) {
    const validationErrors = errors.map((error) => {
      const { property, constraints } = error;
      // Extract all constraint messages and join them
      const messages = constraints ? Object.values(constraints).join(", ") : "";
      return { property, messages };
    });

    res.status(400).json({ errors: validationErrors });
    return;
  }

  // 5. Proceed with authenticated logic
  next(); // Pass control to the next middleware or route handler
};

export const validateSignInBody = async <T>(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Extract user data from request body
  const userBody = req.body;

  // 2. Convert to User class instance (validation)
  const user = plainToClass(ValidatedUser, userBody);

  // 3. Validate the user object
  const errors = await validate(user);

  // 4. Handle validation errors
  if (errors.length > 0) {
    const validationErrors = errors.map((error) => {
      const { property, constraints } = error;
      // Extract all constraint messages and join them
      const messages = constraints ? Object.values(constraints).join(", ") : "";
      return { property, messages };
    });

    res.status(400).json({ errors: validationErrors });
    return;
  }

  // 5. Proceed with authenticated logic
  next(); // Pass control to the next middleware or route handler
};

export const validateTodoBody = async <T>(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1. Extract user data from request body
  const todoBody = req.body;

  // 2. Convert to User class instance (validation)
  const todo = plainToClass(ValidatedTodo, todoBody);

  // 3. Validate the user object
  const errors = await validate(todo);

  // 4. Handle validation errors
  if (errors.length > 0) {
    const validationErrors = errors.map((error) => {
      const { property, constraints } = error;
      // Extract all constraint messages and join them
      const messages = constraints ? Object.values(constraints).join(", ") : "";
      return { property, messages };
    });

    res.status(400).json({ errors: validationErrors });
    return;
  }

  // 5. Proceed with authenticated logic
  next(); // Pass control to the next middleware or route handler
};