"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_services_1 = require("./user.services");
const db_1 = require("../../config/db");
const getUsers = async (req, res) => {
    try {
        const result = await user_services_1.userServices.getUsers();
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getSingleUser = async (req, res) => {
    try {
        const result = await user_services_1.userServices.getSingleUser(req.params.userId);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No users found"
            });
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateSingleUser = async (req, res) => {
    const { name, email, phone, role } = req.body;
    try {
        const result = await user_services_1.userServices.updateSingleUser(name, email, phone, role, req.params.userId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0]
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const deleteSingleUser = async (req, res) => {
    const id = req.params.userId;
    try {
        const userBooking = await db_1.pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [id]);
        if (userBooking.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Can't delete user because he has bookings",
            });
        }
        const result = await user_services_1.userServices.deleteSingleUser(id);
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "user not found",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.userControllers = {
    getUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
};
