import express from 'express'
import flagController from '../controllers/flagController'
import jwt from "../middlewares/jwt"
import flagArticle from "../middlewares/flagValidation/flagArticle"
import flagComment from "../middlewares/flagValidation/flagComment"

const router = express.Router();
router.post("/flags/:articleId/articles", jwt, flagArticle, flagController.article);
router.post("/flags/:commentId/comments", jwt, flagComment, flagController.comment);

export default router