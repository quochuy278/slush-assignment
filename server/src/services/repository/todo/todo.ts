import { client } from "../../database";
import { TodoDto } from "./dto/todo.dto";

async function addTodo(todo: TodoDto, userId: number): Promise<TodoDto> {
  const { name, description, ready } = todo; // Destructure todo object

  try {
    await client.connect();

    // Assuming you have already executed the migration script to create the 'todos' table
    const query = `
      INSERT INTO todos (name, description, ready, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *; -- Return the inserted todo record
    `;

    const result = await client.query(query, [
      name,
      description,
      ready,
      userId,
    ]);
    const newTodo = result.rows[0];

    console.log(`Todo added successfully:`, newTodo);

    return newTodo; // Return the inserted todo object
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    await client.end();
  }
}

async function getAllTodos(userId: number) {
  try {
    await client.connect();

    const query: string = `
      SELECT *
      FROM todos
      WHERE user_id = $1
    `;

    const result = await client.query(query, [userId]); // Use conditional logic for parameters

    const todos = result.rows;

    console.log(`Fetched ${todos.length} todos:`);
    todos.forEach((todo) => console.log(todo));

    return todos; // Return the array of retrieved todo objects
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    await client.end();
  }
}

export { addTodo, getAllTodos };
