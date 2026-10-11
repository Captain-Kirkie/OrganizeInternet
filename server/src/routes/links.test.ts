import assert from "node:assert/strict";
import { describe, it } from "node:test";
import express from "express";
import request from "supertest";
import { linksRouter } from "./links.js";

function app() {
  const server = express();
  server.use(express.json());
  server.use("/api/links", linksRouter);
  return server;
}

describe("links API", () => {
  it("returns 501 for list, create, and delete", async () => {
    const server = app();

    const list = await request(server).get("/api/links");
    const create = await request(server).post("/api/links").send({ url: "https://example.com" });
    const remove = await request(server).delete("/api/links/1");

    assert.equal(list.status, 501);
    assert.equal(create.status, 501);
    assert.equal(remove.status, 501);
    assert.deepEqual(list.body, { error: "not implemented" });
  });
});
