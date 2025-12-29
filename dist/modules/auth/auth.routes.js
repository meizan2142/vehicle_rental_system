"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
const router = (0, express_1.Router)();
router.post("/signup", auth_controllers_1.authController.registerUser);
router.post("/signin", auth_controllers_1.authController.loginUser);
exports.authRoutes = router;
