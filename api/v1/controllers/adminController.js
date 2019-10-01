import arraySort from 'array-sort'
import articleFlags from "../models/articleFlag";
import commentFlags from "../models/commentFlag";
import articles from "../models/article";
import comments from "../models/comment";


export default {
    async fetch_article(req, res) {
        const data = []
        articleFlags.forEach(flag => {
            const article = articles.find(x => x.id == flag.articleId)
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
    },
    async fetch_comment(req, res) {
        const data = []
        commentFlags.forEach(flag => {
            const comment = comments.find(x => x.id == flag.commentId)
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
            data: arraySort(data, 'createdOn').reverse()
        })
    },
}
