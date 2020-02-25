const express = require('express');
const router = express.Router();

// @route      GET api/goals
// @desc       Test route
// @access     Public
router.get('/', (req, res) => res.send('Goals route'));

module.export = router;