const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const fetchuser = require("../middleware/fetchuser");

const JWT_SEC = "vinaya$k"; // keep secret and protected

// Router 1: create a user using post request : Post : localhost:5000/api/auth/createuser (No Login required)

router.post(
  "/createuser",
  [
    // check that the email is a valid email
    check("email", "Enter valid Email").isEmail(),
    // check that the name is at least 3 characters long
    check("name", "Enter valid Name").isLength({ min: 3 }),
    // check that the password is at least 8 characters long
    check("password", "Length should be greater than 8").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a response with a status code of 400 (Bad Request) and the errors array
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if a user with the same email address already exists in the database
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      // Return a response with a status code of 500 (Internal Server Error)
      return res.status(500).json({ user: "user already exist" });
    }

    // Create a new user document and save it to the database
    try {
      // generate a salt and hash the password
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      }).catch((error) => {
        // Return a response with a status code of 500 (Internal Server Error)
        res.status(500).send("some internal error ocured");
        console.log({
          error,
        });
      });
      // create a payload for the JWT
      const data = {
        user: {
          id: user._id,
        },
      };
      console.log(data);
      // sign the JWT with the payload and the secret
      var authtoken = jwt.sign(data, JWT_SEC);
      res.json({ authtoken });
    } catch (error) {
      // Return a response with a status code of 500 (Internal Server Error) and the error message
      res.status(500).send("some error ocured");
      console.log(error.message);
    }
  }
);

//Router 2:Authentivate a user using post requestn: Post : localhost:5000/api/auth/login

router.post(
  "/login",
  [
    check("email", "Enter valid Email").isEmail(),
    check("password", "Enter password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    // Check if there are validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Return a response with a status code of 400 (Bad Request)
      return res.status(400).json("Enter valid credentials");
    }

    let { email, password } = req.body;

    try {
      // check user exist or not
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("Enter valid credentials");
      }

      // check pasword entered is correct or not
      let validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json("Enter valid credentials");
      }
      console.log(validPassword);

      const data = {
        user: {
          id: user._id,
        },
      };
      console.log({ email });
      // sign the JWT with the payload and the secret
      var authtoken = jwt.sign(data, JWT_SEC);
      // reponse with token
      res.json({ authtoken });
    } catch (error) {
      // Return a response with a status code of 500 (Internal Server Error) and the error message
      res.status(500).send("some error ocured");
      console.log(error.message);
    }
  }
);

//Router 3:Get details of Logged in User: Post : localhost:5000/api/auth/getuser (Login required)

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const data = await User.findById(userid).select("-password");
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Error Ocured");
  }
});

module.exports = router;
