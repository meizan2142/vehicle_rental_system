import { Router } from "express";
import { userControllers } from "./user.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.get('/', auth("admin"), userControllers.getUsers);
router.get('/:userId', userControllers.getSingleUser);
router.put('/:userId', userControllers.updateSingleUser);
router.delete('/:userId', userControllers.deleteSingleUser);



export const userRoutes = router;