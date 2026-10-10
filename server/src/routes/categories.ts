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
        console.log('Creating category ${name} with description ${description}');
        await db.insert(categories).values({ name, description });
        res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
        console.error('Error creating category: ${error}');
        res.status(500).json({ error: "Failed to create category" });
    }
});

categoryRouter.delete("/:id", (_req, res) => {
    res.status(501).json({ error: "not implemented" });
});
