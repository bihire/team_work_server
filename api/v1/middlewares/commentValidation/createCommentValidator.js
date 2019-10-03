import comments from "../../models/comment"
import dateTime from "../../heplpers/date"

import joi from "joi"
export default (req, res, next) => {
    try {
        const token = res.token
        const id_auto_inc = comments.length <= 0 ? 1 : comments[comments.length - 1].id + 1;
        const { articleId } = req.params
        const { comment } = req.body;

        const cmnt = {
            id: id_auto_inc,
            owner: token.id,
            articleId,
            comment,
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
            articleId: joi
                .number()
                .integer()
                .required(),
            updatedOn: joi
                .date()
                .required(),
            createdOn: joi
                .date()
                .required(),
            comment: joi
                .string()
                .regex(/^[a-z\d\-_\s]+$/i)
                .trim()
                .required(),

        });
        const { error, value } = joi.validate(cmnt, schema);

        if (error) {
            switch (error.details[0].context.key) {

                case "comment":
                    res.status(400).send({
                        status: 204,
                        error: `all categories must be strings and only contain the following characters: alphanumeric,spaces, -,_`
                    });
                    break;


                default:
                    res.status(400).send({
                        status: "error",
                        error: `invalid information`
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

}
