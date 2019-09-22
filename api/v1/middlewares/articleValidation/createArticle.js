// const users = require("../../models/user");
// import JSON from 'circular-json'
import articles from "../../models/article"
import { dateTime } from "../../heplpers/date"


const joi = require("joi");
module.exports = (req, res, next) => {
    try {
        const token = res.token
        const id_auto_inc = articles.length <= 0 ? 1 : articles[articles.length - 1].id + 1;

        const {
            title,
            article,
            category
        } = req.body;
        if (!category) throw {
            status: 204,
            message: 'please provide atleast one category'
        }
        if (!Array.isArray(category)) throw {
            status: 204,
            message: 'please provide categories inside an array named category'
        }
        function check(x) {
            return x.every(function (i) {
                const mn = i.replace(/(^\ *)|(\ *$)/g, '').replace(/ +/g, " ")
                return mn.match(/^[a-z\d\-_\s]+$/i) ? true : false

            });
        }
        if (!check(category)) throw {
            status: 204,
            message: 'all categories must be strings and only contain the following characters: alphanumeric,spaces, -,_'
        }



        const artl = {
            id: id_auto_inc,
            owner: token.id,
            title,
            article,
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
            updatedOn: joi
                .date()
                .required(),
            createdOn: joi
                .date()
                .required(),
            article: joi
                .string()
                .regex(/^[a-zA-Z0-9]{3,25}/)
                .trim()
                .required(),
            title: joi
                .string()
                .trim()
                .regex(/^[a-zA-Z0-9]{3,25}$/)
                .required(),
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
                        error: `invalid information`
                    });
                    break;
            }
        } else {
            req.value = value;
            req.category = category;
            next();
        }
    } catch (error) {
        return res.status(400).json(error)
    }

};
