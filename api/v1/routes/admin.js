import express from 'express'
import adminController from '../controllers/adminController'
import adminIgnoreController from '../controllers/adminIgnoreController'
import admin from "../middlewares/adminValidation/admin"

import jwt from "../middlewares/jwt"

const router = express.Router()
router.get("/admin/articles", jwt, admin, adminController.fetch_article)
router.get("/admin/comments", jwt, admin, adminController.fetch_comment)

// -------------- Admin can ignore flagged ----------------------

router.delete("/admin/:flagId/ignore/articles", jwt, admin, adminIgnoreController.article)
router.delete("/admin/:flagId/ignore/comments", jwt, admin, adminIgnoreController.comment)

export default router