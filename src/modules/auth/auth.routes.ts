import { Router } from "express";
import { authController } from "./auth.controllers";

const router = Router();

// * http://localhost:5000/auth/login
router.post("/", authController.loginUser)

export const authRoutes = router;