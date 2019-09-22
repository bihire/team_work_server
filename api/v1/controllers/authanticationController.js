import express from 'express'
import jwt from 'jsonwebtoken'
import users from "../models/user"
import bcryptjs from 'bcryptjs'
import hashPassword from '../heplpers/hash'
import comparePassword from '../heplpers/compareHash'
const saltRounds = 8

const app = express();

// hashPassword("boris")

// We also need a secret to encode/decode our JWTs
app.set("appSecret", "super-secret-secret");
export default {
    async register(req, res) {
        try {
            const value = await req.value;
            const User = users.find(user => user.email === value.email);
            if (User)
                throw res.status(401).json({
                    message: "Email provided already exist"
                });
            value.password = await hashPassword(value.password)
            users.push(value);
            const token = jwt.sign(value, app.get("appSecret"));
            res.status(201).send({
                status: 201,
                message: "User created successfully",
                data: value
            });


        } catch (error) {
            res.status(400).send({
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
            const isUser = await comparePassword({ value, User })

            if (isUser) {
                const token = jwt.sign(User, app.get('appSecret'));
                res.status(200).json({
                    status: 200,
                    data: token
                })
            } else {
                res.status(401).json({ status: 401, error: 'fuck or password do not match' });
            }

        } catch (error) {
            res.status(403).send({
                status: 'error',
                error: `invalid email or password:   ${error}`
            });
        }
    }
};
