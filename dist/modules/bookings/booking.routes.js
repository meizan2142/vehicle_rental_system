"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingRoutes = void 0;
const express_1 = require("express");
const booking_controllers_1 = require("./booking.controllers");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post("/", booking_controllers_1.bookingControllers.createBooking);
router.get("/", (0, auth_1.default)("admin", "customer"), booking_controllers_1.bookingControllers.getBookings);
router.put("/:bookingId", (0, auth_1.default)("admin", "customer"), booking_controllers_1.bookingControllers.updateBooking);
exports.bookingRoutes = router;
