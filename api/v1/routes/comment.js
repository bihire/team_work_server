import express from 'express'
import CommentController from '../controllers/commentController'
import authanticationJWT from "../middlewares/authJWT"
import createCommentValidator from "../middlewares/commentValidation/createCommentValidator"

const router = express.Router();
router.post("/:articleId/comments", authanticationJWT, createCommentValidator, CommentController.create);

export default router;