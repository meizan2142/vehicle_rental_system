import express, { Request, Response } from "express";
import initDB from "./config/db";
import { vehicleRoutes } from "./modules/vehicles/vehicle.routes";

const app = express();
app.use(express.json());

// * Initializing DB
initDB();

// * Root Route
app.get("/", (req: Request, res: Response) => {
    res.send("Vehicle Rental System - Express Server");
})

// * Vehicles - CRUD
app.use("/api/v1/vehicles", vehicleRoutes)


// * 404 Route
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

export default app;