import { Router } from "express";
import { userControllers } from "./user.controllers";

const router = Router();

router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getSingleUser);
router.put('/:id', userControllers.updateSingleUser);
router.delete('/:id', userControllers.deleteSingleUser);



export const userRoutes = router;