const { Todo } = require('../models')

class TodoController {
    
    static async register(req,res,next) {
        const {title, completed, user_id} = req.body
        const data = await Todo.create(
            {
                title, completed, user_id
            }
        )
        res.status(200).json(data) 
    }

    static async get(req, res, next) {
        const {userId} = req.query
        const data = await Todo.findAll({
            where : { user_id : userId}
        })

        res.status(200).json(data)
    }

    static async updateOne(req, res, next) {
        const { id } = req.params
        const { title, completed, user_id } = req.body
        const data = await Todo.update(
            { title: title,
                completed: completed,
                user_id: user_id
             },
            {
              where: {
                id: id,
              }
            },
          )
        res.status(200).json({
            message: "Data Succesfully Updated"
        })
    }

    static async getOne(req, res, next) {
        const { id } = req.params
        const data = await Todo.findByPk(id)

        res.status(200).json(data)
    }

    static async delete(req,res,next){
        const { id } = req.params
        const data = await User.destroy(
            {where: {
                id: id}})
        res.status(200).json(
            {
                message: "Succesfully Deleted"
            }
        )
    }
}

module.exports = TodoController