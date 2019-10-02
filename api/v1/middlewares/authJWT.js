import jsonwebtoken from "jsonwebtoken"
import express from "express"

const app = express();

app.set(process.env.secret, "super-secret-secret");

export default (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jsonwebtoken.verify(token, app.get(process.env.secret), (err, token) => {
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
