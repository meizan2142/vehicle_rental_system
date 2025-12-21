import { Router } from "express";
import { userControllers } from "./user.controllers";

const router = Router();

router.get('/', userControllers.getUsers);



export const userRoutes = router;