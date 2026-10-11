import { relations } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const links = pgTable("links", {
  id: uuid("id").primaryKey().defaultRandom(),
  url: text("url").notNull().unique(),
  title: text("title").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
  description: text("description").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const linksCategories = pgTable(
  "links_categories",
  {
    linkId: uuid("link_id")
      .notNull()
      .references(() => links.id, { onDelete: "cascade" }),
    categoryId: uuid("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.linkId, table.categoryId] })],
);

export const linksRelations = relations(links, ({ many }) => ({
  linksCategories: many(linksCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  linksCategories: many(linksCategories),
}));

export const linksCategoriesRelations = relations(linksCategories, ({ one }) => ({
  link: one(links, {
    fields: [linksCategories.linkId],
    references: [links.id],
  }),
  category: one(categories, {
    fields: [linksCategories.categoryId],
    references: [categories.id],
  }),
}));
