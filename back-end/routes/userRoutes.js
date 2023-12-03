const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// new user
router.post('/sign-up', userController.signup)
// existing user login
router.post('/login', userController.login)


module.exports = router




