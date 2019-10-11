const routes = require('express').Router()
const SessionController = require('./app/controllers/SessionControllers')
const authMiddleware = require('./app/middleware/auth')

routes.post('/sessions', SessionController.store)


/*authenticates*/
routes.use(authMiddleware)
routes.get('/dashboard', (req, res) => { return res.status(200).json() })

module.exports = routes