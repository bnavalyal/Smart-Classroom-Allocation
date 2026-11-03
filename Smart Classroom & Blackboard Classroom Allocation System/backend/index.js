const path = require("node:path");
const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = require("./src/app");
const connectDB = require("./src/config/database");

// Connect to MongoDB if MONGODB_URI is provided
if (process.env.MONGODB_URI) {
  connectDB().catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
}

// Middleware to ensure DB connection is ready on each request
app.use(async (req, res, next) => {
  try {
    if (process.env.MONGODB_URI) {
      await connectDB();
    }
    next();
  } catch (err) {
    console.error("Database connection error in request handler:", err.message);
    next(err);
  }
});

// Start local listener only when run outside Vercel serverless
if (!process.env.VERCEL) {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Classroom Allocation API listening on port ${port}`);
  });
}

module.exports = app;
