import arraySort from 'array-sort'
import articles from "../models/article"
import categories from "../models/category"
import comments from '../models/comment'
import users from '../models/user'
import checkInt from '../heplpers/checkInt'

export default class ArticleController {
    /**
     * @description This helps the authorized Employee to create a new article
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */

    static async create(req, res) {
        const value = req.value
        const category = req.category
        category.forEach(obj => {
            categories.push({ category: obj, articleId: value.id })
        })

        articles.push({ ...value })

        const data = { ...value, category }
        res.status(201).json({
            status: 201,
            message: 'article created successfully',
            data
        })


    }
    /**
     * @description This helps the authorized Employee to update their article
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async update(req, res) {
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
    /**
    * @description This helps the authorized Employee  to get all articles sorted from the most recently added
    * @param  {object} req - The request object
    * @param  {object} res - The response object
    */
    static async get_all(req, res) {
        try {
            res.status(200).json({
                status: 200,
                message: 'success',
                data: arraySort(articles, 'updatedOn').reverse(),
            })
        } catch (error) {
            res.status(400).json(error)
        }

    }
    /**
    * @description This helps the authorized Employee can get one article if it exists
    * @param  {object} req - The request object
    * @param  {object} res - The response object
    */
    static async get_one(req, res) {
        try {
            const { articleId } = req.params
            checkInt(articleId)
            // const validId = articles.find(article => article.id == articleId)
            if (!validId) {
                throw res.status(404).send({
                    status: 'error',
                    error: "article does not exist"
                });
            }
            const brp = comments.filter(obj => {
                return obj.articleId == articleId
            })
            const data = { ...validId, comments: brp }
            res.status(200).json({
                status: 200,
                message: 'success',
                data
            })

        } catch (error) {
            res.status(400).json(error)
        }
    }
    /**
    * @description This helps the authorized Employee to get all their own articles
    * @param  {object} req - The request object
    * @param  {object} res - The response object
    */
    static async get_self(req, res) {
        const token = res.token
        const myArticles = articles.filter(obj => obj.owner === token.id)
        res.status(200).json({
            status: 200,
            message: 'found the following articles',
            data: arraySort(myArticles, 'updatedOn').reverse(),
        })

    }
    /**
    * @description This helps the authorized Employee to get all articles created by specific author
    * @param  {object} req - The request object
    * @param  {object} res - The response object
    */
    static async get_author_all(req, res) {
        const { authorId } = req.params

        const author = users.find(obj => obj.id == authorId)
        if (!author) throw res.status(404).json({
            status: 404,
            error: "author does not exist"
        })
        const myArticles = articles.filter(obj => obj.owner == authorId)

        res.status(200).json({
            status: 200,
            message: 'found the following articles',
            data: arraySort(myArticles, 'updatedOn').reverse(),
        })

    }
    /**
    * @description This helps the authorized Employee to delete their own articles if they exist
    * @param  {object} req - The request object
    * @param  {object} res - The response object
    */
    static async delete(req, res) {
        const { articleId } = req.params
        const token = res.token
        const item = articles.find(article => article.id == articleId)

        const validId = articles.findIndex(article => article.id == articleId)
        if (validId === -1) {
            throw res.status(404).send({
                status: 404,
                message: "article does not exist"
            });
        }
        if (token.id !== item.owner) throw res.status(405).send({
            status: 405,
            message: "you have no rights over this property"
        });

        const brp = categories.filter(obj => obj.articleId == articleId)
        const cmnt = comments.filter(obj => obj.articleId == articleId)
        articles.splice(validId, 1)
        brp.forEach(f => categories.splice(categories.findIndex(e => e.articleId == f.articleId), 1))
        cmnt.forEach(f => comments.splice(comments.findIndex(e => e.articleId == f.articleId), 1))

        res.status(200).json({
            status: 200,
            message: 'article successfully deleted'
        })
    }
}