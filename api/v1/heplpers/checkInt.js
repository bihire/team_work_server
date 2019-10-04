export default (obj) => {
    (req, res, next) => {
        try {
            if (!Number(obj)) throw res.status(403).json({
                // console.log(obj)
                status: 403,
                error: `the ${obj} must be an Integer`
            })
            next()
        } catch (error) {
            // res.send(`error: ${error}`)
        }
    }


}