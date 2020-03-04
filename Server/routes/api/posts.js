const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Middleware
const auth = require("../../middleware/auth");

// Models
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route      GET api/goals
// @desc       Test route
// @access     Public
router.get("/", (req, res) => res.send("Goals route"));

// @route      POST api/goals/new
// @desc       Adding goals
// @access     Private

router.post(
  "/new",
  //[
  //auth,
  [
    check("title", "Title is required")
      .not()
      .isEmpty(),
    check("desc", "Description is required")
      .not()
      .isEmpty(),
    check("duration", "Duration is required")
      .not()
      .isEmpty()
  ],
  //]
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, desc, dura } = req.body;


    try {
      // Initialize user
      const user = await User.findById(req.user.id).select("-password");


      // Initialize newPost
      const newPost = new Post({
        user: req.user.creator,
        title: req.body.text,
        desc: req.body.text,
        dura: req.body.text
      });

      // Save new post
      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      // Server errors
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

// @route      GET api/goals/edit
// @desc       Editing goals by id
// @access     Private
router.put("/edit/:id", (req, res) => res.send("New goals"));

// @route      GET api/goals/delete
// @desc       Deleting goals
// @access     Private

module.exports = router;
