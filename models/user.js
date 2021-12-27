const { links } = require('express/lib/response');
const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

model.exports = model('User', schema)