import articleFlags from "../../models/articleFlag"
import dateTime from "../../heplpers/date"
import id_auto_inc from "../../heplpers/id_auto_inc"

const joi = require("joi");
export default (req, res, next) => {
    try {
        const token = res.token
        const { articleId } = req.params
        const { articleFlag } = req.body;

        const flag = {
            id: id_auto_inc(articleFlags),
            owner: token.id,
            articleId,
            articleFlag,
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
            articleFlag: joi
                .string()
                .regex(/^[a-z\d\-_\s]+$/i)
                .trim()
                .required(),

        });
        const { error, value } = joi.validate(flag, schema);

        if (error) {
            switch (error.details[0].context.key) {

                case "articleFlag":
                    res.status(400).send({
                        status: 204,
                        error: `article flag must be a string and only contain the following characters: alphanumeric,spaces, -,_`
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

};
