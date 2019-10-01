import express from 'express'
import articleController from '../controllers/articleController'
import categoryController from '../controllers/categoryController'
import jwt from "../middlewares/jwt"
import createArticle from "../middlewares/articleValidation/createArticle"
import updateArticle from "../middlewares/articleValidation/updateArticle"

const router = express.Router();
router.post("/articles", jwt, createArticle, articleController.create);
router.patch("/articles/:articleId", jwt, updateArticle, articleController.update);
router.get("/feeds", jwt, articleController.get_all);
router.get("/articles/:articleId", jwt, articleController.get_one);
router.get("/me", jwt, articleController.get_self);
router.get("/articles/users/:authorId", jwt, articleController.get_author_all);
router.delete("/articles/:articleId", jwt, articleController.delete);
router.get("/articles/categories/:categoryName", jwt, categoryController.category);

export default router;
