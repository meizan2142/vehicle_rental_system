import { Router } from "express";
import { userControllers } from "./user.controllers";
import auth from "../../middleware/auth";

const router = Router();

router.get('/', auth("admin"), userControllers.getUsers);
router.get('/:vehicledId', userControllers.getSingleUser);
router.put('/:vehicledId', userControllers.updateSingleUser);
router.delete('/:vehicledId', userControllers.deleteSingleUser);



export const userRoutes = router;