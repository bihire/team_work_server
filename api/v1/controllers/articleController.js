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

        articles.push({ ...value })

        // const data = Object.assign({}, value, { category })
        const data = { ...value, category }
        res.status(201).json({
            status: 201,
            message: 'article created successfully',
            data
        })


    },
    async update(req, res) {
        try {
            const { articleId } = req.params
            const value = req.newValue
            const category = req.newCategory

            let update = articles.find(article => article.owner == value.owner && article.id == articleId)
            if (update == undefined) {
                throw res.status(404).send({
                    status: 'error',
                    error: "the property doesn't exist"
                });
            }
            update.article = value.article ? value.article : update.article;
            update.title = value.title ? value.title : update.title;
            update.updatedOn = value.updatedOn ? value.updatedOn : update.updatedOn;

            const brp = categories.filter(obj => {
                return obj.articleId == articleId
            })
            if (category) {

                brp.forEach(f => categories.splice(categories.findIndex(e => e.articleId == f.articleId), 1))

                category.forEach(obj => {
                    categories.push({ category: obj, articleId: articleId })
                })
                const data = { ...update, category }
                return res.status(200).send({
                    status: 'success',
                    data
                });

            } else {
                const category = []
                brp.forEach(obj => {
                    return category.push(obj.category)
                })

                const data = { ...update, category }
                return res.status(200).send({
                    status: 'success',
                    data
                });
            }

        } catch (error) {
            res.status(400).json(error)
        }

    }
}