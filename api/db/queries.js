const conn = require('./knexconn');

module.exports = {
    user: {
        getAllUser() {
            return conn('users');
        },

        getUserById(id) {
            return conn('users').where('id', id);
        },

        getByUsername(username) {
            return conn('users').where('username', username).first();
        },
        create(data) {
            return conn('users').insert(data);
        },
        update(user) {
            return conn('users').where({id: user[0].id}).update(user.newData);
        }
    }
};