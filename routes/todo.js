const express = require('express')
const router = express.Router()
const TodoController = require("../controllers/todo_controller.js")

router.post('/', TodoController.register)
router.get('/', TodoController.get)
router.get('/:id', TodoController.getOne)
router.delete('/:id', TodoController.delete)
router.patch('/:id', TodoController.updateOne)

module.exports = router