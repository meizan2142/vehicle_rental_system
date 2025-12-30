import { Router } from "express";
import { userControllers } from "./user.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.get('/', auth("admin"), userControllers.getUsers);
router.get('/:userId', auth("admin"),  userControllers.getSingleUser);
router.put('/:userId', auth("admin", "customer"),  userControllers.updateSingleUser);
router.delete('/:userId', auth("admin"),  userControllers.deleteSingleUser);



export const userRoutes = router;