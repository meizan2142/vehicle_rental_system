"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_services_1 = require("./auth.services");
const registerUser = async (req, res) => {
    try {
        const result = await auth_services_1.authServices.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User Registered Successfully.",
            data: result.rows[0],
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_services_1.authServices.loginUser(email, password);
        res.status(200).json({
            success: true,
            message: "Login Successful",
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.authController = {
    registerUser,
    loginUser
};
