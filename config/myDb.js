import { Pool } from 'pg'
import env from 'dotenv'
env.config()
const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    post: process.env.POST,
})

pool.on('connect', () => {
    console.log('connected to the Database');
});

const createTables = () => {
    const userTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(25) NOT NULL,
        email VARCHAR(25) UNIQUE NOT NULL,
        last_name VARCHAR(25) NOT NULL,
        address VARCHAR(128) NOT NULL,
        department VARCHAR(25) NOT NULL,
        is_admin BOOLEAN NOT NULL,
        gender VARCHAR(25) NOT NULL,
        job_role VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL
      )`;
    pool.query(userTable)
        .then((res) => {
            console.log(res);
            pool.end();
        })
        .catch((err) => {
            console.log(err);
            pool.end();
        });
};

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});


module.exports = { createTables, pool };
require('make-runnable')