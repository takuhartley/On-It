const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware


// User models
const User = require("../../models/User");

// @route      POST api/users
// @desc       Register user
// @access     Public
router.post(
  "/",
  [
    // Name Validations
    check("name", "Name is required")
      .not()
      .isEmpty(),

    // Email Validations
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // Error Validation Results
    const errors = validationResult(req);
    // If there is an error
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructuring
    const { name, email, password } = req.body;


    try {
      // See if user exists
      let user = await User.findOne({
        email
      });
      // If user exists
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Setting new User
      user = new User({
        name,
        email,
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

module.exports = router;
