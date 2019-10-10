import articles from "../models/article";
import comments from "../models/comment";
import validId from "../heplpers/findById";
export default class CommentController {
  static async create(req, res) {
    try {
      const value = req.value;
      const articleId = value.articleId;
      if (!validId(articles, articleId))
        throw res.status(404).json({
          status: 404,
          error: "article not found"
        });
      if (validId.owner === value.owner)
        throw res.status(403).json({
          status: 403,
          error: "you can not comment on you own article"
        });
      comments.push({ ...value });
      res.status(201).json({
        status: 201,
        message: "comment successfully created",
        data: {
          createdOn: value.createdOn,
          articleTitle: validId.title,
          article: validId.article,
          comment: value.comment
        }
      });
    } catch (error) {
      res.status(400).json(error);
    }
  }
}

USER = postgres;
host = localhost;
PORT = 5432;
DATABASE = teamwork;
// PASSWORD = bobo1234;
