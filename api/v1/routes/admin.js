import express from 'express'
import adminController from '../controllers/adminController'
import admin from "../middlewares/adminValidation/admin"

import jwt from "../middlewares/jwt"

const router = express.Router()
router.get("/admin/articles", jwt, admin, adminController.fetch_article)
router.get("/admin/comments", jwt, admin, adminController.fetch_comment)

export default router