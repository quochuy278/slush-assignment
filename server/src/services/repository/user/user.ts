import { client } from "../../database";
import { UserDto } from "./dto/user.dto";

async function addUser(user: UserDto) {
  const { name, email, password } = user; // Destructure user object

  try {
    await client.connect();

    // Assuming you have already executed the migration script to create the 'users' table
    const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *; -- Return the inserted user record
      `;

    const result = await client.query(query, [name, email, password]);
    const newUser = result.rows[0];

    console.log(`User added successfully:`, newUser);

    return newUser; // Return the inserted user object
  } catch (error) {
    console.error("Error adding user:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    await client.end();
  }
}

export { addUser };
