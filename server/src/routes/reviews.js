import express from "express";
import { postReview } from "../controllers/reviewsController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/", requireAuth, postReview);

export default router;
