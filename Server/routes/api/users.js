const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// Middleware
const auth = require("../../middleware/auth");

// User model
const User = require("../../models/User");

// @route      GET api/users/:id
// @desc       Find one user by ID
// @access     Public

router.get("/:id", auth, async (req, res) => {
  try {
    // Initialize finding user by ID
    const user = await User.findById(req.params.id);

    // If user doesn't exist
    if (!user) {
      // Return JSON error message
      return res.status(404).json({ msg: "User not found" });
    }

    // Change response into JSON format
    res.json(user);
  } catch (error) {
    // Server error
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route      POST api/users
// @desc       Register new user
// @access     Public
router.post(
  "/",
  [
    check("name", "Please enter your name")
      .not()
      .isEmpty(),
    check("email", "Please enter your email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // Initializing Errors
    const errors = validationResult(req);

    // Displaying Errors through JSON
    if (!errors.isEmpty()) {
      // Return formated errors to JSON array
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // See if user exists
      let userExists = await User.findOne({
        email
      });
      if (userExists) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Initialize new User
      newUser = new User({
        name,
        email,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      await newUser.save();

      // Return jsonwebtoken
      const payload = {
        newUser: {
          id: newUser.id
        }
      };

      // Sign the webtoken
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        // Experation
        { expiresIn: 3600000 },
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

// @route      DELETE api/user/:id
// @desc       Delete user by ID
// @access     Private


module.exports = router;
