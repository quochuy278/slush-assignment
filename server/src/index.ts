import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";

import { combinedRoutes } from "./routes";
import { checkAndMigrate, connectToDatabase } from "./services/database";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(combinedRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to slush assignment api server");
});

// Tracking database migration
checkAndMigrate();

// Initialize connection to database
connectToDatabase();

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
