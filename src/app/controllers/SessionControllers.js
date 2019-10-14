const { User } = require('../models')
const { validationResult } = require('express-validator')

class SessionController{
    async store(req, res){
        console.log('Searching User')
        const { email, password } = req.body
        console.log('Body request', `Email: ${email} -> Password: ${password}`)
        const user = await User.findOne({ where: { email }})
        console.log('User: ', user)
        
        if(!user)
            return res.status(401).json({ message: '_USER_NOT_FOUND_' })
        
        if(!(await user.checkPassword(password)))
            return res.status(401).json({ message: '_USER_OR_PASS_INCORRECT_'})

            console.log('Its returned')
        return res.status(200).send({ user, token: user.generateToken() })
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