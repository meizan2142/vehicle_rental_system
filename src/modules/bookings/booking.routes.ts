import { Router } from "express";
import { bookingControllers } from "./booking.controllers";

const router = Router();

router.post("/", bookingControllers.createBooking);
router.get("/", bookingControllers.getBookings);


export const bookingRoutes = router;