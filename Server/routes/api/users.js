const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// User models
const User = require("../../models/User");

// @route      GET api/users
// @desc       See list of users
// @access     Private

// @route      POST api/users
// @desc       Register user
// @access     Public
router.post(
  "/",
  [
    check("name", "Please enter your name")
      .not()
      .isEmpty(),
    check("email", "Please enter your email")
      .not()
      .isEmpty(),
    check("password", "Please enter a password")
      .not()
      .isEmpty()
  ],
  async (req, res) => {

    // Initializing Errors
    const errors = validationResult(req);

    // Displaying Errors through JSON
    if (!errors.isEmpty()) {
      
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({
        email
      });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      user = new User({
        name,
        email,
        avatar,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        // Experation
        { expiresIn: 360000 },
        // Error
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      // Server error
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route      PUT api/users/:usr_id
// @desc       Edit user
// @access     Private
// router.put('/', (req, res) {
//     console.log("list all users")
// });

// @route      DELETE api/users/:usr_id
// @desc       Delete user
// @access     Private
// router.delete('/', (req, res) {
//     console.log("list all users")
// })
