const express = require('express');
const router = express.Router();

// Route to Homepage of Site
router.get('/', function(req, res) {
    res.render("index", {
        title: "Main Page"
    });
});

module.exports = router;