import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const app = require("./server/app");
const connectDB = require("./server/config/database");

export default async function handler(req, res) {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    }
  } catch (err) {
    console.error("Database connection error in serverless handler:", err.message);
  }
  return app(req, res);
}
