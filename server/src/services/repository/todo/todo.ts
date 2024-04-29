import { Client } from "pg";
import { dbConfig } from "../../database";
import { TodoDto } from "./dto/todo.dto";
import logger from "../../logger";

async function addTodo(
  todo: Omit<TodoDto, "id" | "created_at" | "user_id">,
  userId: number
): Promise<TodoDto> {
  const client = new Client(dbConfig);
  const { name, description, ready, public_id } = todo; // Destructure todo object

  try {
    await client.connect();

    const query = `
      INSERT INTO todos (name, description, ready, user_id, public_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *; -- Return the inserted todo record
    `;

    const result = await client.query(query, [
      name,
      description,
      ready,
      userId,
      public_id,
    ]);

    const newTodo = result.rows[0];

    return newTodo; // Return the inserted todo object
  } catch (error) {
    logger.error("Error adding todo:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    await client.end();
  }
}

async function getTodo(todoPublicId: string) {
  const client = new Client(dbConfig);

  try {
    const query: string = `
    SELECT *
    FROM todos
    WHERE public_id = $1
  `;
    const result = await client.query(query, [todoPublicId]);

    // Check if any user was found
    if (result.rows.length === 0) {
      return null; // Return null if no user found
    }

    // Return the first user from the results (assuming unique emails)
    return result.rows[0];
  } catch (error) {
    logger.error("Error fetching user:", error);
    throw error;
  } finally {
    await client.end();
  }
}

async function getAllTodos(userId: number) {
  const client = new Client(dbConfig);
  try {
    await client.connect();

    const query: string = `
      SELECT id, public_id, name, description, created_at, ready
      FROM todos
      WHERE user_id = $1
    `;

    const result = await client.query(query, [userId]); // Use conditional logic for parameters

    const todos = result.rows;

    return todos; // Return the array of retrieved todo objects
  } catch (error) {
    logger.error("Error fetching todos:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    await client.end();
  }
}

async function updateTodo(
  todoId: number,
  updateData: Omit<TodoDto, "id" | "created_at" | "user_id">
) {
  const client = new Client(dbConfig);

  try {
    await client.connect();

    const updateSet = Object.keys(updateData)
      .map((key) => `${key} = $${Object.keys(updateData).indexOf(key) + 1}`)
      .join(", ");

    const query = `
      UPDATE todos
      SET ${updateSet}
      WHERE public_id = $${Object.keys(updateData).length + 1}
    `;

    const values = [...Object.values(updateData), todoId]; // Combine update data and ID

    const result = await client.query(query, values);

    // Assuming successful update returns 1 row affected
    if (result.rowCount === 1) {
      logger.info("Todo updated successfully!");
    }
  } catch (error) {
    logger.error("Error updating todo:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    await client.end();
  }
}

async function deleteTodo(todoId: number): Promise<void> {
  const client = new Client(dbConfig);

  try {
    await client.connect();

    const query = `
      DELETE FROM todos
      WHERE public_id = $1
    `;

    await client.query(query, [todoId]);

    logger.info(`Todo with ID ${todoId} deleted successfully.`); // Optional logging
  } catch (error) {
    logger.error("Error deleting todo:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    await client.end();
  }
}

export { addTodo, getAllTodos, getTodo, updateTodo, deleteTodo };
