import assert from "node:assert/strict";
import { describe, it } from "node:test";
import express from "express";
import request from "supertest";
import {
  createCategoryRouter,
  type CategoryRecord,
  type CategoryStore,
} from "./categories.js";

const createdAt = new Date("2026-01-01T00:00:00.000Z");

const news: CategoryRecord = {
  id: "11111111-1111-1111-1111-111111111111",
  name: "news",
  description: "daily news",
  createdAt,
};

function appWith(database: CategoryStore) {
  const app = express();
  app.use(express.json());
  app.use("/api/categories", createCategoryRouter(database));
  return app;
}

function duplicateNameError() {
  const error = new Error("duplicate key");
  return Object.assign(error, { cause: { code: "23505" } });
}

describe("categories API", () => {
  it("lists categories", async () => {
    const database: CategoryStore = {
      select: () => ({ from: async () => [news] }),
      insert: () => ({ values: () => ({ returning: async () => [] }) }),
      delete: () => ({ where: () => ({ returning: async () => [] }) }),
    };

    const response = await request(appWith(database)).get("/api/categories");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, {
      categories: [{ ...news, createdAt: createdAt.toISOString() }],
    });
  });

  it("creates a category and returns the saved row", async () => {
    let inserted: { name: string; description: string } | undefined;
    const database: CategoryStore = {
      select: () => ({ from: async () => [] }),
      insert: () => ({
        values: (values) => ({
          returning: async () => {
            inserted = values;
            return [news];
          },
        }),
      }),
      delete: () => ({ where: () => ({ returning: async () => [] }) }),
    };

    const response = await request(appWith(database))
      .post("/api/categories")
      .send({ name: "news", description: "daily news" });

    assert.equal(response.status, 201);
    assert.deepEqual(inserted, { name: "news", description: "daily news" });
    assert.equal(response.body.id, news.id);
    assert.equal(response.body.name, "news");
    assert.equal(response.body.description, "daily news");
  });

  it("returns 409 when the category name already exists", async () => {
    const database: CategoryStore = {
      select: () => ({ from: async () => [] }),
      insert: () => ({
        values: () => ({
          returning: async () => {
            throw duplicateNameError();
          },
        }),
      }),
      delete: () => ({ where: () => ({ returning: async () => [] }) }),
    };

    const response = await request(appWith(database))
      .post("/api/categories")
      .send({ name: "news", description: "daily news" });

    assert.equal(response.status, 409);
    assert.deepEqual(response.body, { error: "Category already exists" });
  });

  it("returns 500 when creating a category fails", async () => {
    const database: CategoryStore = {
      select: () => ({ from: async () => [] }),
      insert: () => ({
        values: () => ({
          returning: async () => {
            throw new Error("database unavailable");
          },
        }),
      }),
      delete: () => ({ where: () => ({ returning: async () => [] }) }),
    };

    const response = await request(appWith(database))
      .post("/api/categories")
      .send({ name: "news", description: "daily news" });

    assert.equal(response.status, 500);
    assert.deepEqual(response.body, { error: "Failed to create category" });
  });

  it("deletes a category", async () => {
    const database: CategoryStore = {
      select: () => ({ from: async () => [] }),
      insert: () => ({ values: () => ({ returning: async () => [] }) }),
      delete: () => ({ where: () => ({ returning: async () => [news] }) }),
    };

    const response = await request(appWith(database)).delete(`/api/categories/${news.id}`);

    assert.equal(response.status, 200);
    assert.equal(response.body.id, news.id);
  });

  it("returns 404 when the category to delete does not exist", async () => {
    const database: CategoryStore = {
      select: () => ({ from: async () => [] }),
      insert: () => ({ values: () => ({ returning: async () => [] }) }),
      delete: () => ({ where: () => ({ returning: async () => [] }) }),
    };

    const response = await request(appWith(database)).delete(`/api/categories/${news.id}`);

    assert.equal(response.status, 404);
    assert.deepEqual(response.body, { error: "Category not found" });
  });

  it("returns 500 when deleting a category fails", async () => {
    const database: CategoryStore = {
      select: () => ({ from: async () => [] }),
      insert: () => ({ values: () => ({ returning: async () => [] }) }),
      delete: () => ({
        where: () => ({
          returning: async () => {
            throw new Error("database unavailable");
          },
        }),
      }),
    };

    const response = await request(appWith(database)).delete(`/api/categories/${news.id}`);

    assert.equal(response.status, 500);
    assert.deepEqual(response.body, { error: "Failed to delete category" });
  });
});
