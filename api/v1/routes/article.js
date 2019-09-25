import express from 'express'
import articleController from '../controllers/articleController'
import jwt from "../middlewares/jwt"
import createArticle from "../middlewares/articleValidation/createArticle"
import updateArticle from "../middlewares/articleValidation/updateArticle"

const router = express.Router();
router.post("/articles", jwt, createArticle, articleController.create);
router.patch("/articles/:articleId", jwt, updateArticle, articleController.update);
router.get("/feeds", jwt, articleController.get_all);

export default router;
