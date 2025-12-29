import { Request, Response } from "express";
import { userServices } from "./user.services";
import { pool } from "../../config/db";



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
        const result = await userServices.getSingleUser(req.params.userId!)
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No users found"
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
        const result = await userServices.updateSingleUser(name, email, phone, role, req.params.userId!);
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
    const id = req.params.userId;
    try {
        const userBooking = await pool.query(
            `SELECT * FROM bookings WHERE customer_id=$1`, [id]
        )
        if (userBooking.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Can't delete user because he has bookings",
            })
        }

        const result = await userServices.deleteSingleUser(id);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        } else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}



export const userControllers = {
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
}