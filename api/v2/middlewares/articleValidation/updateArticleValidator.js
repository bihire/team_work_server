import dateTime from "../../heplpers/date"

import joi from "joi"
export default (req, res, next) => {
    try {
        const token = res.token

        const {
            title,
            article,
            category
        } = req.body;

        if (category && !Array.isArray(category)) throw {
            status: 204,
            message: 'please provide categories inside an array named category'
        }
        const newCategory = []
        if (category) {
            function check(x) {
                return x.every(function (i) {
                    if (typeof i !== 'string') throw {
                        status: 204,
                        message: 'all categories must be strings and only contain the following characters: alphanumeric,spaces, -,_'
                    }
                    const mn = i.replace(/(^\ *)|(\ *$)/g, '').replace(/ +/g, " ")
                    newCategory.push(mn)
                    return mn.match(/^[a-z\d\-_\s]+$/i) ? true : false

                });
            }
            if (!check(category)) throw {
                status: 204,
                message: 'all categories must be strings and only contain the following characters: alphanumeric,spaces, -,_'
            }

        }

        const artl = {
            owner: token.id,
            title,
            article,
            updatedOn: dateTime
        };
        const schema = joi.object().keys({

            owner: joi
                .number()
                .integer()
                .required(),
            updatedOn: joi
                .date()
                .required(),

            article: joi
                .string()
                .regex(/^[a-zA-Z0-9]{3,25}/)
                .trim(),
            title: joi
                .string()
                .trim()
                .regex(/^[a-zA-Z0-9]{3,25}$/)
        });
        const { error, value } = joi.validate(artl, schema);

        if (error) {
            switch (error.details[0].context.key) {

                case "article":
                    res.status(400).send({
                        status: 204,
                        error: `article is compulsory and must contain between 3-25 characters`
                    });
                    break;

                case "title":
                    res.status(400).send({
                        status: "error",
                        error: `the title is compulsory and must contain between 3-25 characters`
                    });
                    break;


                default:
                    res.status(400).send({
                        status: "error",
                        error: `invalid information ${error}`
                    });
                    break;
            }
        } else {
            req.newValue = value;
            req.newCategory = newCategory.length === 0 ? undefined : newCategory;
            next();
        }
    } catch (error) {
        return res.status(400).json(error)
    }

};
