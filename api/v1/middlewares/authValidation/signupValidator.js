import users from "../../models/user"
import id_auto_inc from "../../heplpers/id_auto_inc"

import joi from "joi"
export default (req, res, next) => {
    const {
        firstName,
        lastName,
        email,
        address,
        password,
        confirmPassword,
        gender,
        jobRole,
        department,
        isAdmin
    } = req.body;
    const user = {
        id: id_auto_inc(users),
        firstName,
        lastName,
        email,
        address,
        password,
        confirmPassword,
        gender,
        jobRole,
        department,
        isAdmin
    };
    const schema = joi.object().keys({
        id: joi
            .number()
            .integer()
            .required(),
        firstName: joi
            .string()
            .regex(/^[a-zA-Z0-9\s]{3,25}$/)
            .trim()
            .required(),
        lastName: joi
            .string()
            .trim()
            .regex(/^[a-zA-Z0-9\s]{3,25}$/)
            .required(),
        email: joi
            .string()
            .email()
            .trim()
            .required(),
        password: joi
            .string()
            .regex(new RegExp("^[a-zA-Z0-9]{8,32}$"))
            .required(),
        gender: joi
            .string()
            .trim()
            .valid("male", "female", "other")
            .required(),
        jobRole: joi
            .string()
            .trim()
            .regex(/^[a-z\d\-_\s]+$/i)
            .required(),
        department: joi
            .string()
            .trim()
            .regex(/^[a-z\d\-_\s]+$/i)
            .required(),
        address: joi
            .string()
            .trim()
            .regex(/^[a-z\d\-_\s]+$/i)
            .required(),
        confirmPassword: joi
            .string()
            .required()
            .valid(joi.ref("password")),
        isAdmin: joi.boolean().default(false)
    });
    const { error, value } = joi.validate(user, schema);

    if (error) {
        switch (error.details[0].context.key) {
            case "password":
                res.status(400).send({
                    status: "error",
                    error: `password provided failed to match the following rules:
              <br>
              1. must contain the following charaters: lower case, upper case, integers
              <br>
              2. It must at least be 8 - 32 characters long
              `
                });
                break;

            case "email":
                res.status(400).send({
                    status: "error",
                    error: `you must provide a valid email`
                });
                break;

            case "firstName":
                res.status(400).send({
                    status: "error",
                    error: `the first name is compulsory and must contain between 3-25 characters`
                });
                break;

            case "lastName":
                res.status(400).send({
                    status: "error",
                    error: `the last name(s) is(are) compulsory and must contain between 3-25 characters`
                });
                break;

            case "confirmPassword":
                res.status(400).send({
                    status: "error",
                    error: `please provide identical passwords`
                });
                break;

            case "address":
                res.status(400).send({
                    status: "error",
                    error: `you must provide a valid address`
                });
                break;

            case "gender":
                res.status(400).send({
                    status: "error",
                    error: `allowed genders are male, female or other`
                });
                break;

            case "jobRole":
                res.status(400).send({
                    status: "error",
                    error: `you must provide a valid job role containing 3-25characters`
                });
                break;

            case "department":
                res.status(400).send({
                    status: "error",
                    error: `you must provide a valid department containing 3-25characters`
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
        delete value.confirmPassword
        req.value = value;
        next();
    }
};
