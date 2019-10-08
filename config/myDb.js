import { Pool } from 'pg'
import env from 'dotenv'
env.config()
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'teamwork',
    password: 'bobo1234',
    post: 5432,
})
pool.connect((err,res,done)=> {
    if(err) {
        console.log(err)
    } else {
    console.log('connected to the Database');        
    }
})


export default pool