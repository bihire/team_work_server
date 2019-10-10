import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on("connect", () => {
  console.log("connected to the Database");
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
  pool
    .query(userTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const createArticleTables = () => {
  const articleTable = `CREATE TABLE IF NOT EXISTS
      articles(
        id SERIAL PRIMARY KEY,
        owner INTEGER REFERENCES users (id),
        title VARCHAR NOT NULL,
        article VARCHAR NOT NULL,
        updated_on TIMESTAMP NOT NULL,
        created_on TIMESTAMP NOT NULL
      )`;
  pool
    .query(articleTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const createArticleCategories = () => {
  const categoryTable = `CREATE TABLE IF NOT EXISTS
      categories(
        article_id INTEGER REFERENCES articles (id),
        category VARCHAR
      )`;
  pool
    .query(categoryTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const createArticleComments = () => {
  const commentTable = `CREATE TABLE IF NOT EXISTS
      comments(
        id SERIAL PRIMARY KEY,
        owner INTEGER REFERENCES users (id),
        article_id INTEGER REFERENCES articles (id),
        comment VARCHAR NOT NULL,        
        updated_on TIMESTAMP NOT NULL,
        created_on TIMESTAMP NOT NULL
      )`;
  pool
    .query(commentTable)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

const createAllTables = () => {
  createTables();
  createArticleTables();
  createArticleCategories();
  createArticleComments();
};

pool.on("remove", () => {
  console.log("client removed");
  process.exit(0);
});

module.exports = { createAllTables, pool };
require("make-runnable");
