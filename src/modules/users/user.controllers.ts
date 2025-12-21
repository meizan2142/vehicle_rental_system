import { Request, Response } from "express";
import { userServices } from "./user.services";



const getUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUsers();
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getSingleUser(req.params.vehicledId!)
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            })
        }
        res.json(result.rows[0])
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateSingleUser = async (req: Request, res: Response) => {
    const { name, email, phone, role } = req.body;
    try {
        const result = await userServices.updateSingleUser(name, email, phone, role, req.params.vehicleId!);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const deleteSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteSingleUser(req.params.vehicleId!)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
                data: result.rows
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const userControllers = {
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
}