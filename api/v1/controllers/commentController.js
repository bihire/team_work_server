import articles from "../models/article";
import comments from "../models/comment";
export default new class CommentController {
    async create(req, res) {
        try {
            const value = req.value
            const validId = articles.find(obj => obj.id === value.articleId)
            if (!validId) throw res.status(404).json({
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
            res.status(400).json(error)
        }

    }
}