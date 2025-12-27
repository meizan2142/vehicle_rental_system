import { Router } from "express";
import { bookingControllers } from "./booking.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post("/", bookingControllers.createBooking);
router.get("/", auth("admin", "customer"), bookingControllers.getBookings)
export const bookingRoutes = router;