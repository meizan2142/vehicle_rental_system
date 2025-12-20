import { Router } from "express";
import { authController } from "./auth.controllers";

const router = Router();

router.post("/signin", authController.loginUser)

export const authRoutes = router;