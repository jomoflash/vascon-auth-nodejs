const express = require('express');

//Queries handler
const queries = require('../db/queries');

const validate_login = require('../middlware/validateLogin');
const validate_new = require('../middlware/validateUserData');
const passwordUtil = require('../middlware/passwordUtil');
const auth = require('../middlware/auth');

const router = express.Router();

// POST for saving new user data
router.post('/', (req, res,) => {
    //Ensure required fields are entered
    const { username, password, } = req.body;
    if (!username && !password) {
        return res.json({ err: 'Username or password is required' });
    }
    //validate
    const validate = validate_new(req.body);
    if (validate.fails()) {
        return res.status(401).json({ status: 'Failed', err: validate.errors });
    }
    //check if username or email alredy exist
    queries.user.getByUsername(username)
        .then(value => {
            if (value) return res.status(401).json({ status: `failed : email ${username} already exist` });

            // hash the password
            const data = req.body;
            data.password = passwordUtil.hash(password);

            // insert the data
            queries.user.create(data)
                .then(val => res.status(201).json({ status: 'success', val }))
                .catch(err => res.status(500).json(err));
        })
        .catch(err => {
            return res.status(500).json({ status: 'Inernal server error', err });
        });
});

//PUT for updating user data
router.put('/', auth.authenticateToken, (req, res) => {
    const id = req.user.id;
    queries.user.getUserById(id)
        .then(async user => {
            //validate
            const newData = req.body;
            const validate = validate_new(newData);
            if (validate.fails()) {
                return res.status(401).json({ status: 'Failed', err: validate.errors });
            }

            if (newData.password) {
                newData.password = passwordUtil.hash(newData.password);
            }


            //check if email is already used
            const data = await queries.user.getByUsername(newData.username);
            if (data) return res.status(401).json({ status: `failed : email ${username} already exist` });
            
            user.newData = newData
            
            queries.user.update(user)
                .then(val => {
                    res.status(201).json({ status: 'successfuly updated', val })
                })
                .catch(err => {
                    res.status(500).json({ status: 'update failed', err })
                })
        })
        .catch(err => res.json(err))
});


// POST /login for login
router.post('/login', (req, res) => {
    // Check that username or password is supplied
    const { username, password } = req.body;

    if (!username && !password) {
        return res.json({ err: 'Username or password is required' });
    }

    // validate supplied credentials
    const validate = validate_login(req.body);
    if (validate.fails()) {
        return res.status(401).json({ msg: "failed to login", err: validate.errors })
    }

    // fetch user data
    queries.user.getByUsername(username)
        .then(data => {
            if (!data) {
                return res.json({ status: 'No record found' })
            }

            //check that password matches
            if (passwordUtil.equals(password, data.password)) {
                const token = auth.generateAuthToken(data);
                return res.status(201).json({ status: 'success', data: data, token });
            } else {
                return res.status(401).json({ status: 'failed', msg: 'Invalid username or password' })
            }
        })
        .catch(err => res.json(err))
});

module.exports = router;
