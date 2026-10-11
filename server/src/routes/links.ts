import { Router } from "express";
import { db } from "../db/index.js";
import { links, linksCategories } from "../db/schema.js";
export const linksRouter = Router();
import type { Link } from "@shared/link";

linksRouter.get("/", async (_req, res) => {
  const rows = await db.select().from(links);
  res.json(rows);
});
/*  
route to add a link

INSERT INTO links (url, title)
VALUES ('https://example.com', 'Example')
RETURNING id;

INSERT INTO links_categories (link_id, category_id)
VALUES ('the-id-from-above', 'the-category-id');

*/
linksRouter.post("/", async (_req, res) => {
  const { url, title, categoryId } = _req.body;
  if (!url || !title || !categoryId) {
    res.status(400).json({ error: "Missing required fields" });
    return;
  }
  const [newLink] = await db.insert(links).values({ url, title }).returning();
  if (!newLink) {
    res.status(500).json({ error: "Failed to create link" });
    return;
  }
  await db.insert(linksCategories).values({
    linkId: newLink.id,
    categoryId: categoryId as string,
  });
  res.status(201).json(newLink);



});

linksRouter.delete("/:id", (_req, res) => {
  res.status(501).json({ error: "not implemented" });
});
