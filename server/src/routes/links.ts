import { Router } from "express";

export const linksRouter = Router();

linksRouter.get("/", (_req, res) => {
  res.status(501).json({ error: "not implemented" });
});

linksRouter.post("/", (_req, res) => {
  res.status(501).json({ error: "not implemented" });
});

linksRouter.delete("/:id", (_req, res) => {
  res.status(501).json({ error: "not implemented" });
});
