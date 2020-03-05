const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Middleware
const auth = require("../../middleware/auth");

// Models
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route      GET api/posts/me
// @desc       Get current users profile
// @access     Private
router.get("/me", auth, async (req, res) => {
  try {
    const post = await Post.findOne({
      user: req.user.id
    }).populate("user", "name");

    // If no profile
    if (!post) {
      return res.status(400).json({ msg: "There is no post for this user" });
    }
    // If is profile
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route      POST api/posts/new
// @desc       Adding goals
// @access     Private

router.post(
  "/new",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("desc", "Description is required")
        .not()
        .isEmpty(),
      check("dura", "Duration is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, desc, dura } = req.body;

    // Build profile object
    const postFields = {};
    postFields.user = req.creator.id;
    if (title) profileFields.title = title;
    if (desc) profileFields.desc = desc;
    if (dura) profileFields.dura = dura;

    try {
      // Initialize user
      let post = await Post.findOne({ user: req.user.id });

      if (post) {
        // Update
        post = await Post.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        // Entire Profile
        return res.json(post);
      }

      // Create new Post
      newPost = new Post(postFields);

      // Save
      await newPost.save();
      res.json(newPost);
    } catch (error) {
      // Server errors
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

router.post(
  "/",
  [
    auth,
    [
      check("title", "Title is required")
        .not()
        .isEmpty(),
      check("desc", "Description is required")
        .not()
        .isEmpty(),
      check("dura", "Duration is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      desc,
      dura,
      from,
      to,
      completed,
      progress
    } = req.body;

    // Build profile object
    const postFields = {};
    postFields.user = req.user.id;
    if (title) postFields.title = title;
    if (desc) postFields.desc = desc;
    if (dura) postFields.dura = dura;
    if (from) postFields.from = from;
    if (to) postFields.to = to;
    if (completed) postFields.completed = completed;
    if (progress) {
      postFields.progress = progress.split(",").map(skill => skill.trim());
    }

    try {
      let post = await Post.findOne({ user: req.user.id });

      if (post) {
        // Update
        post = await Post.findOneAndUpdate(
          { user: req.user.id },
          { $set: postFields },
          { new: true }
        );
        // Entire Post
        return res.json(post);
      }
      // Create
      post = new Post(postFields);

      // Save
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
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
