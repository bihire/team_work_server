export default (req, res, next) => {
    const token = res.token
    if (!token.isAdmin === true) throw res.status(405).json({
        status: 405,
        error: 'not allowed'
    })
    next()
}