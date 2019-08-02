'use strict';

// Load mongoose library
const mongoose = require('mongoose');
const conn = mongoose.connection;


// Handle connection event
conn.on('error', error => {
    console.log('Connection error', error);
    process.exit(1);
});

conn.on('open', () => {
    console.log('Connected with MongoDB on', conn.name);

    // Delete all the database content ( deleteMany )
    deleteAllAdverts();
    // Insert all the adverts.json into the DB ( insertMany )
    loadAdvertsFile();
});

async function deleteAllAdverts() {
    try{
        let advertModel = require('../models/Advert');

        let advertsDeleted = await advertModel.deleteMany({}).exec();
        console.log(advertsDeleted.n + ' adverts were successfully deleted.');
    } catch(error) {
        conn.emit('error', error);
    }
}

 function loadAdvertsFile() {
    try{
        let advertsJson = require('../data/adverts.json');
        let advertModel = require('../models/Advert');

        advertModel.insertMany(advertsJson).then( (docs) => {
            console.info(docs.length + ' adverts were successfully stored.');
        } );

    } catch(error) {
        conn.emit('error', error);
    }
}

// Handle deprecation warnings
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);

// Connect with MongoDB
mongoose.connect('mongodb://localhost/nodepop');

// Export the connection (optional --> we could get from mongoose.connection)
module.exports = conn;