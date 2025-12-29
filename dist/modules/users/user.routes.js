"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controllers_1 = require("./user.controllers");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.get('/', (0, auth_1.default)("admin"), user_controllers_1.userControllers.getUsers);
router.get('/:userId', user_controllers_1.userControllers.getSingleUser);
router.put('/:userId', user_controllers_1.userControllers.updateSingleUser);
router.delete('/:userId', user_controllers_1.userControllers.deleteSingleUser);
exports.userRoutes = router;
