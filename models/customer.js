const { Schema, model } = require('mongoose');

const CustomerModel = Schema({
    name: {
        type: String,
        required: true
    }
});

module.exports = model('Customer', CustomerModel)