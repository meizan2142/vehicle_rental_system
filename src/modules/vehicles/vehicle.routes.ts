import { Router } from "express";
import app from "../../app";
import { vehicleControllers } from "./vehicle.controllers";

const router = Router();

router.post('/', vehicleControllers.createVehicle)
router.get('/', vehicleControllers.getVehicles)

export const vehicleRoutes = router;