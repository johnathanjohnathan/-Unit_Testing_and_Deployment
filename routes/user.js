const express = require('express')
const router = express.Router()
const UserController = require("../controllers/user_controller")
const auth = require('../middleware/auth.js')
const multer = require('multer')
const storage = require('../middleware/storage.js')

  
const upload = multer({ storage: storage })

router.post('/upload/:id', upload.single('profile_pictures'), UserController.upload)
router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/',auth, UserController.get)
router.get('/:id', UserController.getOne)
router.delete('/:id', UserController.delete)
router.patch('/:id', UserController.updateOne)

module.exports = router