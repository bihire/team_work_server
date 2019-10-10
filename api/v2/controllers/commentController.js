import { pool } from '../../../config/myDb'

export default class CommentController {
    static async create(req, res) {
        try {
            const value = req.value
            const articleId = value.articleId
            const findOne = 'SELECT * FROM articles WHERE id = $1'
            const commentText = ('INSERT INTO comments(owner , article_id , comment, updated_on, created_on) VALUES($1,$2,$3,$4,$5) RETURNING *')
            const values = [value.owner, value.articleId, value.comment, value.updatedOn, value.createdOn]
            pool.connect(async (err, client) => {
                if (err) throw err
                client.query(findOne, [articleId], async (error, resp) => {
                    if (error) throw error
                    try {
                        if (!resp.rows[0]) {
                            throw res.status(404).send({
                                status: 'error',
                                error: `article ${articleId} does not exist`
                            });
                        }
                        client.query(commentText, values, async (error, response) => {
                            if (error && error.detail) throw res.status(404).send({
                                status: 201,
                                error: error.detail
                            })
                            if (error) throw error
                            try {
                                return res.status(201).send({
                                    status: 201,
                                    message: `comment successfully created`,
                                    data: {
                                        articleTitle: resp.rows[0].title,
                                        article: resp.rows[0].article,
                                        comment: response.rows[0].comment,
                                        createdOn: response.rows[0].created_on
                                    }
                                });
                            } catch (error) {
                                return res.status(500).send({
                                    status: 500,
                                    error: `the following error happened ${error}, we will fix it soon`
                                })
                            }
                        })
                    } catch (error) {
                        return res.status(500).send({
                            status: 500,
                            error: `the following error happened ${error}, we will fix it soon`
                        })
                    }
                })
            })
        } catch (error) {
            res.status(400).send(error)
        }

    }
}