const express = require('express');
const router = express.Router();

// @route      GET api/goals/progress
// @desc       Test route
// @access     Public
router.get('/', (req, res) => res.send('Progress route'));

// @route      GET api/goals/new
// @desc       Adding goals
// @access     Private
router.post(
    '/progress/:id',
    [
      auth,
      [
        check('text', 'Text is required')
          .not()
          .isEmpty(),
          check('summary', 'Summary is required')
          .not()
          .isEmpty(),
          check('hours', 'Hours are required')
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
        // UserSchema:          PostSchema
        // - id                 - id
        // - name               - Creator: (User)
        // - email              - title
        // - password           - description
        // - date               - duration
        // - Posts/Goals as []  - from
        //                      - to
        //                      - completed
        //                      - progress: [
        //                        - text
        //                        - summary
        //                        - hours
        //                        - date
        //                        ]


        // Find the user who made the Goal
        const user = await User.findById(req.user.id).select('-password');
        

        const post = await Post.findById(req.params.id);
  
        const newProgress = {
          text: req.body.text,
          name: user.name,
          avatar: user.avatar,
          user: req.user.id
        };
  
        post.progress.unshift(newProgress);
  
        await post.save();
  
        res.json(post.progress);
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
// @route      GET api/goals/edit
// @desc       Editing goals by id
// @access     Private
router.put('/edit/:id', (req, res) => res.send('Edit progress'));

// @route      GET api/goals/delete
// @desc       Deleting goals
// @access     Private


// @route    DELETE api/posts/progress/:id/:comment_id
// @desc     Delete progress
// @access   Private
router.delete('/post/:id/:progress_id', auth, async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      // Pull out progress
      const progress = post.progresses.find(
        progress => progress.id === req.params.progress_id
      );
      // Make sure progress exists
      if (!progress) {
        return res.status(404).json({ msg: 'Progress does not exist' });
      }
      // Check user
      if (!req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      post.progresses = post.progresses.filter(
        ({ id }) => id !== req.params.progress_id
      );
  
      await post.save();
  
      return res.json(post.progress);
    } catch (error) {
      console.error(error.message);
      return res.status(500).send('Server Error');
    }
  });
module.exports = router;