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

//--------------------------------------------------//
// @route      POST api/users
// @desc       Register new user
// @access     Public

// @route      POST api/users
// @desc       Register user
// @access     Public
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "please include a valid email").isEmail(),
    check(
      "password",
      "please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
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
//--------------------------------------------------//



//--------------------------------------------------//
// @route      GET api/users/:id
// @desc       Find one user by ID
// @access     Public

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find().sort({ date: -1 });
    res.json(allUsers);
  } catch (error) {
    // Error
    res.status(500).send("Server error");
  }
});

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

// @route      DELETE api/user/:id
// @desc       Delete user by ID
// @access     Private

router.delete("/:user_id", auth, async (req, res) => {
  try {
    // Get user
    const user = await req.params.id
    // If user doesn't exist
    if (!user) {
      // Return JSON error message
      return res.status(404).json({ msg: "User not found" });
    }

    await User.remove(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
