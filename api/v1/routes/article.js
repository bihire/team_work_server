import express from 'express'
import articleController from '../controllers/articleController'
import jwt from "../middlewares/jwt"
import createArticle from "../middlewares/articleValidation/createArticle"
import updateArticle from "../middlewares/articleValidation/updateArticle"

const router = express.Router();
router.post("/articles", jwt, createArticle, articleController.create);
router.patch("/articles/:articleId", jwt, updateArticle, articleController.update);
// router.post("/auth/signin", signin, authanticationController.login);

export default router;
