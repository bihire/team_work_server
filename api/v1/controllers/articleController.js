import app from '../../../app'
import jwt from 'jsonwebtoken'
import articles from "../models/article"
import categories from "../models/category"

export default {
    async create(req, res) {
        const value = req.value
        const category = req.category
        category.forEach(obj => {
            categories.push({ category: obj, articleId: value.id })
        })
        console.log(categories)
        articles.push(value)

        value.category = category
        const data = value
        res.status(201).json({
            status: 201,
            message: 'article created successfully',
            data
        })
    }
}