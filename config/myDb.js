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
pool.connect((err,res,done)=> {
    if(err) {
        console.log(err)
    } else {
    console.log('connected to the Database');        
    }
})


export default pool