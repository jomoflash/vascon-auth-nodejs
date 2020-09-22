const express = require('express');
const router = express.Router();

const userUtil = require('../api/routes/users')

router.get('', (req, res) => {
    // res.status(200).json({'data': 'Welcome to this page'});
    res.render('index')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.post('/login', (req, res) => {
    
})




module.exports = router;