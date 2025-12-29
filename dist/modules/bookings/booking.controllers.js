"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingControllers = void 0;
const booking_services_1 = require("./booking.services");
const createBooking = async (req, res) => {
    try {
        const data = req.body;
        const result = await booking_services_1.bookingServices.createBooking(data);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create booking",
            error: error.message
        });
    }
};
const getBookings = async (req, res) => {
    try {
        const loggedInUser = req.user;
        console.log("loggedInUser:", loggedInUser);
        if (loggedInUser.role === "admin") {
            const result = await booking_services_1.bookingServices.getAllBookingsForAdmin();
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
        const result = await booking_services_1.bookingServices.getBookingsForCustomer(customerId);
        return res.status(200).json({
            success: true,
            message: "Your bookings retrieved successfully",
            role: "customer",
            data: result.rows,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const updateBooking = async (req, res) => {
    try {
        const bookingId = Number(req.params.bookingId);
        const { status } = req.body || {};
        console.log(req.body); // showing undefined
        const userRole = req.user.role;
        console.log(userRole);
        // Validate request
        if (!status || !["cancelled", "returned"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid or missing status",
            });
        }
        // Call service to update booking
        const result = await booking_services_1.bookingServices.updateBookingStatus(bookingId, status, userRole);
        const message = status === "cancelled"
            ? "Booking cancelled successfully"
            : "Booking marked as returned. Vehicle is now available";
        return res.status(200).json({
            success: true,
            message,
            data: result,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.bookingControllers = {
    createBooking,
    getBookings,
    updateBooking
};
