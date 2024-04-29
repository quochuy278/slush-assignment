import { Client } from "pg";
import { dbConfig } from "../../database";
import { UserDto } from "./dto/user.dto";
import logger from "../../logger";

async function getUserByEmail(email: string): Promise<UserDto | null> {
  const client = new Client(dbConfig);
  try {
    await client.connect();

    // Define the query to select user by email
    const query = `
      SELECT *
      FROM users
      WHERE email = $1
    `;

    // Execute the query with the provided email
    const result = await client.query(query, [email]);

    // Check if any user was found
    if (result.rows.length === 0) {
      return null; // Return null if no user found
    }

    // Return the first user from the results (assuming unique emails)
    return result.rows[0];
  } catch (error) {
    logger.error("Error fetching user:", error);
    throw error; // Re-throw the error for handling in the calling code
  } finally {
    // Ensure client connection is closed even if errors occur
    await client.end();
  }
}

async function createUser(user: Omit<UserDto, "id">) {
  const { name, email, hash, public_id } = user; // Destructure user object
  const client = new Client(dbConfig);
  try {
    await client.connect();

    // Assuming you have already executed the migration script to create the 'users' table
    const query = `
        INSERT INTO users (name, email, hash, public_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *; -- Return the inserted user record
      `;

    const result = await client.query(query, [name, email, hash, public_id]);
    const newUser = result.rows[0];

    logger.info(`User added successfully:`, newUser);

    return newUser; // Return the inserted user object
  } catch (error) {
    logger.error("Error adding user:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    await client.end();
  }
}

export { createUser, getUserByEmail };
