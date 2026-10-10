import cors from "cors";
import express from "express";
import { linksRouter } from "./routes/links.js";
import { categoryRouter } from "./routes/categories.js";

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// register the routes
app.use("/api/links", linksRouter);
app.use("/api/categories", categoryRouter);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
