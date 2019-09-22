import express from 'express'
import jwt from 'jsonwebtoken'
import users from "../models/user"
import bcryptjs from 'bcryptjs'
// import hash from '../heplpers/hash'
const saltRounds = 8

const app = express();

const hashPassword = password => {

    const hashedPassword = new Promise((resolve, reject) => {
        bcryptjs.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })
    console.log(hashedPassword)
    return hashedPassword
}
module.exports = hashPassword