import express from 'express'
import AdminController from '../controllers/adminController'
import AdminIgnoreController from '../controllers/adminIgnoreController'
import AdminDeleteController from '../controllers/adminDeleteController'
import admin from "../middlewares/adminValidation/admin"

import jwt from "../middlewares/authJWT"

const router = express.Router()

// -------------- Admin can get all flagged ----------------------

router.get("/articles", jwt, admin, AdminController.fetch_article)
router.get("/comments", jwt, admin, AdminController.fetch_comment)

// -------------- Admin can ignore flagged ----------------------

router.delete("/:flagId/ignore/articles", jwt, admin, AdminIgnoreController.article)
router.delete("/:flagId/ignore/comments", jwt, admin, AdminIgnoreController.comment)

// --------------- Admin can delete flagged items ----------------

router.delete("/:flagId/delete/articles", jwt, admin, AdminDeleteController.article)
router.delete("/:flagId/delete/comments", jwt, admin, AdminDeleteController.comment)

export default router