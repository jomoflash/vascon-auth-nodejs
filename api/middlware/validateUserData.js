const Validator = require('validatorjs');

const rules = {
    'password': [ 'min:5', 'max:8', 'regex:/^(?=.*[A-Za-z])(?=.*?[#?!@$%^&*-]).{5,}$/'],
    'username': 'email',
    'first_name':'string',
    'last_name':'string'
}

const customError = {
    'regex.password': "Password must be between a minimum of 5 and a maximum of 8 with at-least one special character",
    'email.username': "Username must be a valid email address"
}

const validate = (data = {}) => {
    return new Validator(data, rules, customError)

}

module.exports = validate;