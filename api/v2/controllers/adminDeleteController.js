import articleFlags from "../models/articleFlag"
import articles from "../models/article"
import categories from "../models/category"
import comments from '../models/comment'
import commentFlags from "../models/commentFlag"
import findByIndex from "../heplpers/findByIndex"


export default class AdminDeleteController {
    /**
    * @description This helps the admin to delete a flagged article, its flags and comments
    * @param  {object} req - The request object
    * @param  {object} res - The response object
    */
    static async article(req, res) {
        const { flagId } = req.params
        const validFlag = articleFlags.findIndex(article => article.id == flagId)
        if (validFlag === -1) {
            throw res.status(404).send({
                status: 404,
                message: "flag does not exist"
            });
        }
        const findFlag = articleFlags.find(x => x.id == flagId)
        const articleId = findFlag.articleId

        const validId = findByIndex(articles, articleId)
        if (validId === -1) {
            throw res.status(404).send({
                status: 404,
                message: "article does not exist"
            });
        }

        const brp = categories.filter(obj => obj.articleId == articleId)
        const cmnt = comments.filter(obj => obj.articleId == articleId)
        const flgz = articleFlags.filter(obj => obj.articleId == articleId)
        articles.splice(validId, 1)
        brp.forEach(f => categories.splice(categories.findIndex(e => e.articleId == f.articleId), 1))
        cmnt.forEach(f => comments.splice(comments.findIndex(e => e.articleId == f.articleId), 1))
        flgz.forEach(f => articleFlags.splice(articleFlags.findIndex(e => e.articleId == f.articleId), 1))

        res.status(200).json({
            status: 200,
            message: 'article successfully deleted and every thing assiciated'
        })

    }
    /**
     * @description This helps the admin to delete a flagged comments and their flags
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async comment(req, res) {
        const { flagId } = req.params
        const validFlag = findByIndex(commentFlags, Number(flagId))
        if (validFlag === -1) {
            throw res.status(404).send({
                status: 404,
                message: "flag does not exist"
            });
        }
        const flgz = commentFlags.filter(obj => obj.commentId == flagId)

        flgz.forEach(f => commentFlags.splice(commentFlags.findIndex(e => e.articleId == f.articleId), 1))
        comments.splice(validFlag, 1)

        res.json({
            status: 204,
            message: 'comment successfully deleted and every thing assiciated'

        })
    }
}