const express = require('express')
const router = express.Router()
const adminController = require("../controllers/adminController")

router.get('/', (req, res) => {
    res.send('helloo you are admin')
})

// to create an admin at first time
router.post('/sign-up', adminController.adminSignup)
// admin login verification
router.post('/login', adminController.adminLogin)
// admin-home page details providing
router.get('/users-list', adminController.dashboard)
// editing user info
router.post('/edit-user-data', adminController.editUserProfile)
// delete a specific user
router.post('/delete-user', adminController.deleteAUser)
// creating new user by admin
router.post('/create-user', adminController.addUser)


module.exports = router