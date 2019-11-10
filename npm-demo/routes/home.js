const express = require('express');

let router = express.Router();

// register routes
router.get('/', (req, res) => res.send('hello world'));

module.exports = router;
