'use strict';

// Load mongoose library
const mongoose = require('mongoose');
const conn = mongoose.connection;

// Handle connection event
conn.on('error', error => {
    console.log('Connection error', error);
    process.exit(1);
});

conn.once('open', () => {
    console.log('Connected with MongoDB on', conn.name);
});

// Handle deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

// Connect with MongoDB
mongoose.connect('mongodb://localhost/nodepop');

// Export the connection (optional --> we could get from mongoose.connection)
module.exports = conn;