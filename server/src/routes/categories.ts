import { Router } from "express";

export const categoryRouter = Router();

categoryRouter.get("/", (_req, res) => {
    res.status(501).json({ error: "not implemented" });
});

categoryRouter.post("/", (_req, res) => {
    res.status(501).json({ error: "not implemented" });
});

categoryRouter.delete("/:id", (_req, res) => {
    res.status(501).json({ error: "not implemented" });
});
