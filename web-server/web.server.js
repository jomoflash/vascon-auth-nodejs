const express = require('express');
const router = express.Router();


router.get('', (req, res) => {
    // res.status(200).json({'data': 'Welcome to this page'});
    res.render('index')
});

router.get('/help', (req, res) => {
    res.render('help')
});

router.get('/about', (req, res) => {
    res.render('about')
});




module.exports = router;