const express = require('express')
const router = express.Router()
const upload = require('../utility/multer')
const userController = require('../controllers/userController')

// new user
router.post('/sign-up', userController.signup)
// existing user login
router.post('/login', userController.login)
// auth check
router.get('/check-auth', userController.auth)
// logout
router.get('/logout', userController.logout)
// profile
router.get('/profile/:userId', userController.userData)
// update profile
router.post('/update-profile', upload.single('profilephoto'), userController.updateProfile)


module.exports = router




