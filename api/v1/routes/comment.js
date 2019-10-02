import express from 'express'
import CommentController from '../controllers/commentController'
import jwt from "../middlewares/authJWT"
import createComment from "../middlewares/commentValidation/createComment"

const router = express.Router();
router.post("/:articleId/comments", jwt, createComment, CommentController.create);

export default router;