import arraySort from 'array-sort'
import articleFlags from "../models/articleFlag";
import commentFlags from "../models/commentFlag";
import articles from "../models/article";
import comments from "../models/comment";


export default class AdminController {
    /**
     * @description This helps the admin to fetch all flagged comments
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async fetch_article(req, res) {
        const data = []
        articleFlags.forEach(flag => {
            const article = articles.find(x => x.id == flag.articleId)
            if (!article) throw res.status(404).json({
                status: 404,
                error: `article related to flag with ID of ${flag.articleId} does not exist`

            })
            const g = {
                id: flag.id,
                articleId: flag.articleId,
                articleOwner: article.owner,
                commentOwner: flag.owner,
                title: article.title,
                article: article.article,
                articleFlag: flag.articleFlag,
                createdOn: flag.createdOn,

            }
            data.push({ ...g })
        })
        res.status(200).json({
            status: 200,
            message: "get all flagged articles successfully",
            data: arraySort(data, 'createdOn').reverse()
        })
    }
    /**
     * @description This helps the admin to fetch all flagged comments
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async fetch_comment(req, res) {
        const data = []
        commentFlags.forEach(flag => {
            const comment = comments.find(x => x.id == flag.commentId)
            if (!comment) throw res.status(404).json({
                status: 404,
                error: `article related to flag with ID of ${flag.commentId} does not exist`

            })
            const g = {
                id: flag.id,
                articleId: comment.articleId,
                commentId: flag.commentId,
                commentOwner: comment.owner,
                flagOwner: flag.owner,
                messageFlag: flag.commentFlag,
                createdOn: flag.createdOn,

            }
            data.push({ ...g })
        })
        res.status(200).json({
            status: 200,
            message: "get all flagged articles successfully",
            data: await arraySort(data, 'createdOn').reverse()
        })
    }
}
