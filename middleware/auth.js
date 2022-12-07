const jwt = require('jsonwebtoken')
const validate = () => {
    return (req, res, next) => {
        if (req.headers.authorization.split(' ')[0] === 'Bearer') {
            let token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
                if (err) {
                    res.status(400).json({
                        err: 1,
                        message: 'Invalid Token'
                    })
                }
                else {
                    next()
                }
            })
        }
        else {
            res.status(400).json({
                err: 1,
                message: 'Please provide a token'
            })
        }
    }
}
module.exports = validate