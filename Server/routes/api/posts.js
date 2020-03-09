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

// @route      GET api/posts
// @desc       Get all posts
// @access     Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// @route      GET api/posts/:id
// @desc       Get post by ID
// @access     Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error");
  }
});

// @route      POST api/posts/new
// @desc       Adding a new post
// @access     Private

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

    const { title, desc, dura, from, to, completed, progress } = req.body;

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

// @route      DELETE api/posts/:id
// @desc       Delete a post
// @access     Private

router.delete("/:id", auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      // Check if post exists
      if (!post) {
        return res.status(404).json({ msg: "Post not found" });
      }
      // Check user
      if (post.creator !== req.user.id) {
        return res.status(401).json({ msg: "User not authorized" });
      }
  
      await post.remove();
  
      res.json({ msg: "Post removed" });
    } catch (error) {
      console.error(error.message);
      if (error.kind === "ObjectId") {
        return res.status(404).json({ msg: "Post not found" });
      }
      res.status(500).send("Server error");
    }
  });

module.exports = router;
