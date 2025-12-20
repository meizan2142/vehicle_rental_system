import { Router } from "express";
import { userControllers } from "./user.controllers";

const router = Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getUsers);
router.get('/:userId', userControllers.getUsers);
router.put('/:userId', userControllers.updateSingleUser);



export const userRoutes = router;