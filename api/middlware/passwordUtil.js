const bcrypt = require('bcrypt');

const iterations = 10;

const hash = (value) => {
    return bcrypt.hashSync(value, iterations);
}
const equals = (value, hash) => {
    return bcrypt.compareSync(value, hash);
}

module.exports = {hash, equals}