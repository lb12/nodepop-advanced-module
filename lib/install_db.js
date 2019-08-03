'use strict';

const conn = require('./connectMongoose');
const Advert = require('../models/Advert');


conn.once('open', () => {
    installDB()
    .then( () => {
        closeDBConnection();
    })
    .catch( error => {
        console.error('Something went wrong installing database.', error);
    });
});


async function installDB() {
    await deleteAllAdvertsFromDB();
    await loadAdvertsFileIntoDB();
}


async function deleteAllAdvertsFromDB() {
    try {
        let advertsDeleted = await Advert.deleteMany({}).exec(); // {} => no filters, so all db data is gonna be deleted

        console.log(advertsDeleted.n + ' adverts were successfully deleted.');
    } catch(error) {
        conn.emit('error', error);
    }
}

async function loadAdvertsFileIntoDB() {
    try {
        let advertsJson = require('../data/adverts.json'); // static json with some adverts preloaded

        let docsInserted = await Advert.insertMany(advertsJson);

        console.info(docsInserted.length + ' new adverts were successfully stored.');
    } catch(error) {
        conn.emit('error', error);
    }
}

async function closeDBConnection() {
    try {
        await conn.close();
        console.info(`Connection with database ${conn.name} was successfully closed. `);
    } catch(error) {
        conn.emit('error', error);
    }
}
