import pg from 'pg'
export default new pg.Pool({
    user:'postgres',
    host:'localhost',
    database:'teamwork',
    password:'bobo1234',
    post: 5432,
})