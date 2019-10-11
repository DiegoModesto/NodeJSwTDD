const routes = require('express').Router()
const SessionController = require('./app/controllers/SessionControllers')
const authMiddleware = require('./app/middleware/auth')
const { check } = require('express-validator')

routes.get('/', (req, res) => {
    return res.json({ message: 'teste '})
})
routes.post('/sessions', SessionController.store)
routes.post('/sessions/create', [
    check('name', '_NAME_DONT_MATCH_').matches(/^(?=.*[a-zA-Z0-9])/g),
    check('name', '_NAME_IS_TOO_SHORT_').isLength({ min: 5 }),
    
    check('email', '_EMAIL_IS_NOT_VALID_EMAIL_').isEmail(),

    check('password', '_PASSWORD_DONT_MATCH_').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9_@./#&+-]{8,}/g),
    check('retype_password').custom((value, { req }) => {
        if(value !== req.body.password)
            throw new Error('_PASSWORDS_IS_NOT_EQUALS_')
        return true
    })
], SessionController.create)


/*authenticates*/
routes.use(authMiddleware)
routes.get('/dashboard', (req, res) => { return res.status(200).json() })

module.exports = routes