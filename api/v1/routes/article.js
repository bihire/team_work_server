import express from 'express'
import articleController from '../controllers/articleController'
import jwt from "../middlewares/jwt"
import createArticle from "../middlewares/articleValidation/createArticle"

const router = express.Router();
router.post("/articles", jwt, createArticle, articleController.create);
// router.post("/auth/signin", signin, authanticationController.login);

export default router;
