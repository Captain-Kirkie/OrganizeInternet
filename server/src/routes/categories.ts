import { Router } from "express";
import { db } from "src/db/index.js";
import { categories } from "src/db/schema.js";

export const categoryRouter = Router();

categoryRouter.get("/", async (_req, res) => {
    const cats = await db.select().from(categories);
    console.log('Cattegories Available ${cats}')
    return res.status(200).json({ categories: cats });
});

categoryRouter.post("/", async (_req, res) => {
    try {
        const { name, description } = _req.body
        console.log(`Creating category ${name} with description ${description}`);
        const [created] = await db.insert(categories).values({ name, description }).returning();
        res.status(201).json(created);
    } catch (error) {
        console.error("Error creating category:", error);
        const code = error instanceof Error && "cause" in error
            ? (error.cause as { code?: string } | undefined)?.code
            : undefined;
        if (code === "23505") {
            res.status(409).json({ error: "Category already exists" });
            return;
        }
        res.status(500).json({ error: "Failed to create category" });
    }
});

categoryRouter.delete("/:id", (_req, res) => {
    res.status(501).json({ error: "not implemented" });
});
