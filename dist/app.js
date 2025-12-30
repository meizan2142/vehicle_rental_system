"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const vehicle_routes_1 = require("./modules/vehicles/vehicle.routes");
const user_routes_1 = require("./modules/users/user.routes");
const auth_routes_1 = require("./modules/auth/auth.routes");
const booking_routes_1 = require("./modules/bookings/booking.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// * Initializing DB
(0, db_1.default)();
// * Root Route
app.get("/", (req, res) => {
    res.send("Vehicle Rental System - Express Server");
});
// * Auth Routes
app.use("/api/v1/auth", auth_routes_1.authRoutes);
// * Users - CRUD
app.use("/api/v1/users", user_routes_1.userRoutes);
// * Vehicles - CRUD
app.use("/api/v1/vehicles", vehicle_routes_1.vehicleRoutes);
// * Bookings - CRUD
app.use("/api/v1/bookings", booking_routes_1.bookingRoutes);
// * 404 Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    });
});
exports.default = app;
