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
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });
    }
};

const getBookings = async (req: Request, res: Response) => {
    try {
        const loggedInUser = req.user!;

        if (loggedInUser.role === "admin") {
            const result = await bookingServices.getBookings();
            return res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully.",
                data: result.rows,
            });
        }

        const result = await bookingServices.getSingleBooking(
            loggedInUser.id
        );

        return res.status(200).json({
            success: true,
            message: "Bookings retrieved successfully.",
            data: result.rows,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error,
        });
    }
};


export const bookingControllers = {
    createBooking,
    getBookings
}