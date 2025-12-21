import { Router } from "express";
import { userControllers } from "./user.controllers";

const router = Router();

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getSingleUser);



export const userRoutes = router;