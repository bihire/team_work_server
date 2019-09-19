import express from 'express'
import jwt from 'jsonwebtoken'
import users from "../models/user"

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

            users.push(value);
            const token = jwt.sign(value, app.get("appSecret"));
            await res.status(201).send({
                status: 201,
                message: "User created successfully",
                data: token
            });
        } catch (error) {
            await res.status(400).send({
                message: `error: ${error}`
            });
        }
    },
    async login(req, res) { }
};
