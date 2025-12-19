import { Router } from "express";
import app from "../../app";
import { vehicleControllers } from "./vehicle.controllers";

const router = Router();

router.post('/', vehicleControllers.createVehicle)
router.get('/', vehicleControllers.getVehicles)
router.get('/:id', vehicleControllers.getSingleVehicle)
router.put('/:id', vehicleControllers.updateSingleVehicle)

export const vehicleRoutes = router;