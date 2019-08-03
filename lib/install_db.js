'use strict';


    // Delete all the database content ( deleteMany )
    deleteAllAdverts();
    // Insert all the adverts.json into the DB ( insertMany )
    loadAdvertsFile();


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
