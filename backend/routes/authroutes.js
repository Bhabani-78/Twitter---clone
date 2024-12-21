import express from "express";

import { protectedRoute } from "../middleware/protectedRoute.js";

import { getMe, signup, login, logout } from "../controllers/authcontrollers.js";

const router = express.Router();

router.get("/me", protectedRoute, getMe);

router.post("/signup", signup);

router.post("/login", login);

router.get("/logout", logout);

export default router;