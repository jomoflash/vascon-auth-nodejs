const Validator = require('validatorjs');

const rules = {
    'password': ['required', 'min:5', 'max:15', 'regex:/^(?=.*[A-Za-z])(?=.*?[#?!@$%^&*-]).{5,}$/'],
    'username': 'required|email'
}

const customError = {
    'regex.password': "Invalid username or password",
    'email.username': "Invalid username or password"
}

const validate = (data = {}) => {
    return new Validator(data, rules, customError)

}

module.exports = validate;