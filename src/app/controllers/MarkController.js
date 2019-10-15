const { User, Pointer, PointerMark } = require('../models')

class DashboardController{
   async create(req, res){
        const { user_id } = req
        

        return res.status(200).send({ message: "create" })
    }
}

module.exports = new DashboardController()