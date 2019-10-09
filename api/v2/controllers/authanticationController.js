import express from 'express'
import jwt from 'jsonwebtoken'
import users from "../models/user"
import hashPassword from '../heplpers/hash'
import comparePassword from '../heplpers/compareHash'
import { pool } from '../../../config/myDb'

const app = express();

app.set(process.env.secret, "super-secret-secret");
export default class AuthanticationController {
    /**
     * @description This helps a new Employee to create credentials
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async register(req, res) {
        try {
            const value = await req.value;
            value.password = await hashPassword(value.password)
            const text = ('INSERT INTO users(department, email, "first_name", gender, job_role, last_name, password, address,is_admin) VALUES($1, $2, $3, $4, $5, $6,$7,$8,$9) RETURNING *')
            const values = [value.department, value.email, value.firstName, value.gender, value.jobRole, value.lastName, value.password, value.address, value.isAdmin]
            pool.connect(async (err, client, done) => {
                if (err) throw err
                client.query(text, values, async (error, response) => {
                    try {

                        if (error && error.routine === '_bt_check_unique') return res.status(401).json({
                            status: 401,
                            error: 'Email provided already exist'
                        })

                        const token = jwt.sign(response.rows[0], app.get(process.env.secret));
                        client.end()

                        return res.status(201).json({
                            status: 201,
                            message: "User created successfully",
                            data: token
                        });

                    } catch (error) {
                        return res.status(500).send({ 
                            status: 500,
                            error: `the following error happened ${error}, we will fix it soon`
                        })
                    }
                })
            })
        } catch(error){
            return res.status(500).send({ 
                status: 500,
                error: `the following error happened ${error}, we will fix it soon`
             })
        }
    }
    /**
     * @description This checks if it is a registered Employee and returns a token as a response
     * @param  {object} req - The request object
     * @param  {object} res - The response object
     */
    static async login(req, res) {
        try {
            const value = req.value;
            const fetch_text = 'SELECT * FROM users WHERE email = $1'
            const values= [value.email]
            pool.connect(async (err, client, done) => {
                if (err) throw err
                client.query(fetch_text, values, async (error, results) => {
                    if (error) throw error
                    try {

                        if(!results.rows[0])  return res.status(401).json({
                            message: 'invalid email or password'
                        });
                        const User = results.rows[0]
                        const isUser = await comparePassword({value, User})
                        if (isUser) {
                            const token = jwt.sign(User, app.get(process.env.secret));
                            res.status(200).json({
                                status: 200,
                                data: token
                            })
                        } else {
                        res.status(401).json({ status: 401, error: 'invalid email or password' });
                        }
                    } catch (error) {
                        return res.status(500).send({ 
                            status: 500,
                            error: `the following error happened ${error}, we will fix it soon`
                        })
                    }
                })
            })

        } catch (error) {
            res.status(403).send({
                status: 'error',
                error: `invalid email or password:   ${error}`
            });
        }
    }
};
