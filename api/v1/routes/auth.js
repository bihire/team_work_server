import express from 'express'
import authanticationController from '../controllers/authanticationController'
import signup from "../middlewares/validation/signup"

const router = express.Router();
router.post("/auth/signup", signup, authanticationController.register);

export default router;
