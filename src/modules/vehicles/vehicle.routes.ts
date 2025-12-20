import { Router } from "express";
import app from "../../app";
import { vehicleControllers } from "./vehicle.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.post('/', auth("admin"), vehicleControllers.createVehicle)
router.get('/', vehicleControllers.getVehicles)
router.get('/:id', vehicleControllers.getSingleVehicle)
router.put('/:id', vehicleControllers.updateSingleVehicle)
router.delete('/:id', vehicleControllers.deleteSingleTodo)

export const vehicleRoutes = router;