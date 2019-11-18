'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    email: { type: String, unique: true }, // Unique index (emails should be unique)
    password: String
});



UserSchema.statics.hashPassword = function(plainPassword) {
    return bcrypt.hash(plainPassword, 10);
}


const User = mongoose.model('User', UserSchema);

module.exports = User;