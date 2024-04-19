// api.test.js

import { connectToDatabase } from "../lib/database/index";
import mongoose from "mongoose";
require("dotenv").config({ path: ".env.local" });

describe("Database Connection", () => {
  test("should connect to the database", async () => {
    const db = await connectToDatabase();
    expect(db).toBeTruthy();
  });
});
