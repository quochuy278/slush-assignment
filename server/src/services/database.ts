import { Client, ClientConfig } from "pg";
import dotenv from "dotenv";
import logger from "./logger";

import fs from "fs-extra";

dotenv.config();

const migrationPath = "./src/services/migrations/migration.sql";

const dbConfig: ClientConfig = {
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5433,
  database: process.env.POSTGRES_DATABASE,
  ssl: process.env.NODE_ENV === "production" ? true : false,
};

/**
 * Checks if the 'users' and 'todos' tables exist in the database and executes a migration script if necessary.
 *
 * This function connects to the database using the provided configuration, checks for the existence of both tables,
 * and executes the migration script located at 'migrationLocation' if either table is missing.
 * It logs messages indicating the outcome of the check and migration process.
 *
 * @param {Object} dbConfig - An object containing the database connection configuration (user, password, host, port, database).
 * @param {string} migrationLocation - The path to the SQL migration script file.
 * @returns {Promise<void>} - Resolves upon completion of the check and migration process (if needed).
 */
async function checkAndMigrate(): Promise<void> {
  const client = new Client(dbConfig);
  try {
    await client.connect();

    const usersExist = await client.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'users'
      )
    `);

    const todosExist = await client.query(`
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_name = 'todos'
      )
    `);

    if (!usersExist.rows[0].exists || !todosExist.rows[0].exists) {
      logger.info("Tables missing, running migration script...");
      const migrationScript = await fs.promises.readFile(
        `${migrationPath}`,
        "utf-8"
      );

      await client.query(migrationScript);
    } else {
      logger.info("Tables already exist, skipping migration.");
    }
  } catch (error) {
    logger.info(dbConfig);
    logger.error(`checkAndMigrate: ${error}`);
  } finally {
    await client.end();
  }
}

async function connectToDatabase() {
  const client = new Client(dbConfig);

  await client
    .connect()
    .then(() => {
      logger.info("database connected");
    })
    .catch((error) => {
      logger.error(`connectToDatabase: ${error}`);
    });

  return client;
}

export { dbConfig, connectToDatabase, checkAndMigrate };
