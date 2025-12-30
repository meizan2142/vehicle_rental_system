import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";

const createVehicle = async (req: Request, res: Response) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    try {
        const result = await vehicleServices.createVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getVehicles = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getVehicles();
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            })
        }
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getSingleVehicle(req.params.vehicleId!)
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Vehicle retrieved successfully",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateSingleVehicle = async (req: Request, res: Response) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    try {
        const result = await vehicleServices.updateSingleVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.vehicleId as string)
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Vehicle updated successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

const deleteSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.deleteSingleVehicle(req.params.vehicleId!)

        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully"
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const vehicleControllers = {
    createVehicle,
    getVehicles,
    getSingleVehicle,
    updateSingleVehicle,
    deleteSingleTodo
}