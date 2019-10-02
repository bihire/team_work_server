import jsonwebtoken from "jsonwebtoken"
import express from "express"
import env from '../../../config/.env'

const app = express();

app.set(env.secret, "super-secret-secret");

export default (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jsonwebtoken.verify(token, app.get(env.secret), (err, token) => {
      if (err) {
        return res.status(404).json({
          status: "error",
          data: `failed to authanticate token: ${err}`
        });
      }
      res.token = token;
      next();
    });
  } else {
    res.status(403).json({
      status: "error",
      data: "please provide token"
    });
  }
};
