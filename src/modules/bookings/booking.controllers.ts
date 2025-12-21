import { Request, Response } from "express";
import { bookingServices } from "./booking.services";

const createBooking = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await bookingServices.createBooking(data);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    } catch (error: any) {
        console.error(error);
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create booking",
        });
    }
};

export const bookingControllers = {
    createBooking
}