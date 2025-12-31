import express from "express";
import protect from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/me", protect, getProfile);
router.put("/me", protect, updateProfile);

export default router;
