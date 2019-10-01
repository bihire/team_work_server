import commentFlags from "../../models/commentFlag"
import { dateTime } from "../../heplpers/date"


const joi = require("joi");
export default (req, res, next) => {
    try {
        const token = res.token
        const id_auto_inc = commentFlags.length <= 0 ? 1 : commentFlags[commentFlags.length - 1].id + 1;
        const { commentId } = req.params
        const { commentFlag } = req.body;

        const flag = {
            id: id_auto_inc,
            owner: token.id,
            commentId,
            commentFlag,
            updatedOn: dateTime,
            createdOn: dateTime
        };
        const schema = joi.object().keys({
            id: joi
                .number()
                .integer()
                .required(),
            owner: joi
                .number()
                .integer()
                .required(),
            commentId: joi
                .number()
                .integer()
                .required(),
            updatedOn: joi
                .date()
                .required(),
            createdOn: joi
                .date()
                .required(),
            commentFlag: joi
                .string()
                .regex(/^[a-z\d\-_\s]+$/i)
                .trim()
                .required(),

        });
        const { error, value } = joi.validate(flag, schema);

        if (error) {
            switch (error.details[0].context.key) {

                case "commentFlag":
                    res.status(400).send({
                        status: 204,
                        error: `comment flag must be a string and only contain the following characters: alphanumeric,spaces, -,_`
                    });
                    break;


                default:
                    res.status(400).send({
                        status: "error",
                        error: `invalid information${error}`
                    });
                    break;
            }
        } else {
            req.value = value
            next();
        }
    } catch (error) {
        return res.status(400).json(error)
    }

};
