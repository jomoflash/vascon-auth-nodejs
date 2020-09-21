const express = require('express');
const db = require('../db/knexconn')

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Return all Admins');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Getting Data for ${id}`)
});

router.post('/init', (req, res) => {
    const tableName = 'users';

    // db.schema.hasTable(tableName)
    //     .then()
    //     .catch()

    db.schema.createTable(tableName, (table) => {
        table.increments('id')
        table.string('username')
        table.string('password')
        table.string('first_name')
        table.string('last_name')
    })
        .then(() => {
            console.log("table created");
            res.status(201).send(`Table ${tableName} created`);
        })
        .catch((err) => {
            res.status(500).send(JSON.stringify(err));
        });
})


module.exports = router;