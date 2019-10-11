const { User } = require('../models')

class DashboardController{
    async store(req, res){
        const { email, password } = req.body
        const user = await User.findOne({ where: { email }})

        if(!user)
            return res.status(401).json({ message: '_USER_NOT_FOUND_' })
        
        if(!(await user.checkPassword(password)))
            return res.status(401).json({ message: '_USER_OR_PASS_INCORRECT_'})

        return res.status(200).send({ user, token: user.generateToken() })
    }
}

module.exports = new DashboardController()