import express from 'express'
import commentController from '../controllers/commentController'
import jwt from "../middlewares/jwt"
import createComment from "../middlewares/commentValidation/createComment"
import updateArticle from "../middlewares/articleValidation/updateArticle"

const router = express.Router();
router.patch("/articles/:articleId", jwt, createComment, commentController.create);
// router.patch("/articles/:articleId", jwt, updateArticle, articleController.update);
// router.post("/auth/signin", signin, authanticationController.login);

export default router;