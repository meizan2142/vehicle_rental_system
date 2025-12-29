import express, { Request, Response } from "express";
import initDB from "./config/db";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";
import { userRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { bookingRoutes } from "./modules/bookings/booking.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// * Initializing DB
initDB();

// * Root Route
app.get("/", (req: Request, res: Response) => {
    res.send("Vehicle Rental System - Express Server");
})

// * Auth Routes
app.use("/api/v1/auth", authRoutes);

// * Users - CRUD
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/users/:id", userRoutes)

// * Vehicles - CRUD
app.use("/api/v1/vehicles", vehicleRoutes);
app.use("/api/v1/vehicles/:id", vehicleRoutes);

// * Bookings - CRUD
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/bookings/:bookingId", bookingRoutes);


// * 404 Route
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

export default app;