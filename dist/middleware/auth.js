"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken?.split(' ')[1];
            console.log(bearerToken);
            if (!token) {
                res.status(500).json({ message: "You're not allowed" });
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
            console.log(decoded);
            req.user = {
                id: decoded.id,
                role: decoded.role,
            };
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(500).json({
                    success: false,
                    message: "Unauthorized"
                });
            }
            next();
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    };
};
exports.default = auth;
