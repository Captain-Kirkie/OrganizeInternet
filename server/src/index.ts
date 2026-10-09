import cors from "cors";
import express from "express";
import { linksRouter } from "./routes/links.js";

const app = express();
const port = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use("/api/links", linksRouter);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
