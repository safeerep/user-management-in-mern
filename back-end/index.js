const express = require("express");
const cors = require("cors");
const session = require('express-session')
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const CONSTANTS = require("./constants/constants");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
require("./config/db")
require("dotenv").config();
const app = express();

const corsOptions = {
  origin: CONSTANTS.BASE_URL_OF_FRONT_END,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use("/", userRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend is running on the port ${PORT}`);
});
