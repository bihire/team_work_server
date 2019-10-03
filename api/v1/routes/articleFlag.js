import express from 'express'
import FlagController from '../controllers/flagController'
import authanticationJWT from "../middlewares/authJWT"
import flagArticleValidator from "../middlewares/flagValidation/flagArticleValidator"
import flagCommentValitator from "../middlewares/flagValidation/flagCommentValitator"

const router = express.Router();
router.post("/:articleId/articles", authanticationJWT, flagArticleValidator, FlagController.article);
router.post("/:commentId/comments", authanticationJWT, flagCommentValitator, FlagController.comment);

export default router