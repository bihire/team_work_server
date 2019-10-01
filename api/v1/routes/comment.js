import express from 'express'
import commentController from '../controllers/commentController'
import jwt from "../middlewares/jwt"
import createComment from "../middlewares/commentValidation/createComment"
import updateArticle from "../middlewares/articleValidation/updateArticle"

const router = express.Router();
router.post("/articles/:articleId/comments", jwt, createComment, commentController.create);

export default router;