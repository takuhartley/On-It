const express = require('express');
const router = express.Router();

// @route      GET api/goals/progress
// @desc       Test route
// @access     Public
router.get('/', (req, res) => res.send('Progress route'));

// @route      GET api/goals/new
// @desc       Adding goals
// @access     Private
router.post('/new', (req, res) => res.send('New progress'));

// @route      GET api/goals/edit
// @desc       Editing goals by id
// @access     Private
router.put('/edit/:id', (req, res) => res.send('Edit progress'));

// @route      GET api/goals/delete
// @desc       Deleting goals
// @access     Private

module.export = router;