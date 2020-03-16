const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

// Models
const Post = require("../../models/Post");
const User = require("../../models/User");

// @route      POST api/posts
// @desc       Create a post
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

    try {
      // Initialize user
      const user = await User.findById(req.user.id).select("-password");
      // Initialize newPost
      const newPost = new Post({
        title: req.body.title,
        desc: req.body.desc,
        dura: req.body.dura,
        creator: req.user.id
      });
      // Save post
      const post = await newPost.save();

      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  }
);

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
    if (post.creator.toString() !== req.user.id) {
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

// @route    POST api/post/progress/:id
// @desc     Add progress on a post
// @access   Private
router.post(
  "progress/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);
      const newProgress = {
        text: req.body.text,
        summary: req.body.summary,
        hours: req.body.hours,
        creator: user.name
      };
      post.progress.unshift(newProgress);
      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
