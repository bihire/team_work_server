import express from 'express'
import FlagController from '../controllers/flagController'
import jwt from "../middlewares/authJWT"
import flagArticle from "../middlewares/flagValidation/flagArticle"
import flagComment from "../middlewares/flagValidation/flagComment"

const router = express.Router();
router.post("/:articleId/articles", jwt, flagArticle, FlagController.article);
router.post("/:commentId/comments", jwt, flagComment, FlagController.comment);

export default router