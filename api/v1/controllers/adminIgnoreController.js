import articleFlags from "../models/articleFlag";
import commentFlags from "../models/commentFlag";

export default new class AdminIgnoreController {
    /**
   * @description This helps the admin to delete just the flag on an article
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   */
    async article(req, res) {
        const { flagId } = req.params
        const validId = articleFlags.findIndex(article => article.id == flagId)
        if (validId === -1) {
            throw res.status(404).send({
                status: 404,
                message: "flag does not exist"
            });
        }
        articleFlags.splice(validId, 1)
        res.status(200).json({
            status: 204,
            massage: "flagged article successfully deleted"
        })
    }
    /**
   * @description This helps the admin to delete just the flag on a comment
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   */
    async comment(req, res) {
        const { flagId } = req.params
        const validId = commentFlags.findIndex(article => article.id == flagId)
        if (validId === -1) {
            throw res.status(404).send({
                status: 404,
                message: "flag does not exist"
            });
        }
        commentFlags.splice(validId, 1)
        res.status(200).json({
            status: 204,
            massage: "flagged comment successfully deleted"
        })
    }
}