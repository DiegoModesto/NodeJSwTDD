const { User } = require('../models')
const { validationResult } = require('express-validator')

class SessionController{
    async store(req, res){
        const { email, password } = req.body
        
        User.findOne({ where: { email: email }})
            .then(x => {
                console.log('Success: ', x)
            })
            .catch(x => {
                console.log('Error: ', x)
            })

            return res.status(200).json({ message: 'Testando' })

        const user = await User.findOne({ where: { email }})
        
        
        if(!user)
            return res.status(401).json({ message: '_USER_NOT_FOUND_' })
        
        if(!(await user.checkPassword(password)))
            return res.status(401).json({ message: '_USER_OR_PASS_INCORRECT_'})

            console.log('Its returned')
        return res.status(200).send({ user: { id: user.id, name: user.name, email: user.email }, token: user.generateToken() })
    }

    async create(req, res){
        const { errors } = validationResult(req)

        if(errors.length > 0)
            return res.status(500).json({ message: errors.map(x => x.msg) })

        const { name, email, password } = req.body

        const userExist = await User.findOne({
            where: {
                email: email
            }
        })
        if(userExist)
            return res.status(500).json({ message: '_USER_ALREADY_EXIST_' })

        const user = await User.create({name, email, password})

        res.status(200).json({ token: user.generateToken() })
    }
}

module.exports = new SessionController()