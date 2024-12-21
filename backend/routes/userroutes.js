import express from "express";
import { protectedRoute } from "../middleware/protectedRoute.js";
import { getUserProfile, followUnfollowuser, getSuggestedUsers, updateUserProfile } from "../controllers/usercontroller.js";

const router = express.Router();

router.get("/profile/:username",protectedRoute,getUserProfile)
router.get("/suggested",protectedRoute,getSuggestedUsers)
router.post("/follow/:id",protectedRoute,followUnfollowuser)
router.post("/update",protectedRoute,updateUserProfile)

export default router;