import articleFlags from "../models/articleFlag";
import commentFlags from "../models/commentFlag";
import findByIndex from '../heplpers/findByIndex'
import checkInt from '../heplpers/checkInt'

export default class AdminIgnoreController {
    /**
   * @description This helps the admin to delete just the flag on an article
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   */
    static async article(req, res) {
        const { flagId } = req.params
        const checkInteger = checkInt(flagId)
        if (checkInteger === false) throw res.status(403).json({
            status: 403,
            error: 'flagId must be an integer, greater than 0 and contain less or equal to 8 characters long'
        })
        const validId = findByIndex(articleFlags, flagId)

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
    static async comment(req, res) {
        const { flagId } = req.params
        const checkInteger = checkInt(flagId)
        if (checkInteger === false) throw res.status(403).json({
            status: 403,
            error: 'flagId must be an integer, greater than 0 and contain less or equal to 8 characters long'
        })
        const validId = findByIndex(commentFlags, flagId)
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