"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRoutes = void 0;
const express_1 = require("express");
const vehicle_controllers_1 = require("./vehicle.controllers");
const auth_1 = __importDefault(require("../../middleware/auth"));
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.default)("admin"), vehicle_controllers_1.vehicleControllers.createVehicle);
router.get('/', vehicle_controllers_1.vehicleControllers.getVehicles);
router.get('/:vehicleId', vehicle_controllers_1.vehicleControllers.getSingleVehicle);
router.put('/:vehicleId', (0, auth_1.default)("admin"), vehicle_controllers_1.vehicleControllers.updateSingleVehicle);
router.delete('/:vehicleId', (0, auth_1.default)("admin"), vehicle_controllers_1.vehicleControllers.deleteSingleTodo);
exports.vehicleRoutes = router;
