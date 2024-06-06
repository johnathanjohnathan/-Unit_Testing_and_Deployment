const express = require('express')
const router = express.Router()
const users = require('./user.js')
const todos = require('./todo.js')

router.use('/users',users)
router.use('/todos', todos)

module.exports = router
