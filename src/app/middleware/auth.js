const jwt = require('jsonwebtoken')
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader)
        return res.status(401).json({ message: '_TOKEN_NOT_PROVIDE_'})

    const [, token] = authHeader.split(' ')

    try {
        const decoded = await promisify(jwt.verify)(token, process.env.APP_SECRET)
        req.user_id = decoded.id

        return next()

    } catch (error) {
        return res.status(401).json({ message: '_TOKEN_INVALID_'})
    }
}