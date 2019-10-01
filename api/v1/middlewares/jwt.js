import jwt from "jsonwebtoken"
import express from "express"

const app = express();

app.set("appSecret", "super-secret-secret");

export default (req, res, next) => {
  const { token } = req.headers;
  if (token) {
    jwt.verify(token, app.get("appSecret"), (err, token) => {
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
