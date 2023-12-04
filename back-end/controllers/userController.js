const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  // check auth
  auth: async (req, res) => {
    const token = req?.cookies?.userJwt;
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
          res.json({ success: false, message: err });
        } else {
          const userId = decoded.user;
          const userData = await User.findById(userId)
          res.json({ success: true, userData });
        }
      });
    } else {
      res.json({ success: false });
    }
  },

  // new user sign up
  signup: async (req, res) => {
    try {
      req.body.password = bcrypt.hashSync(req.body.password, 10);
      const newUser = await User.create(req.body);
      if (newUser) {
        const accessToken = jwt.sign(
          { user: newUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30d" }
        );
        res.cookie("userJwt", accessToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });
        res.json({ success: true });
      } else {
        throw new Error("something went wrong");
      }
    } catch (error) {
      if (error.code === 11000) {
        res.json({
          success: false,
          message: "already registered with this email",
        });
      } else {
        res.json({ success: false, message: error.message });
      }
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const isValidPassword = bcrypt.compareSync(
          password,
          existingUser.password
        );
        if (isValidPassword) {
          const accessToken = jwt.sign(
            { user: existingUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "30d" }
          );
          res.cookie("userJwt", accessToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });
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

  userData: async (req, res) => {
    try {
      const userId = req.params.userId;
      const userData = await User.findById(userId);
      res.json({success: true, userData})
    } catch (error) {
      res.json({success: false, message: 'something went wrong'})
    }
  },

  updateProfile: async (req, res) => {
    try {
      const filename = req?.file?.filename;
      const userId = req.body?.userId;

      if (filename) {
        req.body.profilePhoto = filename
      }
      
      const updatedUser = await User.findByIdAndUpdate(userId, {
        ...req.body,
      }, {
        upsert: true,
        new:true
      })
      if (updatedUser) {
        console.log(updatedUser);
        res.json({success: true, updatedUser})
      } else {
        throw new Error('something went wrong')
      }
    } catch (error) {
      if (error.code === 11000) {
        res.json({success: false, message: 'try with different email address'})
      } else {
        res.json({success: false, message: error})
      }
    }
  },

  logout: (req, res) => {
    res.cookie("userJwt", "", { maxAge: 1 });
    res.json({ success: true});
  },
};
