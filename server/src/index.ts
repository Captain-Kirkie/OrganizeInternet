import cors from "cors";
import express from "express";
import { db } from "./db/index.js";
import { linksRouter } from "./routes/links.js";
import { createCategoryRouter, type CategoryStore } from "./routes/categories.js";

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// register the routes
app.use("/api/links", linksRouter);
app.use("/api/categories", createCategoryRouter(db as unknown as CategoryStore));

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
