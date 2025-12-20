import { Router } from "express";
import { userControllers } from "./user.controllers";

const router = Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getUsers);
router.get('/:userId', userControllers.getUsers);



export const userRoutes = router;