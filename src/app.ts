import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// * Root Route
app.get("/", (req: Request, res: Response) => {
    res.send("Vehicle Rental System - Express Server");
})


// * 404 Route
app.use((req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

export default app;