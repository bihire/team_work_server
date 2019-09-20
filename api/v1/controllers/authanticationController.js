import express from 'express'
import jwt from 'jsonwebtoken'
import users from "../models/user"
import bcryptjs from 'bcryptjs'
const saltRounds = 8

const app = express();

// We also need a secret to encode/decode our JWTs
app.set("appSecret", "super-secret-secret");
export default {
    async register(req, res) {
        try {
            const value = req.value;
            const User = users.find(user => user.email === value.email);
            if (User)
                throw res.status(401).json({
                    message: "Email provided already exist"
                });
            await bcryptjs.hash(value.password, saltRounds, (err, hash) => {
                value.password = hash
                users.push(value);
                const token = jwt.sign(value, app.get("appSecret"));
                res.status(201).send({
                    status: 201,
                    message: "User created successfully",
                    data: token
                });
                // Store hash in your password DB.
            });


        } catch (error) {
            await res.status(400).send({
                message: `error: ${error}`
            });
        }
    },
    async login(req, res) {
        try {
            const value = req.value;

            const User = users.find(user => user.email === value.email);
            if (!User) {
                throw res.status(401).json({
                    message: 'email or password do not match'
                });
            }
            console.log(User.password)
            await bcryptjs.compare(req.body.password, User.password, (err, hash) => {
                if (err) throw err
                if (hash) {
                    const token = jwt.sign(User, app.get('appSecret'));
                    res.status(200).json({
                        status: 200,
                        data: token
                    });
                } else {
                    return res.status(401).json({ status: 401, error: 'email or password do not match' });
                }

            });



        } catch (error) {
            res.status(403).send({
                status: 'error',
                error: `invalid email or password:   ${error}`
            });
        }
    }
};
