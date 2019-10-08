import articles from "../models/article";
import comments from "../models/comment";
import articleFlags from "../models/articleFlag";
import commentFlags from "../models/commentFlag";
import validId from "../heplpers/findById";

export default class FlagController {
    static async article(req, res) {
        try {
            const value = req.value
            const articleId = value.articleId
            if (!validId(articles, articleId)) throw res.status(404).json({
                status: 404,
                error: 'article not found'
            })
            if (validId.owner === value.owner) throw res.status(403).json({
                status: 403,
                error: 'you can not flag on you own article'
            })
            articleFlags.push({ ...value })
            res.status(201).json({
                status: 201,
                message: 'flag successfully created',
                data: {
                    id: value.id,
                    createdOn: value.createdOn,
                    articleTitle: validId.title,
                    article: validId.article,
                    flag: value.articleFlag
                }
            })
        } catch (error) {
            res.status(400).json(error)
        }

    }
    static async comment(req, res) {
        try {
            const value = req.value
            const commentId = value.commentId
            if (!validId(comments, commentId)) throw res.status(404).json({
                status: 404,
                error: 'comment not found'
            })
            if (validId.owner === value.owner) throw res.status(403).json({
                status: 403,
                error: 'you can not flag on your own comment'
            })
            commentFlags.push({ ...value })
            res.status(201).json({
                status: 201,
                message: 'flag successfully created',
                data: {
                    id: value.id,
                    createdOn: value.createdOn,
                    comment: validId.comment,
                    flag: value.commentFlag
                }
            })
        } catch (error) {
            res.status(400).json(error)
        }
    }
}