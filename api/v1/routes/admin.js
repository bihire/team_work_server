import express from 'express'
import AdminController from '../controllers/adminController'
import AdminIgnoreController from '../controllers/adminIgnoreController'
import AdminDeleteController from '../controllers/adminDeleteController'
import adminValidator from "../middlewares/adminValidation/adminValidator"

import authanticationJWT from "../middlewares/authJWT"

const router = express.Router()

// -------------- Admin can get all flagged ----------------------

router.get("/articles", authanticationJWT, adminValidator, AdminController.fetch_article)
router.get("/comments", authanticationJWT, adminValidator, AdminController.fetch_comment)

// -------------- Admin can ignore flagged ----------------------

router.delete("/:flagId/ignore/articles", authanticationJWT, adminValidator, AdminIgnoreController.article)
router.delete("/:flagId/ignore/comments", authanticationJWT, adminValidator, AdminIgnoreController.comment)

// --------------- Admin can delete flagged items ----------------

router.delete("/:flagId/delete/articles", authanticationJWT, adminValidator, AdminDeleteController.article)
router.delete("/:flagId/delete/comments", authanticationJWT, adminValidator, AdminDeleteController.comment)

export default router