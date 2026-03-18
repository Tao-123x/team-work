import express from "express";
import { postReview } from "../controllers/reviewsController.js";

const router = express.Router();

router.post("/", postReview);

export default router;
