const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel")
const Admin = require("../models/adminModel");

module.exports = {
  // to create an admin at first time
  adminSignup: async (req, res) => {
    try {
        req.body.password = bcrypt.hashSync(req.body.password, 10);
        const newAdmin = await Admin.create(req.body);
        if (newAdmin) {
          res.json({ success: true });
        } else {
          res.json({ success: false });
        }
    } catch (error) {
        if (error.code === 11000) {
            res.json({success: false, message: 'already existing'})
        }
        else {
            res.json({success: false, message: 'something went wrong'})
        }
    }
  },

  // admin login verification
  adminLogin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingAdmin = await Admin.findOne({ email: email });
      if (existingAdmin) {
        const isValidPassword = await bcrypt.compare(
          password,
          existingAdmin.password
        );
        if (isValidPassword) {
          res.json({ success: true });
        } else {
          res.json({ success: false, message: "Invalid credentials" });
        }
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    } catch (error) {
      res.json({ success: false, message: "Something went wrong" });
    }
  },

  dashboard : async ( req, res) => {
    const searchEmail = req.query.searchEmail || '';
    try {
      const users = await User.find({email: {
        $regex: searchEmail,
        $options: "i",
      }});
      res.json({success: true, users})
    } catch (error) {
      res.json({success: false})
    }
  }, 

  addUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      if (newUser) {
         res.json({success: true})
      }
      else {
        res.json({success: false})
      }
    } catch (error) {
      if (error.code === 11000) {
        res.json({success: false, message: 'already registered'})
      } else {
        res.json({ success: false, message: 'something went wrong'})
      }
    }
  },

  editUserProfile: async (req, res) => {
    try {
      console.log(req.body);
      const userId = req.body.id
      const updatedUser = await User.findByIdAndUpdate(userId, {...req.body})
      if (updatedUser) {
        res.json({success: true})
      } else {
        res.json({success: false, message: 'something went wrong'})
      }
    } catch (error) {
      if (error.code === 11000) {
        res.json({success: false, message: 'already registered email'})
      }
      else {
        res.json({success: false, message: 'something went wrong'})
      }
    }
  }, 

  deleteAUser: async (req, res) => {
    try {
      const user = req.body.currentUser;
      const deleteUser = await User.findByIdAndDelete(user._id)
      if (deleteUser) res.json({success: true})
      else res.json({success: false, message: 'something went wrong'})
    } catch (error) {
      res.json({success: false, message: 'An error occured'})
    }
  }
};
