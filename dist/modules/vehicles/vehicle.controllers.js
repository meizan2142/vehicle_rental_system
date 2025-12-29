"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleControllers = void 0;
const vehicle_services_1 = require("./vehicle.services");
const createVehicle = async (req, res) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    try {
        const result = await vehicle_services_1.vehicleServices.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getVehicles = async (req, res) => {
    try {
        const result = await vehicle_services_1.vehicleServices.getVehicles();
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicle_services_1.vehicleServices.getSingleVehicle(req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateSingleVehicle = async (req, res) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    try {
        const result = await vehicle_services_1.vehicleServices.updateSingleVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0]
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const deleteSingleTodo = async (req, res) => {
    try {
        const result = await vehicle_services_1.vehicleServices.deleteSingleVehicle(req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.vehicleControllers = {
    createVehicle,
    getVehicles,
    getSingleVehicle,
    updateSingleVehicle,
    deleteSingleTodo
};
