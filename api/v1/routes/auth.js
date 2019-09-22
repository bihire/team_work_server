import express from 'express'
import authanticationController from '../controllers/authanticationController'
import signup from "../middlewares/authValidation/signup"
import hash from "../heplpers/hash"
import signin from "../middlewares/authValidation/signin"

const router = express.Router();
router.post("/auth/signup", signup, authanticationController.register);
router.post("/auth/signin", signin, authanticationController.login);

export default router;
