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
        console.log("loggedInUser:", loggedInUser);

        if (loggedInUser.role === "admin") {
            const result = await bookingServices.getAllBookingsForAdmin();

            return res.status(200).json({
                success: true,
                message: "Bookings retrieved successfully",
                role: "admin",
                data: result.rows,
            });
        }

        const customerId = Number(loggedInUser.id);
        console.log(customerId);

        if (isNaN(customerId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }


        const result = await bookingServices.getBookingsForCustomer(customerId);

        return res.status(200).json({
            success: true,
            message: "Your bookings retrieved successfully",
            role: "customer",
            data: result.rows,
        });

    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateBooking = async (req: Request, res: Response) => {
    try {
        const bookingId = Number(req.params.bookingId);
        const { status } = req.body || {};
        console.log(req.body); // showing undefined
        
        const userRole = req.user!.role;
        console.log(userRole);
        

        // Validate request
        if (!status || !["cancelled", "returned"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing status",
            });
        }

        // Call service to update booking
        const result = await bookingServices.updateBookingStatus(
            bookingId,
            status,
            userRole
        );

        const message =
            status === "cancelled"
                ? "Booking cancelled successfully"
                : "Booking marked as returned. Vehicle is now available";

        return res.status(200).json({
            success: true,
            message,
            data: result,
        });
    } catch (error: any) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export const bookingControllers = {
    createBooking,
    getBookings,
    updateBooking
};