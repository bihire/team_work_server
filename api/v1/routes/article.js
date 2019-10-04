import express from 'express'
import ArticleController from '../controllers/articleController'
import CategoryController from '../controllers/categoryController'
import authanticationJWT from "../middlewares/authJWT"
import createArticleValidator from "../middlewares/articleValidation/createArticleValidator"
import updateArticleValidator from "../middlewares/articleValidation/updateArticleValidator"

const router = express.Router();
router.post("/articles", authanticationJWT, createArticleValidator, ArticleController.create);
router.patch("/articles/:articleId", authanticationJWT, updateArticleValidator, ArticleController.update);
router.get("/feeds", authanticationJWT, ArticleController.get_all);
router.get("/articles/:articleId", authanticationJWT, ArticleController.get_one);
router.get("/me", authanticationJWT, ArticleController.get_self);
router.get("/articles/authors/:authorId", authanticationJWT, ArticleController.get_author_all);
router.delete("/articles/:articleId", authanticationJWT, ArticleController.delete);
router.get("/articles/categories/:categoryName", authanticationJWT, CategoryController.fetch_by_category);

export default router;
