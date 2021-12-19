const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 7
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    contact: {
        type: String,
        required: true,
        max: 10,
        min: 10
    },
    date: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', UserSchema);