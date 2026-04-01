import express from "express";
import cors from "cors";
import path from "node:path";
import { pathToFileURL } from "node:url";
import authRoutes from "./routes/auth.js";
import meRoutes from "./routes/me.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payments.js";
import reviewRoutes from "./routes/reviews.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import "./db/index.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({
      ok: true,
      message: "Dorm takeaway help API is running"
    });
  });

  app.use("/api/auth", authRoutes);
  app.use("/api/orders", orderRoutes);
  app.use("/api/me", meRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/payments", paymentRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

export const app = createApp();

export function startServer(port = process.env.PORT || 3000) {
  return app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}

const isMainModule =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMainModule) {
  startServer();
}
