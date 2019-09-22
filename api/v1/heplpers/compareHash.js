import express from 'express'
import jwt from 'jsonwebtoken'
import users from "../models/user"
import bcryptjs from 'bcryptjs'
// import hash from '../heplpers/hash'
const saltRounds = 8

const app = express();

const comparePassword = ({ value, User }) => {

    const hashedPassword = new Promise((resolve, reject) => {
        bcryptjs.compare(value.password, User.password, (err, hash) => {
            if (err) reject(err)
            if (hash) {
                resolve(true)
            } else {
                resolve(false)
                // res.status(401).json({ status: 401, error: 'fuck or password do not match' });
            }

        });
    })
    console.log(hashedPassword)
    return hashedPassword
}


module.exports = comparePassword