import { Router } from "express";
import { userControllers } from "./user.controllers";

const router = Router();

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getSingleUser);
router.put('/:id', userControllers.updateSingleUser);



export const userRoutes = router;