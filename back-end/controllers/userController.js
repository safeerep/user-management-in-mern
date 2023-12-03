const User = require('../models/userModel')
const bcrypt = require('bcrypt')

module.exports = {
    // new user sign up
    signup : async (req, res) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 10)
            const newUser = await User.create(req.body);
            if (newUser) {
                res.json({success: true})
            } else {
                throw new Error('something went wrong')
            } 
        } catch (error) {
            if (error.code === 11000) {
                res.json({success: false, message: 'already registered with this email'})
            }
            else {
                res.json({success: false, message: error.message})
            }
        }
    }, 

    login : async (req, res) => {
        try {
            const {email, password} = req.body;
            const existingUser = await User.findOne({email: email})
            if (existingUser) {
                const isValidPassword = bcrypt.compareSync(password, existingUser.password)
                if (isValidPassword) {
                    res.json({success: true})
                } else {
                    res.json({success: false, message: 'Invalid credentials'})
                }
            } else {
                res.json({success: false, message: 'Invalid credentials'})
            }    
        } catch (error) {
            res.json({success: false, message: 'Something went wrong'})
        }
    }
}