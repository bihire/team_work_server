import express from 'express'
import authanticationController from '../controllers/authanticationController'
import signup from "../middlewares/validation/signup"
import signin from "../middlewares/validation/signin"

const router = express.Router();
router.post("/auth/signup", signup, authanticationController.register);
router.post("/auth/signin", signin, authanticationController.login);

export default router;
