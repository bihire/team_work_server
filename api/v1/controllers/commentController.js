import { pool } from "../../../config/myDb";
export default class CommentController {
    static async create(req, res) {
        try {
            const value = req.value
            const articleId = value.articleId
            if (!validId(articles, articleId)) throw res.status(404).json({
                status: 404,
                error: 'article not found'
            })
            if (validId.owner === value.owner) throw res.status(403).json({
                status: 403,
                error: 'you can not comment on you own article'
            })
            comments.push({ ...value })
            res.status(201).json({
                status: 201,
                message: 'comment successfully created',
                data: {
                    createdOn: value.createdOn,
                    articleTitle: validId.title,
                    article: validId.article,
                    comment: value.comment
                }
            })
        } catch (error) {
            return res.status(500).send({
                status: 500,
                error: `the following error happened ${error}, we will fix it soon`
            })
        }
    }
}
